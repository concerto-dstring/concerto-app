
import React, { useContext, createRef } from 'react';
import {BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';
import MainTable from './maintable/MainTable';
import SessionContext from './App';
import './MainPage.less';
import './maintable/css/style/MoveToSectionMenu.less';
import { Layout, Input, Collapse, Button, Avatar, Dropdown, Menu, Modal, message } from 'antd';
import { 
    SearchOutlined,
    LeftOutlined,
    RightOutlined,
    SettingFilled,
    ShareAltOutlined,
    CloseOutlined
   } from '@ant-design/icons';
import logo from './logo.svg'
import { withApollo } from 'react-apollo'
import RowHeaderDrawer from './helpers/RowHeaderDrawer';
import { USER_MENU_SIGN_OUT, RENAME_BOARD, DELETE_BOARD } from './maintable/MainTableRowKeyAndDesc';
import { Auth } from 'aws-amplify'
import { DISPLAY, COLOR } from './helpers/section/header/StyleValues';

const { Panel } = Collapse;
const { Header, Content, Sider } = Layout;

// Sider默认宽度
const defaultSiderWidth = 300

let intervalTimer

@withApollo
@withRouter
class MainPage extends React.Component {

  static contextType = SessionContext;
  constructor(props){
    super(props)
    this.state = {
      siderWidth: defaultSiderWidth,
      collapsed: false,
      dataset: props.dataset,
      boardMenus: [],
      dashboardMenus: [],
      contentTitle: '',
      isShowCreateBoard: false,
      isShowReNameBoard: false
    }

    this.createBoardRef = createRef()
    this.reNameBoardRef = createRef()

    this.setMenus = this.setMenus.bind(this)
    this.updateMenus = this.updateMenus.bind(this)
  }

  componentDidMount() {
    let dataset = this.props.dataset;
    dataset.fetchSideMenus(this.props.client, 'board', this.context.userId, this.setMenus);
    // dataset.fetchSideMenus(this.props.client, 'dashboard', this.handleBusy)
  }

  componentWillUnmount() {
    this.clearComponent()
  }

  clearComponent = () => {
    // 清除异步操作
    this.setState = (state, callback) => {
      return
    }

    // 清除定时
    clearInterval(intervalTimer)
  }

  setMenus = (menus, isBoard, defaultBoard) => {
    let selectedKey
    let contentTitle
    if (isBoard) {
      if (menus.length > 0 ) {
        selectedKey = defaultBoard ? defaultBoard.id : menus[0].id
        contentTitle = defaultBoard ? defaultBoard.name : menus[0].name
        // this.props.history.push('/board/' + menus[0].id)
      }
      this.setState({
        boardMenus: menus,
        selectedKey,
        contentTitle,
        dataset: this.props.dataset,
      })
    }
    else {
      this.setState({
        dashboardMenus: menus,
        dataset: this.props.dataset,
      })
    }
  }

  updateMenus = (boardId, boardName) => {
    const { boardMenus } = this.state
    let boardMenusCopy =  boardMenus.slice()
    let boardIndex = boardMenusCopy.findIndex(board => board.id === boardId)
    boardMenusCopy[boardIndex].name = boardName

    this.setState({
      boardMenus: boardMenusCopy
    })
  }

  toggle = () => {
    this.setState({
      siderWidth: !this.state.collapsed ? 0 : defaultSiderWidth,
      collapsed: !this.state.collapsed,
    });
  };

  setBusy = (busy) => {
    this.setState({
      busy: busy
    })
  }
  
  nativeGetTableStore = (id, name, isBoard) => {
    const { dataset } = this.state
    if (isBoard) {
      // this.props.history.push('/board/' + id)
      dataset.fetchBackendBoardData(id, null, this.setBusy)
      this.setState({
        selectedKey: id,
        contentTitle: name,
        dataset: dataset
      })
    }
  }

  filterMenu = (isBoard, e) => {
    let value = e.target.value.trim()
    if (value) {
      value = value.toLowerCase()
      let menusCopy = isBoard ? this.state.dataset._boardMenus.slice() : []
      let filterMenus = menusCopy.filter(item => item.name.toLowerCase().indexOf(value) !== -1)
      this.setState({
        boardMenus: filterMenus
      })
    }
    else {
      this.setState({
        boardMenus: this.state.dataset._boardMenus
      })
    }
  }

  /**
   * 创建工作板
   */
  createBoard = (e) => {
    // 防止document事件的冒泡
    e.stopPropagation();
    e.preventDefault();

    this.setState({
      isShowCreateBoard: true
    })
  }

  handleCancelClick = () => {
    clearInterval(intervalTimer)
    this.setState({
      isShowCreateBoard: false,
      isShowReNameBoard: false,
      isShowDeleteBoard: false,
      isShowUndoModal: false
    })
  }

  handleCreateBoard = () => {
    let boardName = this.createBoardRef.current.input.value
    if (!boardName) {
      message.warning('工作板名称不能为空')
      return
    }

    const { dataset } = this.state

    dataset.createBoard(boardName, this.setMenus)
    this.handleCancelClick()
  }

  handleBoardItemMenuClick = (boardId, boardName, { item, key, keyPath, selectedKeys, domEvent }) => {
    domEvent.stopPropagation();
    domEvent.preventDefault();

    if (key === RENAME_BOARD.key) {
      this.setState({
        isShowReNameBoard: true,
        boardId,
        boardName
      })
    }
    else if (key === DELETE_BOARD.key) {
      this.setState({
        isShowDeleteBoard: true,
        boardId,
        boardName
      })
    }
  }

  handleReNameBoard = () => {
    let boardNewName = this.reNameBoardRef.current.input.value

    if (!boardNewName) {
      message.warning('工作板名称不能为空')
      return
    }
    
    const { dataset, boardId, boardName } = this.state
    dataset.updateBoard(boardId, boardName, boardNewName, this.updateMenus)
    this.handleCancelClick()
  }

  handleDeleteBoard = () => {
    const { dataset, boardId } = this.state
    dataset.deleteBoard(boardId, true, this.setMenus)
    this.setState({
      isShowDeleteBoard: false,
      isShowUndoModal: true,
      countdown: 10
    })
  }

  undoDeleteBoard = () => {
    const { dataset, boardId } = this.state
    dataset.deleteBoard(boardId, false, this.setMenus)
    this.handleCancelClick()
  }

  getBoardItemMenus = (boardId, boardName) => {
    return (
      <Menu 
        onClick={this.handleBoardItemMenuClick.bind(this, boardId, boardName)}
        style={{width: 100, borderRadius: '8px', padding: '5px, 0px, 5px, 5px'}}
      >
        <Menu.Item 
          key={RENAME_BOARD.key}
        >
          <span>{RENAME_BOARD.desc}</span>
        </Menu.Item>
        <Menu.Item 
          key={DELETE_BOARD.key}
        >
          <span>{DELETE_BOARD.desc}</span>
        </Menu.Item>
      </Menu>
    )
  }

  getBodyContent = () => {
    const { dataset, siderWidth, contentTitle } = this.state;
    return (
        <Content style={{marginLeft: 24}}>
            <Route exact component={()=>
                <MainTable
                  title={contentTitle}
                  data={dataset} 
                  siderWidth={siderWidth} 
                />}
              />
              {/* <Route path="/board/:id" component={()=>
                <MainTable
                  title={contentTitle}
                  data={dataset} 
                  siderWidth={siderWidth} 
                />}
              /> */}
              {/* <Route exact path="/dashborad" component={()=>
                <MainTable
                  title={contentTitle}
                  data={dataset} 
                  siderWidth={siderWidth} 
                />}
              />
              <Route exact path="/board/:id/pulses/:rowId" component={()=>
                <RowHeaderDrawer
                />}
              /> */}
        </Content>
    )
  }

  getPanel = (menus, isBoard, name, key) => {
    const { dataset, selectedKey } = this.state
    return (
      <Panel 
        header={<div className="body_left_sider_panel_header">
                  <div style={{textAlign: "left"}}>{name}</div>
                  <div style={{textAlign: "right"}} onClick={this.createBoard}>+</div>
                </div>} 
        showArrow={false} 
        key={key}
      >
        {
          isBoard
          ?
          <Input
            prefix={<SearchOutlined />}
            placeholder="搜索工作板..."
            style={{margin:'0 0 16px 0',borderRadius:'15px'}}
            onChange={this.filterMenu.bind(this, isBoard)}
          />
          :
          null
        }
        {
          menus.map(item => {
            let style = item.id === selectedKey ? {background: '#ECECEC', fontWeight: 500} : {}
            let path = (isBoard ? `/board/${item.id}` : '/dashboard')
            return (
              <div 
                key={item.id} 
                className="body_left_sider_panel_menu"
                style={style}
                onClick={this.nativeGetTableStore.bind(this, item.id, item.name, isBoard)}
              >
                <div className="body_left_sider_panel_menu_item_link" style={style}>
                  <Link to={path}>
                    {item.name}
                  </Link>
                </div>
                <div style={style}>
                  <Dropdown
                    overlay={this.getBoardItemMenus(item.id, item.name)}
                    placement='bottomLeft'
                  >
                    <div className="body_left_sider_panel_menu_item_menu">
                      <div className="menu_point"></div>
                      <div className="menu_point"></div>
                      <div className="menu_point"></div>
                    </div>
                  </Dropdown>
                </div>
              </div>
            )
          })
        }
      </Panel>
    )
  }

  getUserMenus = () => {
    return (
      <Menu 
        onClick={this.handleUserMenuClick}
        style={{width: 100, borderRadius: '8px', padding: '5px, 0px, 5px, 5px'}}
      >
        <Menu.Item 
          key={USER_MENU_SIGN_OUT.key}
        >
          <span>{USER_MENU_SIGN_OUT.desc}</span>
        </Menu.Item>
      </Menu>
    )
  }

  handleSignOut = async() => {
    try {
      await Auth.signOut( {global: true} );
      this.props.history.push('/login')
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  handleUserMenuClick = ({ item, key, keyPath, selectedKeys, domEvent }) => {
    if (key === USER_MENU_SIGN_OUT.key) {
      this.handleSignOut()
    }
  }

  render(){
    const { siderWidth, collapsed, boardMenus, dashboardMenus, dataset, 
      isShowCreateBoard, isShowReNameBoard, isShowDeleteBoard, boardName,
      isShowUndoModal, countdown } = this.state

    // 更新时若isShowUndoModal为true则倒计时
    if (isShowUndoModal) {
      let countdownCopy = countdown
      clearInterval(intervalTimer)
      intervalTimer = setInterval(() => {
        if (countdownCopy > 0) {
          countdownCopy -= 1
          this.setState({
            countdown: countdownCopy
          })
        }
        else {
          // 自动关闭组件
          this.handleCancelClick()
        }
      }, 1000);
    }
    
    return (
      <>
        <Layout>
          <Header className="header">            
            <div>
              <img className="header_logo" src={logo} />
            </div>
            <div className="header_right">
              <span>
                <Dropdown
                  overlay={this.getUserMenus()}
                  placement='bottomCenter'
                >
                  <Avatar 
                    size={28} 
                    style={{background: dataset._currentUser.faceColor ? dataset._currentUser.faceColor : '#000', cursor: 'pointer'}}
                  >
                    {dataset._currentUser.fname ? dataset._currentUser.fname : ''}
                  </Avatar>
                </Dropdown>
              </span>
              <span className="header_setting">
                <SettingFilled />
              </span>
            </div>
          </Header>
          <Layout>
            <Sider 
              collapsible={true} 
              collapsedWidth={siderWidth} 
              width={siderWidth}
              trigger={null} 
              collapsed={collapsed}
              className="body_left_sider"
              style={{
              }}
            >
              <Collapse accordion defaultActiveKey={['1']} style={{height:'100%'}} bordered={false}>
                {
                  this.getPanel(boardMenus, true, '工作板', '1')
                }
                {
                  this.getPanel(dashboardMenus, false, '仪表板', '2')
                }
              </Collapse>
            </Sider>
            <div style={{width:'20px', height:'100%',textAlign:'center'}}>
              <div className="collpseBarTop"></div>
              <Button 
                shape='circle'
                size='small'
                className="collpseBar"
                onClick={this.toggle}
                icon={React.createElement(collapsed ? RightOutlined : LeftOutlined , {
                  className: 'trigger',
                  style:{
                    fontSize:'15px'
                  }
                })}
              ></Button>
              <div className="collpseBarBottom"></div>
            </div>
            <Layout style={{backgroundColor: '#FFFFFF'}}>
              {
                this.getBodyContent()
              }
            </Layout>
          </Layout>
        </Layout>
        <Modal
          title='添加工作板'
          visible={isShowCreateBoard}
          onCancel={this.handleCancelClick}
          onOk={this.handleCreateBoard}
          destroyOnClose={true}
        >
          <Input 
            size='middle'
            allowClear={true}
            onPressEnter={this.handleCreateBoard}
            ref={this.createBoardRef}
          />
        </Modal>
        <Modal
          title='工作板重命名'
          visible={isShowReNameBoard}
          onCancel={this.handleCancelClick}
          onOk={this.handleReNameBoard}
          destroyOnClose={true}
        >
          <Input 
            size='middle'
            allowClear={true}
            onPressEnter={this.handleReNameBoard}
            ref={this.reNameBoardRef}
          />
        </Modal>
        <Modal
          title={<span><strong>是否删除工作板 </strong>{boardName} ?</span>}
          visible={isShowDeleteBoard}
          onCancel={this.handleCancelClick}
          onOk={this.handleDeleteBoard}
        >
          <span>删除后可以从回收站恢复</span>
        </Modal>
        <div className='undo_message' style={{display: isShowUndoModal ? DISPLAY.BLOCK : DISPLAY.NONE}}>
          <div className='undo_message_content'>
            <span style={{margin: '10px 0px'}}>
              &emsp;&emsp;{'删除成功'}
            </span>
            <Button 
              shape='round'
              type='primary'
              style={{margin: '10px 10px 10px 110px', width: 92, backgroundColor: COLOR.UNDO, borderColor: COLOR.WHITE}}
              onClick={this.undoDeleteBoard}
            >
              <span>撤 销&emsp;</span>
              <span style={{width: 12}}>{countdown}</span>
            </Button>
            <Button 
              icon={<CloseOutlined  />}
              type='link'
              style={{margin: '10px 10px 10px 16px'}}
              onClick={this.handleCancelClick}
            />
          </div>
        </div>
      </>
    );
  }
}

export default MainPage
