
import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import MainTable from './maintable/MainTable';
import './MainPage.less';
import { Layout, Menu, Breadcrumb, Input, Collapse, Button, Avatar } from 'antd';
import { 
    SearchOutlined,
    NotificationOutlined,
    MailOutlined,
    CalendarOutlined,
    AppstoreOutlined,
    LeftOutlined,
    RightOutlined,
    DownloadOutlined,
    CarryOutOutlined,
    UserAddOutlined,
    QuestionOutlined,
    HomeFilled,
    SettingFilled,
    ShareAltOutlined,
   } from '@ant-design/icons';
import MainTableDataStore from './maintable/MainTableDataStore';
import logo from './logo.svg'

const { Panel } = Collapse;
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { Search } = Input;

// Sider默认宽度
const defaultSiderWidth = 300

export default class MainPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      siderWidth: defaultSiderWidth,
      collapsed: false,
      title:'',
    };
  }

  componentWillMount(){
    let dataset = new MainTableDataStore();
    dataset.createSiderMenus()
    const siderMenus = dataset._siderMenus
    this.initData(dataset, siderMenus)
  }

  initData = (dataset, siderMenus) => {
    if (siderMenus[0]['menus'] && siderMenus[0]['menus'].length > 0) {
      const defaultMenu = siderMenus[0]['menus'][0]
      /* TODO: using dataset.fetchBackendBoardData() to replace the createFakeObjectData() */
      dataset.createFakeObjectData(defaultMenu['dataUrl'])
      this.setState({
        selectedKey: defaultMenu['id'],
        contentTitle: defaultMenu['name'],
        dataset: dataset,
        siderMenus: siderMenus
      })
    }
    else {
      this.setState({
        selectedKey: null,
        contentTitle: this.state.contentTitle,
        dataset: dataset,
        siderMenus: siderMenus
      })
    }
  } 

  toggle = () => {
    this.setState({
      siderWidth: !this.state.collapsed ? 0 : defaultSiderWidth,
      collapsed: !this.state.collapsed,
    });
  };
  
  nativeGetTableStore = (dataUrl, selectedKey, contentTitle) => {
    let dataset = this.state.dataset;
    dataset.createFakeObjectData(dataUrl);
    this.setState({
      selectedKey: selectedKey,
      contentTitle: contentTitle,
      dataset: dataset
    })
  }

  filterMenu = (menuId, e) => {
    let value = e.target.value.trim()
    const { dataset, siderMenus } = this.state
    if (value) {
      value = value.toLowerCase()
      let siderMenusCopy = siderMenus.slice()
      let menuIndex = siderMenusCopy.findIndex(menu => menu.id === menuId)
      let menus = siderMenusCopy[menuIndex]['menus'].filter(item => item.name.toLowerCase().indexOf(value) !== -1)
      siderMenusCopy[menuIndex]['menus'] = menus
      this.initData(dataset, siderMenusCopy)
    }
    else {
      dataset.createSiderMenus()
      const siderMenus = dataset._siderMenus
      this.initData(dataset, siderMenus)
    }
  }

  getBodyContent = () => {
    const { dataset, siderWidth, collapsed, contentTitle } = this.state
    return (
      <>
        <div id="appBread">
          <img src="./cover.png" className="body_content_cover" />
          <div className="body_content_title_row">
            <div className="body_content_title">
              <h1>{contentTitle}</h1>
            </div>
            <div className="body_content_title_right">
              <div className="body_content_title_right_item">
                <span className="body_content_title_right_label">
                  最后更新时间:&nbsp;
                </span>
                <span className="body_content_title_right_value">
                  2020-04-22 13:57:45
                </span>
              </div>
              <div className="body_content_title_right_separator" />
              <div className="body_content_title_right_item">
                <span className="body_content_title_right_label">
                  更新人:&nbsp;
                </span>
                <span className="body_content_title_right_value">
                  JGZ
                </span>
              </div>
              <div className="body_content_title_right_separator" />
              <div className="body_content_title_right_item">
                <span className="body_content_title_right_label">
                  成员数:&nbsp;
                </span>
                <span className="body_content_title_right_value">
                  8
                </span>
              </div>
              <div className="body_content_title_right_separator" />
              <div className="body_content_title_right_item">
                <span className="body_content_title_right_label">
                  操作历史:&nbsp;
                </span>
                <span className="body_content_title_right_value">
                  58
                </span>
              </div>
              <div className="body_content_title_right_separator" />
              <div className="body_content_title_right_item body_content_title_right_pointer">
                <span className="body_content_title_right_label">
                  <ShareAltOutlined />&nbsp;&nbsp;分享
                </span>
              </div>
            </div>
          </div>
          <div className="body_content_title_desc">
            相关具体的描述
          </div>
        </div>
        <Content style={{marginLeft: 24}}>
            <Route exact component={()=>
                <MainTable
                  data={dataset} 
                  siderWidth={siderWidth + (!collapsed ? -10 : 1)} 
                />}
              />
              <Route exact path="/borad" component={()=>
                <MainTable
                  data={dataset} 
                  siderWidth={siderWidth + (!collapsed ? -10 : 1)} 
                />}
              />
              <Route exact path="/dashborad" component={()=>
                <MainTable
                  data={dataset} 
                  siderWidth={siderWidth + (!collapsed ? -10 : 1)} 
                />}
              />
        </Content>
      </>
    )
  }

  render(){
    const { dataset, siderWidth, collapsed, siderMenus, contentTitle, selectedKey } = this.state
    return (
      <Router>
        <Layout>
          <Header className="header">            
            <div>
              <img className="header_logo" src={logo} />
            </div>
            <div className="header_right">
              <span>
                <Avatar 
                  size={24} 
                  style={{background: '#9370DB'}}
                >
                  LW
                </Avatar>
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
                  siderMenus.map(menu => {
                    return (
                      <Panel 
                        header={<span className="body_left_sider_panel_header">{menu.name}（{menu.menus.length}）</span>} 
                        showArrow={false} 
                        key={menu.id}
                      >
                        {
                          menu.name === '工作板'
                          ?
                          <Input
                            prefix={<SearchOutlined />}
                            placeholder="搜索工作板..."
                            style={{margin:'0 0 16px 0',borderRadius:'15px'}}
                            onChange={this.filterMenu.bind(this, menu.id)}
                          />
                          :
                          null
                        }
                        {
                          menu.menus.map(item => {
                            let style = item.id === selectedKey ? {background: '#ECECEC', fontWeight: 500} : {}
                            return (
                              <div 
                                key={item.id} 
                                className="body_left_sider_panel_menu"
                                style={style}
                                onClick={this.nativeGetTableStore.bind(this, item.dataUrl, item.id, item.name)}
                              >
                                <div className="body_left_sider_panel_menu_item_link" style={style}>
                                  <Link to={item.path}>
                                    {item.name}
                                  </Link>
                                </div>
                                <div className="body_left_sider_panel_menu_item_count" style={style}>
                                  {dataset ? dataset._sizeRows : 0}
                                </div>
                              </div>
                            )
                          })
                        }
                      </Panel>
                    )
                  })
                }
              </Collapse>
            </Sider>
            <div style={{width:'20px', height:'100%',textAlign:'center', marginLeft: collapsed ? 10 : 0}}>
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
     </Router>
    );
  }
}
