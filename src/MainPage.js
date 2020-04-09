
import React from 'react';
import MainTable from './maintable/MainTable';
import './MainPage.less'
import { Layout, Menu, Breadcrumb, Input, Collapse, Button, Avatar } from 'antd';
import { 
    SearchOutlined,
    UserOutlined,
    LaptopOutlined,
    NotificationOutlined,
    MailOutlined,
    CalendarOutlined,
    AppstoreOutlined,
    SettingOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    LeftCircleFilled,
    RightCircleFilled,
    LeftOutlined,
    RightOutlined,
    DownloadOutlined,
    CarryOutOutlined,
    UserAddOutlined,
    QuestionOutlined,
    HomeOutlined
   } from '@ant-design/icons';

const { Panel } = Collapse;
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { Search } = Input;

// Sider默认宽度
const defaultSiderWidth = 250

export default class MainPage extends React.Component {
  constructor(props){
    super(props)
    this.dataset = props.dataset;
    this.state = {
      siderWidth: defaultSiderWidth,
      collapsed: false,
    };
  }

  toggle = () => {
    this.setState({
      siderWidth: !this.state.collapsed ? 0 : defaultSiderWidth,
      collapsed: !this.state.collapsed,
    });
  };
   
  render(){
    return (
      <Layout>
        <Header className="header" style={{background:'#3f51b5',padding:'0 0 0 15px',display:'none'}} >
          
          <h2 style={{fontWeight:'bold',lineHeight:'64px',color:'#cccccc'}}>
            Concerto Dstring   
          </h2>
          
        </Header>
        <Layout>
          <div className='leftBar'>
            <div className='topDiv'>
              <br/>
              <Avatar
                  size="large"
                  className='logoIcon'
              >
                Concerto
              </Avatar>
              <Button
                  size="large"
                  shape="circle"
                  className='barIcon'
                  icon={<NotificationOutlined />}>
              </Button>
              <Button
                  size="large"
                  shape="circle"
                  className='barIcon'
                  icon={<DownloadOutlined />}>
              </Button>
            </div>
            <div className='bottomDiv'>
              <Button
                  size="large"
                  shape="circle"
                  className='barIcon'
                  icon={<CarryOutOutlined />}>
              </Button>
              <Button
                  size="large"
                  shape="circle"
                  className='barIcon'
                  icon={<UserAddOutlined />}>
              </Button>
              <Button
                  size="large"
                  shape="circle"
                  className='barIcon'
                  icon={<SearchOutlined />}>
              </Button>
              <Button
                  size="large"
                  shape="circle"
                  className='barIcon'
                  icon={<QuestionOutlined />}>
              </Button>
              <Avatar
                  size="large"
                  className='userFaceIcon'
              >
                Admin
              </Avatar>
              <div className='markIcon'></div>
              <HomeOutlined className='homeIcon'/>
            </div>
            
          </div>
          <Sider 
            style={{background:'white'}} 
            collapsible={true} 
            collapsedWidth={this.state.siderWidth} 
            width={this.state.siderWidth}
            trigger={null} 
            collapsed={this.state.collapsed}
          >
            
            <Collapse accordion defaultActiveKey={['1']}>
              <Panel header={<h3 style={{fontWeight:"bold",color:'#767676'}}>工作板区</h3>} showArrow={false} key="1">
                <Search
                  placeholder="搜索"
                  onSearch={value => console.log(value)}
                  style={{margin:'0 0 5px 0' }}
                />
                <Menu
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}
                  mode='inline'
                >
                  <Menu.Item key="1">
                    <MailOutlined />
                    邮件工作板
                  </Menu.Item>
                  <Menu.Item key="2">
                    <CalendarOutlined />
                    进度工作板
                  </Menu.Item>
                  <SubMenu
                    key="sub1"
                    title={
                      <span>
                        <AppstoreOutlined />
                        <span>开发工作板</span>
                      </span>
                    }
                  >
                    <Menu.Item key="3">开发组1</Menu.Item>
                    <Menu.Item key="4">开发组2</Menu.Item>
                    <SubMenu key="sub1-2" title="开发组3">
                      <Menu.Item key="5">设计</Menu.Item>
                      <Menu.Item key="6">测试</Menu.Item>
                    </SubMenu>
                  </SubMenu>
                  
                </Menu>
              </Panel>
              <Panel showArrow={false} header={<h3 style={{fontWeight:"bold",color:'#767676'}}>仪表板区</h3>} key="2">
                <Menu
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}
                  mode='inline'
                >
                  <Menu.Item key="1">
                    <MailOutlined />
                    邮件统计仪表板
                  </Menu.Item>
                  <Menu.Item key="2">
                    <CalendarOutlined />
                    进度仪表板
                  </Menu.Item>
                  <SubMenu
                    key="sub1"
                    title={
                      <span>
                        <AppstoreOutlined />
                        <span>开发仪表板</span>
                      </span>
                    }
                  >
                    <Menu.Item key="3">开发组1</Menu.Item>
                    <Menu.Item key="4">开发组2</Menu.Item>
                    <SubMenu key="sub1-2" title="开发组3">
                      <Menu.Item key="5">设计</Menu.Item>
                      <Menu.Item key="6">测试</Menu.Item>
                    </SubMenu>
                  </SubMenu>
                
                </Menu>
              </Panel>
            </Collapse>
            
          </Sider>
          <div style={{width:'20px',maxHeight:'100%',textAlign:'center',margin:'0 5px'}}>
            <div className="collpseBarTop"></div>
            <Button 
              shape='circle'
              size='small'
              className="collpseBar"
              onClick={this.toggle}
              icon={React.createElement(this.state.collapsed ? RightOutlined : LeftOutlined , {
                className: 'trigger',
                style:{
                  fontSize:'15px'
                }
              })}
            ></Button>
            <div className="collpseBarBottom"></div>
          </div>
          <Layout>
            <Breadcrumb 
              id="appBread"
              style={{ margin: '16px' }}
            >
              <Breadcrumb.Item>主页</Breadcrumb.Item>
              <Breadcrumb.Item>部门</Breadcrumb.Item>
              <Breadcrumb.Item>工作区</Breadcrumb.Item>
            </Breadcrumb>
            <Content>
              <MainTable 
                data={this.dataset} 
                siderWidth={this.state.siderWidth} 
              />
            </Content>
          </Layout>
        </Layout>
      </Layout>
     
    );
  }
}
