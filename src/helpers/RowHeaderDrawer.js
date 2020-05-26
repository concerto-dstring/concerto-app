import React, { PureComponent } from 'react';
import { Menu, Button, Upload, Modal, Progress, message } from 'antd';
import {
  ROW_HEADER_UPDATE,
  ROW_HEADER_INFO_BOX,
  ROW_HEADER_ACTIVITY_LOG
} from '../maintable/MainTableRowKeyAndDesc'
import 'braft-editor/dist/index.css'
import BraftEditor from 'braft-editor'
import { ContentUtils } from 'braft-utils'
import {
  TableOutlined,
  CheckCircleFilled,
  PaperClipOutlined,
  SmileOutlined,
  LoadingOutlined,
} from '@ant-design/icons'
import '../maintable/css/style/RowHeaderCell.less'
import PeopleModal from './section/modal/PeopleModal'
import RowHeaderDrawerUpdate from './section/modal/RowHeaderDrawerUpdate'
import { getBase64, isImageFile } from './section/modal/UploadFun'
import moment from 'moment';
import 'moment/locale/zh-cn';
import SlideDrawer from './section/Drawer/SlideDrawer'
import { connect } from 'react-redux'
import { mapRowHeaderDrawerStateToProps } from '../maintable/data/mapStateToProps'

@connect(mapRowHeaderDrawerStateToProps)
class RowHeaderDrawer extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      current: ROW_HEADER_UPDATE.key,
      editorState: BraftEditor.createEditorState(null),
      editorControls: [
        'remove-styles', 'text-color', 'bold', 'italic', 'underline', 'strike-through', 'list-ol', 'list-ul',
        {
          key: 'inserTable',
          title: '表格',
          text: <TableOutlined />,
        },
        'link', 'hr', 'text-align', 'clear', 
        {
          key: 'checklist',
          title: 'Add Checklist',
          text: <div><CheckCircleFilled /> Checklist</div>
        },
        'separator', 'fullscreen'
      ],
      isUploading: false,
      fileName: '',
      filePercent: 0,
      fileUrl: '',
      isShowPeopleModal: false,
      currentUser: props.tableData ? props.tableData.getCurrentUser() : {},
      updateInfo: [],
      isBusy: false
    }

    this.setUpdateInfo = this.setUpdateInfo.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.getDrawerData(nextProps)
    this.setState({
      currentUser: nextProps.tableData ? nextProps.tableData.getCurrentUser() : {},
    })
  }

  getDrawerData(props) {
    const { tableData, rowId } = props
    
    if (tableData) {
      tableData.getRowThreadData(rowId, this.setUpdateInfo)
    }
  }

  setUpdateInfo(updateInfo) {
    this.setState({
      updateInfo: updateInfo,
      isBusy: !this.state.isBusy
    })
  }

  handleEditorChange = (editorState) => {
    this.setState({ editorState });
  }

  handleMenuClick = (e) => {
    this.setState({
      current: e.key,
    });
  };

  checkUploadFile = (file) => {
    // 可以检查文件的类型和大小(不大于2M)
    if (file.size > 1024 * 1024 * 2) {
      message.error('文件不能大于2MB!');
      return false
    }

    return true
  }

  uploadFile = (info) => {
    if (info.file.status === 'uploading' && !this.state.isUploading) {
      // 先默认设置一个文件url和一个图片url
      let isImage = isImageFile(info.file.name)
      this.setState({
        fileName: info.file.name,
        isUploading: true,
        isImage,
      });

      getBase64(info.file.originFileObj, fileUrl =>
        this.setState({
          fileUrl,
          isUploading: false,
          editorState: this.insertFileContent(fileUrl)
        }),
      )
      return;
    }

    // if (info.event) { // 一定要加判断，不然会报错
    //   let percent = Math.floor((info.event.loaded / info.event.total) * 100)
    //   this.setState({
    //     filePercent: percent
    //   })
    // }

    // if (info.file.status === 'done') {
      // getBase64(info.file.originFileObj, imageUrl =>
      //   this.setState({
      //     imageUrl,
      //     isUploading: false,
      //   }),
      // );
    //   this.setState({
    //     fileName: '',
    //     isUploading: false,
    //     filePercent: 0 
    //   });
    // }
  }

  /**
   * 插入文件内容
   */
  insertFileContent = (fileUrl) => {
    let editorState = this.state.editorState
    if (fileUrl) {
      if (this.state.isImage) {
        // 使用ContentUtils.insertMedias来插入媒体到editorState
        editorState = ContentUtils.insertMedias(editorState, [
          {
            type: 'IMAGE',
            url: fileUrl
          }
        ])
      }
      else {
        editorState = ContentUtils.insertHTML(editorState, `<a href=${fileUrl}>${this.state.fileName}</a>`)
      }
    }
    return editorState
  }

  cancelUpload = () => {
    this.setState({
      fileName: '',
      isUploading: false,
      filePercent: 0,
      fileUrl: '',
    });
  }

  getUploadContent = () => {
    let uploadContent
    if (this.state.isUploading) {
      uploadContent = (
        <span style={{color: '#009AFF', fontSize: 16, lineHeight: '32px' }}>
          <LoadingOutlined />
          上传中
        </span>
      )
    }
    else {
      uploadContent = (
        <Upload 
          showUploadList={false}
          name='uploadFile'
          beforeUpload={this.checkUploadFile}
          onChange={this.uploadFile}
          disabled={true}
        >
          <span className="row_header_drawer_editor_bottom_content_span">
            <PaperClipOutlined  />
            上传
          </span>
        </Upload>
      )
    }

    return uploadContent
  }

  insertPeople = (userName, userId) => {
    const userUrl = "https://www.pynbo.com/user/" + userId
    const userData = '@' + userName 
    this.setState({
      editorState: ContentUtils.insertHTML(this.state.editorState, `<a href=${userUrl}>${userData}&nbsp</a>`)
    })
  }

  handlePeopleModalVisible = (visible) => {
    this.setState({
      isShowPeopleModal: visible
    })
  }

  /**
   * 保存消息
   */
  saveUpdateInfo = () => {
    if (this.state.editorState) {
      const emptyHtml = BraftEditor.createEditorState(null).toHTML();
      let infoHtml = this.state.editorState.toHTML()

      // 无有效字符
      if (infoHtml.replace(new RegExp(`(${emptyHtml})`, "gm"), "").length === 0) {
        message.warning('请输入内容!')
      }
      else {
        infoHtml = infoHtml.replace(new RegExp("<p>", "gm"), "").replace(new RegExp("</p>", "gm"), "<br>")
        const { tableData, rowId } = this.props
        let createData = {
          rowID: rowId,
          userID: this.state.currentUser.id,
          content: infoHtml,
          createdAt: new Date().toISOString()
        }

        // 设置值
        tableData.createThreadData(createData, this.setUpdateInfo)

        // 清除值
        this.setState({
          editorState: ContentUtils.clear(this.state.editorState)
        })
      }
    }
  }

  getRowHeaderDrawerUpdate() {
    const { updateInfo } = this.state
    if (updateInfo && updateInfo.length > 0) {
      let updateComponent = updateInfo.map(info => {
        let user = info.user
        if (user.avatar.startsWith('#')) {
          user.faceColor = user.avatar
        }
        else {
          user.faceColor = ''
        }
        user.userUrl = 'https://www.pynbo.com/user/' + user.id
        return (
          <RowHeaderDrawerUpdate
            key={info.id} 
            rowId={this.props.rowId}
            data={this.props.tableData}
            updateInfo={info}
            currentUser={this.state.currentUser}
            isBusy={this.state.isBusy}
            setUpdateInfo={this.setUpdateInfo}
          />
        )
      })
      return updateComponent
    }
    else {
      return null
    }
  }

  getMenuContent = (key) => {
    let menuContent
    switch (key) {
      case ROW_HEADER_UPDATE.key:
        menuContent = (
          <div className="row_header_drawer" >
            <div 
              className="row_header_drawer_container"
            >
              <div className="row_header_drawer_padding">
                <div className="row_header_drawer_editor">
                  <BraftEditor 
                    value={this.state.editorState}
                    onChange={this.handleEditorChange}
                    controls={this.state.editorControls}
                    contentClassName="row_header_drawer_editor_content"
                  />
                </div>
                <div className="row_header_drawer_editor_bottom">
                  <span className="row_header_drawer_editor_bottom_content">
                    {
                      this.getUploadContent()
                    }
                    <span className="row_header_drawer_editor_bottom_content_span row_header_drawer_editor_bottom_content_span_margin"> 
                      <SmileOutlined />表情
                    </span>
                    <span 
                      className="row_header_drawer_editor_bottom_content_span row_header_drawer_editor_bottom_content_span_margin"
                    >
                      <PeopleModal 
                        visible={this.state.isShowPeopleModal}
                        handlePeopleModalVisible={this.handlePeopleModalVisible}
                        insertPeople={this.insertPeople}
                        data={this.props.tableData}
                      >
                        @
                      </PeopleModal>  
                    </span>
                  </span>
                  <Button
                    style={{width: 80}}
                    shape='round'
                    type='primary'
                    onClick={this.saveUpdateInfo}
                  >
                    保存
                  </Button>
                </div>
              </div>
              <Modal
                visible={this.state.isUploading}
                cancelButtonProps={{style:{visibility: 'hidden'}}}
                okText='取消上传'
                closable={false}
                bodyStyle={{height: 160}}
                centered={true}
                onOk={this.cancelUpload}
              >
                <div style={{display: 'flex'}}>
                  <span style={{width: 300, position: 'fixed'}}>{this.state.fileName}</span>
                  <Progress style={{left:300, right: 0, width: 180}} percent={this.state.filePercent} />
                </div>
              </Modal>
              <div className="row_header_drawer_padding">
                {
                  this.getRowHeaderDrawerUpdate()
                }
              </div>
            </div>
          </div>
        )
        break;
    
      default:
        menuContent = (<div>暂无</div>)
        break;
    }

    return menuContent
  }

  // 关闭滑窗
  onClose = () => {
    this.props.closeRowDrawer()
  }

  handleRowMove = (e) => {
    e.stopPropagation()
  }

  render() {
    return (
      <SlideDrawer
        isVisible={this.props.isOpenRowHeaderDrawer}
        onMouseDown={this.handleRowMove}
        drawerHeader={this.props.rowHeaderDrawerTitle}
      >
        <Menu
          style={{padding: '0px 16px'}} 
          onClick={this.handleMenuClick} 
          selectedKeys={[this.state.current]} 
          mode="horizontal"
        >
          <Menu.Item key={ROW_HEADER_UPDATE.key}>
            {ROW_HEADER_UPDATE.desc}
          </Menu.Item>
          <Menu.Item key={ROW_HEADER_INFO_BOX.key}>
            {ROW_HEADER_INFO_BOX.desc}
          </Menu.Item>
          <Menu.Item key={ROW_HEADER_ACTIVITY_LOG.key}>
            {ROW_HEADER_ACTIVITY_LOG.desc}
          </Menu.Item>
        </Menu>
        {this.getMenuContent(this.state.current)}
      </SlideDrawer>
    );
  }
}

export default RowHeaderDrawer;