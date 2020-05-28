
import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import MainTable from './maintable/MainTable';
import './MainPage.less';
import { Layout, Menu, Breadcrumb, Input, Collapse, Button, Avatar } from 'antd';
import { 
    SearchOutlined,
    LeftOutlined,
    RightOutlined,
    SettingFilled,
    ShareAltOutlined,
   } from '@ant-design/icons';
import logo from './logo.svg'
import { withApollo } from 'react-apollo'

const { Panel } = Collapse;
const { Header, Content, Sider } = Layout;

// Sider默认宽度
const defaultSiderWidth = 300

@withApollo
class MainPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      siderWidth: defaultSiderWidth,
      collapsed: false,
      dataset: props.dataset,
      boardMenus: [],
      dashboardMenus: []
    };
  }

  componentDidMount() {
    let dataset = this.props.dataset;
    dataset.fetchSideMenus(this.props.client, 'board', this.setMenus)
    // dataset.fetchSideMenus(this.props.client, 'dashboard', this.handleBusy)
  }

  setMenus = (menus, isBoard) => {
    let selectedKey
    let contentTitle
    if (isBoard) {
      if (menus.length > 0 ) {
        selectedKey = menus[0].id
        contentTitle = menus[0].name
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
      dataset.fetchBackendBoardData(this.props.client, id, null, this.setBusy)
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

  getBodyContent = () => {
    const { dataset, siderWidth, contentTitle } = this.state
    return (
      <>        
        <Content style={{marginLeft: 24}}>
            <Route exact component={()=>
                <MainTable
                  title={contentTitle}
                  data={dataset} 
                  siderWidth={siderWidth} 
                />}
              />
              <Route exact path="/borad" component={()=>
                <MainTable
                  title={contentTitle}
                  data={dataset} 
                  siderWidth={siderWidth} 
                />}
              />
              <Route exact path="/dashborad" component={()=>
                <MainTable
                  title={contentTitle}
                  data={dataset} 
                  siderWidth={siderWidth} 
                />}
              />
        </Content>
      </>
    )
  }

  getPanel = (menus, isBoard, name, key) => {
    const { dataset, selectedKey } = this.state
    return (
      <Panel 
        header={<span className="body_left_sider_panel_header">{name}（{menus.length}）</span>} 
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
            let path = (isBoard ? 'board' : 'dashboard')
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
                <div className="body_left_sider_panel_menu_item_count" style={style}>
                  {dataset ? Object.keys(dataset._rowData).length : 0}
                </div>
              </div>
            )
          })
        }
      </Panel>
    )
  }

  render(){
    const { siderWidth, collapsed, boardMenus, dashboardMenus } = this.state
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
     </Router>
    );
  }
}

export default MainPage
