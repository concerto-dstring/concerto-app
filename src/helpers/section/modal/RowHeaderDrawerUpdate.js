import React, { PureComponent, createRef } from 'react';
import { Card, Avatar, Menu, Dropdown, Button, Modal, Progress, Upload, message } from 'antd';
import {
  BellOutlined,
  CaretDownOutlined,
  EyeOutlined,
  LikeOutlined,
  LikeFilled,
  SendOutlined,
  SmileOutlined,
  LoadingOutlined,
  PaperClipOutlined,
} from '@ant-design/icons'
import 'braft-editor/dist/index.css'
import BraftEditor from 'braft-editor'
import { ContentUtils } from 'braft-utils'
import PeopleModal from './PeopleModal'
import { getBase64, isImageFile } from './UploadFun'
import { DISPLAY } from '../header/StyleValues';
import moment from 'moment';
import 'moment/locale/zh-cn';

class RowHeaderDrawerUpdate extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      btnColor: '#F0F0F0',
      btnIconColor: '#000',
      currentUser: props.currentUser,
      editorState: BraftEditor.createEditorState(null),
      editorControls: [],
      isUploading: false,
      fileName: '',
      filePercent: 0,
      fileUrl: '',
      isShowPeopleModal: false,
      isShowReplyInput: false,
      isShowReplyUserInput: false,
      isLiked: false,
      isExpandReplyList: props.updateInfo.replyList ? (props.updateInfo.replyList.length > 1 ? false : true) : true 
    }

    this.replyEditor = createRef()
    this.replyEditorDiv = createRef()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      currentUser: nextProps.currentUser,
    })
  }

  getMenu = () => {
    return (
      <Menu>
        <Menu.Item key='1'>
          test11111111
        </Menu.Item>
        <Menu.Item key='2'>
          test222223232323
        </Menu.Item>
      </Menu>
    )
  }

  handleBtnColor = (visible) => {
    if (visible) {
      this.setState({
        btnColor: '#D9F0FF',
        btnIconColor: '#009AFF'
      })
    }
    else {
      this.setState({
        btnColor: '#F0F0F0',
        btnIconColor: '#000'
      })
    }
  }

  getCardHeader = () => {
    const { user, createTime } = this.props.updateInfo
    return (
      <div className="row_drawer_card_header_between">
        <div>
          <Avatar 
            size={40} 
            style={{background: user.faceColor}}
          >
            {user.fanme}
          </Avatar>
          &nbsp;
          <a href={user.userUrl} target="_blank">{user.lname + user.fname}</a>
        </div>
        <div className="row_drawer_card_header_end">
          <span className="row_drawer_card_header_span secondary_color">
            {moment(createTime, "YYYY-MM-DDTHH:mm:ss.sssZ").fromNow()}
          </span>
          <span className="row_drawer_card_header_span">
            <BellOutlined />
          </span>
          <span className="row_drawer_card_header_span">
            <div
            >
              <Dropdown 
                overlay={this.getMenu} 
                overlayClassName='menu_item_bgcolor'
                trigger='click'
                placement='bottomLeft'
                onVisibleChange={this.handleBtnColor}
              >
                <Button
                  icon={<CaretDownOutlined style={{color: this.state.btnIconColor}} />} 
                  shape='circle'
                  size='small'
                  style={{margin: '8px 6px', backgroundColor: this.state.btnColor, border: 'none'}}
                />
              </Dropdown>
            </div>
          </span>
        </div>
      </div>
    )
  }

  getCardData = () => {
    return (
      <div className="row_drawer_card_data">
        <span dangerouslySetInnerHTML={{__html: this.props.updateInfo.content}} />
      </div>
    )
  }

  /**
   * 点赞
   */
  handleLikeClick = () => {
    const { updateInfo, data, rowIndex } = this.props
    let updateInfoData = updateInfo
    updateInfoData.isLiked = !updateInfoData.isLiked

    // 设置值
    data.setObjectAt(rowIndex, 'updateInfo', updateInfoData, 'update')

    // 随便设值(为了重新渲染)
    this.setState({
      isLiked: !this.state.isLiked
    })
  }

  getCardReplyComponent = () => {
    const { seen, isLiked } = this.props.updateInfo
    return (
      <div>
        <div className="row_drawer_card_bottom_seen">
          <span style={{marginRight: 10}}><EyeOutlined /></span>
          <span style={{marginRight: 36}}>{seen}</span>
        </div>
        <div className="row_drawer_card_bottom_btn_row not_allow_select_text">
          <div className="row_drawer_card_bottom_btn">
            <div 
              className="row_drawer_card_bottom_btn_inner"
              onClick={this.handleLikeClick}
            >
              {
                isLiked
                ?
                <span style={{color: '#009AFF'}}>
                  <LikeFilled  />&nbsp;赞
                </span>
                :
                <span style={{color: '#333333'}}>
                  <LikeOutlined  />&nbsp;赞
                </span>
              }
            </div>
          </div>
          <div className="row_drawer_card_bottom_btn_row_separator" />
          <div className="row_drawer_card_bottom_btn">
            <div 
              className="row_drawer_card_bottom_btn_inner"
              onClick={this.replyMsg.bind(this, null, null)}
            >
              <span>
                <SendOutlined />&nbsp;回复
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  handleEditorChange = (editorState) => {
    this.setState({ editorState });
  }

  /**
   * 设置滚动条位置
   */
  setScrollTop = () => {
    this.replyEditor.current.isFocused = true
    this.replyEditorDiv.current.scrollIntoViewIfNeeded()
  }

  /**
   * 回复消息
   */
  replyMsg = (username, userUrl) => {
    let editorState = ContentUtils.clear(this.state.editorState)
    if (username) {
      username = '@' + username
      editorState = ContentUtils.insertHTML(editorState, `回复<a href=${userUrl} target="_blank">${username} :</a>`)

      this.setState({
        isShowReplyInput: false,
        isShowReplyUserInput: true,
        editorState: editorState
      }, () => {
        this.setScrollTop()
      }, () => {
        this.setScrollTop()
      })
    }
    else {
      // 回复整个内容的可以关闭回复窗口
      if (this.state.isShowReplyInput) {
        this.setState({
          isShowReplyInput: false,
          isShowReplyUserInput: false,
          editorState: editorState
        })
      }
      else {
        this.setState({
          isShowReplyInput: true,
          isShowReplyUserInput: false,
          editorState: editorState
        }, () => {
          this.setScrollTop()
        })
      }
    }
  }

  /**
   * 确认回复
   */
  confirmReply = () => {
    if (this.state.editorState) {
      const emptyHtml = BraftEditor.createEditorState(null).toHTML();
      let replyHtml = this.state.editorState.toHTML()

      // 无有效字符
      if (replyHtml.replace(new RegExp(`(${emptyHtml})`, "gm"), "").length === 0) {
        message.warning('请输入回复消息!')
      }
      else {
        replyHtml = replyHtml.replace(new RegExp("<p>", "gm"), "").replace(new RegExp("</p>", "gm"), "<br>")
        const { updateInfo, data, rowIndex } = this.props
        let updateInfoData = updateInfo
        let id = updateInfoData.id + '_' + String(updateInfoData.replyList.length + 1)
        let replyList = updateInfoData.replyList.slice()
        replyList.push({
          id: id,
          replyMsg: replyHtml,
          replyUser: this.state.currentUser,
          isLiked: false,
          createTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        })

        updateInfoData.replyList = replyList

        // 设置值
        data.setObjectAt(rowIndex, 'updateInfo', updateInfoData, 'update')

        this.setState({
          isShowReplyInput: false,
          isShowReplyUserInput: false,
        }, () => {
          this.setScrollTop()
        })
      }
    }
  }

  handleReplyMsgLike = (replyId) => {
    const { updateInfo, data, rowIndex } = this.props
    let updateInfoData = updateInfo
    let replyList = updateInfoData.replyList.slice()
    let replyIndex = replyList.findIndex(reply => reply.id === replyId)

    if (replyIndex !== undefined && replyIndex !== null) {
      replyList[replyIndex].isLiked = !replyList[replyIndex].isLiked
      updateInfoData.replyList = replyList
      // 设置值
      data.setObjectAt(rowIndex, 'updateInfo', updateInfoData, 'update')

      // 随便设值(为了重新渲染)
      this.setState({
        isLiked: !this.state.isLiked
      })
    }
  }

  getReplyList = () => {
    const { replyList } = this.props.updateInfo
    if (replyList) {
      if (replyList.length <= 1) {
        // 回复数小于等于1
        return this.getReplyMsg(replyList, replyList.length)
      }
      else {
        // 回复数大于1（若回复列表展开为false则只显示第一条，剩下的用共几条回复显示，否则显示全部回复列表）
        if (this.state.isExpandReplyList) {
          return this.getReplyMsg(replyList, 1)
        }
        else {
          return this.getReplyMsg(new Array(replyList[0]), replyList.length)
        }
      } 
    } 
  }

  expandReplyList = () => {
    this.setState({
      isExpandReplyList: true
    })
  }

  getReplyMsg = (replyList, replyCount) => {
    return (
      replyList.map(reply => {
        return (
          <div
            key={reply.id} 
            className="reply_body_component"
          >
            <Avatar 
              size={36} 
              style={{background: reply.replyUser.faceColor, position: 'absolute'}}
            >
              {reply.replyUser.fanme}
            </Avatar>
            <div className="reply_body_data">
              <div className="reply_body_data_wrapper">
                <a href={reply.replyUser.userUrl} target="_blank">{reply.replyUser.lname + reply.replyUser.fname}:</a>
                &nbsp;
                <span dangerouslySetInnerHTML={{__html: reply.replyMsg}} />
              </div>
              <div className="reply_body_data_tool">
                <div>
                  <span>
                    {moment(reply.createTime, "YYYY-MM-DD HH:mm:ss").fromNow()}
                  </span>
                </div>
                <div className="reply_body_data_tool_reply">
                  <span className="reply_body_data_tool_reply_btn">
                    <EyeOutlined /> 3
                  </span>
                  {
                    reply.isLiked
                    ?
                    <span 
                      className="reply_body_data_tool_reply_btn not_allow_select_text" 
                      style={{color: '#009AFF'}}
                      onClick={this.handleReplyMsgLike.bind(this, reply.id)}
                    >
                      <LikeFilled  />
                    </span>
                    :
                    <span 
                      className="reply_body_data_tool_reply_btn not_allow_select_text" 
                      style={{color: '#AAAAAA'}}
                      onClick={this.handleReplyMsgLike.bind(this, reply.id)}
                    >
                      <LikeOutlined  />
                    </span>
                  }
                  <span 
                    className="reply_body_data_tool_reply_btn"
                    onClick={this.replyMsg.bind(this, reply.replyUser.lname + reply.replyUser.fname, reply.replyUser.userUrl)}
                  >
                    <SendOutlined />
                  </span>
                </div>
              </div>
              {
                replyCount > 1
                ?
                <div className="reply_body_data_show_reply_count">
                  <span
                    className="reply_body_data_show_reply_count_span"
                    onClick={this.expandReplyList}
                  >
                    共{replyCount}条回复
                  </span>
                </div>
                :
                null
              }
            </div>
          </div>
        )
      })
    )
  }

  getCardReplyData = () => {
    const { currentUser, isShowReplyInput, isShowReplyUserInput, editorState, editorControls } = this.state
    return (
      <div className="reply_area" ref={this.replyArea}>
        <div className="reply_list_component">
          {
            this.getReplyList()
          }
        </div>
        <div 
          className="reply_new_reply_component"
          style={{display: ( isShowReplyInput || isShowReplyUserInput) ? DISPLAY.BLOCK : DISPLAY.NONE}}
          ref={this.replyEditorDiv}
        >
          <div className="reply_new_reply_component_open">
            <Avatar 
              size={36} 
              style={{background: currentUser.faceColor, position: 'absolute'}}
            >
              {currentUser.fanme}
            </Avatar>
            <div className="reply_new_reply_component_all">
              <div className="reply_new_reply_component_wrapper">
                <BraftEditor 
                  value={editorState}
                  onChange={this.handleEditorChange}
                  controls={editorControls}
                  contentClassName="reply_new_reply_component_editor"
                  ref={this.replyEditor}
                />
              </div>
              <div 
                className="row_header_drawer_editor_bottom"
              >
                <span className="row_header_drawer_editor_bottom_content">
                  {
                    this.getUploadContent()
                  }
                  <span 
                    className="row_header_drawer_editor_bottom_content_span row_header_drawer_editor_bottom_content_span_margin"
                    style={{fontSize: 13}}
                  > 
                    <SmileOutlined />表情
                  </span>
                  <span 
                    className="row_header_drawer_editor_bottom_content_span row_header_drawer_editor_bottom_content_span_margin"
                    style={{fontSize: 13}}
                  >
                    <PeopleModal 
                      visible={this.state.isShowPeopleModal}
                      handlePeopleModalVisible={this.handlePeopleModalVisible}
                      insertPeople={this.insertPeople}
                      placement={'top'}
                      data={this.props.data}
                    >
                      @
                    </PeopleModal>  
                  </span>
                </span>
                <Button
                  style={{width: 80}}
                  shape='round'
                  type='primary'
                  onClick={this.confirmReply}
                >
                  回复
                </Button>
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
            </div>
          </div>
        </div>
      </div>
    )
  }

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
        editorState = ContentUtils.insertHTML(editorState, `<a href=${fileUrl} target="_blank">${this.state.fileName}</a>`)
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

  insertPeople = (username) => {
    const userUrl = "https://www.baidu.com?" + username
    const userData = '@' + username 
    this.setState({
      editorState: ContentUtils.insertHTML(this.state.editorState, `<a href=${userUrl} target="_blank">${userData}&nbsp</a>`)
    })
  }

  handlePeopleModalVisible = (visible) => {
    this.setState({
      isShowPeopleModal: visible
    })
  }

  getUploadContent = () => {
    let uploadContent
    if (this.state.isUploading) {
      uploadContent = (
        <span style={{color: '#009AFF', fontSize: 13, lineHeight: '32px' }}>
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
        >
          <span 
            className="row_header_drawer_editor_bottom_content_span"
            style={{fontSize: 13}}
          >
            <PaperClipOutlined  />
            上传
          </span>
        </Upload>
      )
    }

    return uploadContent
  }

  render() {
    return (
      <Card
        bodyStyle={{padding: 0}}
        style={{borderRadius: 8, marginTop: 20, borderColor: '#D3D3D3'}}
      >
        {this.getCardHeader()}
        {this.getCardData()}
        {this.getCardReplyComponent()}
        {this.getCardReplyData()}
      </Card>
    );
  }
}

export default RowHeaderDrawerUpdate;