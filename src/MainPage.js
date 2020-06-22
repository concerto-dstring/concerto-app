import React, {useContext, createRef} from 'react';
import {BrowserRouter as Router, Route, Link, withRouter} from 'react-router-dom';
import MainTable from './maintable/MainTable';
import SessionContext from './App';
import './MainPage.less';
import './maintable/css/style/MoveToSectionMenu.less';
import {Layout, Input, Collapse, Button, Avatar, Dropdown, Menu, Modal, message, Spin, Row, Col, Badge} from 'antd';

import {
  SearchOutlined,
  LeftOutlined,
  RightOutlined,
  SettingFilled,
  ShareAltOutlined,
  DoubleRightOutlined,
  DoubleLeftOutlined,
  CloseOutlined,
  PlusOutlined,
  EllipsisOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import logo from './logo.svg';
import {withApollo} from 'react-apollo';
import RowHeaderDrawer from './helpers/RowHeaderDrawer';
import {USER_MENU_SIGN_OUT, RENAME_BOARD, DELETE_BOARD} from './maintable/MainTableRowKeyAndDesc';
import {Auth} from 'aws-amplify';
import {DISPLAY, COLOR} from './helpers/section/header/StyleValues';
import {connect} from 'react-redux';
import {dealRowHeaderDrawer} from './maintable/actions/rowActions';
import TooltipMsg from './TooltipMsg';
import ErrorMsg from './ErrorMsg';

const {Panel} = Collapse;
const {Header, Content, Sider} = Layout;

// Sider默认宽度
const defaultSiderWidth = 300;

let intervalTimer;

@withApollo
@withRouter
@connect(null, {dealRowHeaderDrawer,})
class MainPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      siderWidth: defaultSiderWidth,
      collapsed: false,
      dataset: props.dataset,
      boardMenus: [],
      dashboardMenus: [],
      contentTitle: '',
      isShowCreateBoard: false,
      isShowReNameBoard: false,
      isLoading: false,
      isDataChanged: false,
      boardColor: '',
      mainPanelPaddingLeft: {
        // paddingLeft:'18px'
      },
    };

    this.createBoardRef = createRef();
    this.reNameBoardRef = createRef();

    this.setMenus = this.setMenus.bind(this);
    this.setLoading = this.setLoading.bind(this);
    this.updateMenus = this.updateMenus.bind(this);
    this.dealErrorBoardId = this.dealErrorBoardId.bind(this);
    this.mainPageCallBack = this.mainPageCallBack.bind(this);
  }

  componentDidMount() {
    let dataset = this.props.dataset;
    const id = this.props.match.params.id;
    this.setLoading(true);
    dataset.fetchSideMenus(
      this.props.client,
      'board',
      localStorage.getItem('CurrentUserId'),
      this.setMenus,
      id,
      this.dealErrorBoardId,
      this.mainPageCallBack
    );
    // dataset.fetchSideMenus(this.props.client, 'dashboard', this.handleBusy)
  }

  dealErrorBoardId = () => {
    this.props.history.push('/notfound');
  };

  componentWillUnmount() {
    this.clearComponent();
  }

  clearComponent = () => {
    // 清除异步操作
    this.setState = (state, callback) => {
      return;
    };

    // 清除定时
    clearInterval(intervalTimer);
  };

  mainPageCallBack = () => {
    this.setState({
      isDataChanged: !this.state.isDataChanged,
    });
  };

  setMenus = (menus, isBoard, defaultBoard) => {
    let selectedKey;
    let contentTitle;
    let boardColor;
    if (isBoard) {
      if (defaultBoard) {
        selectedKey = defaultBoard.id;
        contentTitle = defaultBoard.name;
        boardColor = defaultBoard.color
        this.props.history.push('/board/' + selectedKey);
      }
      this.setState({
        boardMenus: menus,
        selectedKey,
        contentTitle,
        boardColor,
        isLoading: false,
      });
    } else {
      this.setState({
        dashboardMenus: menus,
        isLoading: false,
      });
    }
  };

  updateMenus = (boardId, boardName) => {
    const {boardMenus} = this.state;
    let boardMenusCopy = boardMenus.slice();
    let boardIndex = boardMenusCopy.findIndex((board) => board.id === boardId);
    boardMenusCopy[boardIndex].name = boardName;

    this.setState({
      boardMenus: boardMenusCopy,
      contentTitle: boardName,
    });
  };

  toggle = () => {
    this.setState({
      siderWidth: !this.state.collapsed ? 0 : defaultSiderWidth,
      collapsed: !this.state.collapsed,
      mainPanelPaddingLeft: !this.state.collapsed
        ? {
            paddingLeft: '0px',
          }
        : {
            paddingLeft: '18px',
          },
    });
  };

  setLoading = (isLoading) => {
    this.setState({
      isLoading: isLoading,
    });
  };

  nativeGetTableStore = (id, name, isBoard, path, boardColor) => {
    this.props.dealRowHeaderDrawer({isOpenRowHeaderDrawer: false});
    const {dataset} = this.state;
    this.setLoading(true);
    this.props.history.push(path);
    if (isBoard) {
      dataset.fetchBackendBoardData(id, null, this.setLoading, localStorage.getItem('CurrentUserId'));
      this.setState({
        selectedKey: id,
        contentTitle: name,
        boardColor,
        // dataset: dataset,
      });
    }
  };

  filterMenu = (isBoard, e) => {
    let value = e.target.value.trim();
    if (value) {
      value = value.toLowerCase();
      let menusCopy = isBoard ? this.state.dataset._boardMenus.slice() : [];
      let filterMenus = menusCopy.filter((item) => item.name.toLowerCase().indexOf(value) !== -1);
      this.setState({
        boardMenus: filterMenus,
      });
    } else {
      this.setState({
        boardMenus: this.state.dataset._boardMenus,
      });
    }
  };

  /**
   * 创建工作板
   */
  createBoard = (e) => {
    // 防止document事件的冒泡
    e.stopPropagation();
    e.preventDefault();

    this.setState({
      isShowCreateBoard: true,
    });
  };

  handleCancelClick = () => {
    clearInterval(intervalTimer);
    this.setState({
      isShowCreateBoard: false,
      isShowReNameBoard: false,
      isShowDeleteBoard: false,
      isShowUndoModal: false,
    });
  };

  handleCreateBoard = () => {
    this.setLoading(true);
    let boardName = this.createBoardRef.current.input.value;
    if (!boardName) {
      message.warning(ErrorMsg.board_name_is_empty);
      return;
    }

    const {dataset} = this.state;

    dataset.createBoard(boardName, this.setMenus);
    this.handleCancelClick();
  };

  handleBoardItemMenuClick = (boardId, boardName, {item, key, keyPath, selectedKeys, domEvent}) => {
    domEvent.stopPropagation();
    domEvent.preventDefault();

    if (key === RENAME_BOARD.key) {
      this.setState({
        isShowReNameBoard: true,
        boardId,
        boardName,
      });
    } else if (key === DELETE_BOARD.key) {
      this.setState({
        isShowDeleteBoard: true,
        boardId,
        boardName,
      });
    }
  };

  handleReNameBoard = () => {
    let boardNewName = this.reNameBoardRef.current.input.value;

    if (!boardNewName) {
      message.warning(ErrorMsg.board_name_is_empty);
      return;
    }

    const {dataset, boardId, boardName} = this.state;
    dataset.updateBoard(boardId, boardName, boardNewName, this.updateMenus);
    this.handleCancelClick();
  };

  handleDeleteBoard = () => {
    const {dataset, boardId} = this.state;
    dataset.deleteBoard(boardId, true, this.setMenus);
    this.setState({
      isShowDeleteBoard: false,
      isShowUndoModal: true,
      countdown: 10,
    });
  };

  undoDeleteBoard = () => {
    const {dataset, boardId} = this.state;
    dataset.deleteBoard(boardId, false, this.setMenus);
    this.handleCancelClick();
  };

  getBoardItemMenus = (boardId, boardName) => {
    return (
      <Menu
        onClick={this.handleBoardItemMenuClick.bind(this, boardId, boardName)}
        style={{width: 100, borderRadius: '8px', padding: '5px, 0px, 5px, 5px'}}
      >
        <Menu.Item key={RENAME_BOARD.key}>
          <span>{RENAME_BOARD.desc}</span>
        </Menu.Item>
        <Menu.Item key={DELETE_BOARD.key}>
          <span>{DELETE_BOARD.desc}</span>
        </Menu.Item>
      </Menu>
    );
  };

  getBodyContent = () => {
    const {dataset, siderWidth, contentTitle, boardColor} = this.state;
    // if (!contentTitle) return null
    return (
      <Content style={{marginLeft: 24}}>
        <Route exact component={() => <MainTable title={contentTitle} data={dataset} siderWidth={siderWidth} boardColor={boardColor} />} />
      </Content>
    );
  };

  handleBoardItemClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  getPanel = (menus, isBoard, name, key) => {
    const {dataset, selectedKey} = this.state;
    return (
      <Panel
        header={
          <div className="body_left_sider_panel_header">
            <div style={{textAlign: 'left',fontSize:'13px',color:'#A0A4A8'}}>{name}</div>
            <div style={{textAlign: 'right'}} onClick={this.createBoard}>
              <PlusOutlined style={{fontSize: '13px'}} />
            </div>
          </div>
        }
        showArrow={true}
        key={key}
      >
        {menus.map((item) => {
          let style = item.id === selectedKey ? {background: '#f2f3f3', fontWeight: 560} : {};
          let path = isBoard ? `/board/${item.id}` : '/dashboard';
          return (
            <div
              key={item.id}
              className="body_left_sider_panel_menu"
              style={style}
              onClick={this.nativeGetTableStore.bind(this, item.id, item.name, isBoard, path, item.color)}
            >
              <div className="body_left_sider_panel_menu_item_link" style={style}>
                <Link to={path}>
                  <div className="item_color" style={{background: item.color}}></div>
                  <span className="item_title">{item.name}</span>
                </Link>
              </div>

              <div className="body_left_sider_panel_menu_item" style={style} onClick={this.handleBoardItemClick}>
                <Dropdown overlay={this.getBoardItemMenus(item.id, item.name)} placement="bottomLeft" trigger="click">
                  <EllipsisOutlined className="more_menu"/>
                </Dropdown>
              </div>
              <div style={{width: 24, paddingLeft: '8px'}}>
                <Badge count={dataset.getNotificationsByBoardId(item.id)} style={{width: 20, height: 20, padding: 0}} />
              </div>
            </div>
          );
        })}
      </Panel>
    );
  };

  getUserMenus = () => {
    return (
      <Menu onClick={this.handleUserMenuClick} style={{width: 100, borderRadius: '8px', padding: '5px, 0px, 5px, 5px'}}>
        <Menu.Item key={USER_MENU_SIGN_OUT.key}>
          <LogoutOutlined />
          <span>{USER_MENU_SIGN_OUT.desc}</span>
        </Menu.Item>
      </Menu>
    );
  };

  handleSignOut = async () => {
    try {
      await Auth.signOut({global: true});
      this.props.history.push('/login');
    } catch (error) {
      console.log('error signing out: ', error);
    }
  };

  handleUserMenuClick = ({item, key, keyPath, selectedKeys, domEvent}) => {
    if (key === USER_MENU_SIGN_OUT.key) {
      this.handleSignOut();
    }
  };

  render() {
    const {
      siderWidth,
      collapsed,
      boardMenus,
      dashboardMenus,
      dataset,
      isShowCreateBoard,
      isShowReNameBoard,
      isShowDeleteBoard,
      boardName,
      isShowUndoModal,
      countdown,
      isLoading,
    } = this.state;

    // 更新时若isShowUndoModal为true则倒计时
    if (isShowUndoModal) {
      let countdownCopy = countdown;
      clearInterval(intervalTimer);
      intervalTimer = setInterval(() => {
        if (countdownCopy > 0) {
          countdownCopy -= 1;
          this.setState({
            countdown: countdownCopy,
          });
        } else {
          // 自动关闭组件
          this.handleCancelClick();
        }
      }, 1000);
    }

    return (
      <Spin size="large" spinning={isLoading} style={{maxHeight: '100%'}}>
        <Layout>
          <Layout>
            <Sider
              collapsible={true}
              collapsedWidth={siderWidth}
              width={siderWidth}
              trigger={null}
              collapsed={collapsed}
              className="body_left_sider"
              style={{}}
            >
              <div style={{height: '60px'}}>
                <Row>
                  <Col span={5}>
                    <img className="header_logo" src="../logo.png" />
                  </Col>
                  <Col span={4}>
                    <h3 style={{fontWeight: 'bold', lineHeight: '63px'}}>{TooltipMsg.app_name}</h3>
                  </Col>
                  <Col span={15}>
                    {/* <div className="collpseBar">
                      {
                        collapsed ? <DoubleRightOutlined onClick={this.toggle}/> : <DoubleLeftOutlined onClick={this.toggle}/>
                      }
                    </div>                    */}
                  </Col>
                </Row>
              </div>
              <Input
                prefix={<SearchOutlined />}
                placeholder={TooltipMsg.search_board_placeholder}
                className="search_input"
                onChange={this.filterMenu.bind(this, true)}
              />
              <Collapse accordion defaultActiveKey={['1']} bordered={false}>
                {this.getPanel(boardMenus, true, TooltipMsg.board_name, '1')}
                {/* {
                  this.getPanel(dashboardMenus, false, '仪表板', '2')
                } */}
              </Collapse>
              <div className="leftSiderFooter">
                <Dropdown overlay={this.getUserMenus()} placement="bottomCenter">
                  <span>
                    <Avatar
                      size={35}
                      className="loginuser"
                      // src="../defluatusericon.jpg"
                      style={{
                        background: dataset._currentUser.avatar ? dataset._currentUser.avatar : '#0073bb',
                        cursor: 'pointer',
                        fontSize:'14px',
                        fontWeight:'bold'
                      }}
                    >
                      {dataset._currentUser.fname ? dataset._currentUser.fname: dataset._currentUser.username}
                    </Avatar>
                    {dataset._currentUser.fname ? (dataset._currentUser.lname+dataset._currentUser.fname): dataset._currentUser.username}
                  </span>
                </Dropdown>
              </div>
            </Sider>
            <Layout style={this.state.mainPanelPaddingLeft}>{this.getBodyContent()}</Layout>
          </Layout>
        </Layout>
        <Modal
          title={TooltipMsg.add_board_modal_title}
          visible={isShowCreateBoard}
          onCancel={this.handleCancelClick}
          onOk={this.handleCreateBoard}
          destroyOnClose={true}
        >
          <Input size="middle" allowClear={true} onPressEnter={this.handleCreateBoard} ref={this.createBoardRef} />
        </Modal>
        <Modal
          title={TooltipMsg.rename_board_modal_title}
          visible={isShowReNameBoard}
          onCancel={this.handleCancelClick}
          onOk={this.handleReNameBoard}
          destroyOnClose={true}
        >
          <Input 
            size="middle"
            ref={this.reNameBoardRef}  
            allowClear={true} 
            onPressEnter={this.handleReNameBoard}
            defaultValue={boardName}
            autoFocus={true}
          />
        </Modal>
        <Modal
          title={
            <span>
              <strong>{TooltipMsg.is_delete_board}</strong>
              {boardName} ?
            </span>
          }
          visible={isShowDeleteBoard}
          onCancel={this.handleCancelClick}
          onOk={this.handleDeleteBoard}
        >
          <span>{TooltipMsg.delete_tip}</span>
        </Modal>
        <div className="undo_message" style={{display: isShowUndoModal ? DISPLAY.BLOCK : DISPLAY.NONE}}>
          <div className="undo_message_content">
            <span style={{margin: '10px 0px'}}>&emsp;&emsp;{TooltipMsg.delete_success}</span>
            <Button
              shape="round"
              type="primary"
              style={{margin: '10px 10px 10px 110px', width: 92, backgroundColor: COLOR.UNDO, borderColor: COLOR.WHITE}}
              onClick={this.undoDeleteBoard}
            >
              <span>{TooltipMsg.undo_text}&emsp;</span>
              <span style={{width: 12}}>{countdown}</span>
            </Button>
            <Button
              icon={<CloseOutlined />}
              type="link"
              style={{margin: '10px 10px 10px 16px'}}
              onClick={this.handleCancelClick}
            />
          </div>
        </div>
        <RowHeaderDrawer />
      </Spin>
    );
  }
}

export default MainPage;
