
import React from 'react';
import MainTable from './maintable/MainTable';
 
import { Layout, Menu, Breadcrumb, Input, Collapse, Button } from 'antd';
import { 
    LeftOutlined,
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
    LeftCircleOutlined,
    RightCircleOutlined 
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
        <Header className="header" style={{background:'#3f51b5',padding:'0 0 0 15px'}} >
          
          <h2 style={{fontWeight:'bold',lineHeight:'64px',color:'#cccccc'}}>
            Concerto Dstring   
            {React.createElement(this.state.collapsed ? RightCircleOutlined : LeftCircleOutlined , {
              className: 'trigger',
              onClick: this.toggle,
              style:{
                paddingLeft:'37px',
                color:'white'
              }
            })}
          
          </h2>
          
        </Header>
        <Layout>
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
                  bordered={false}
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
          <Layout style={{ padding: '0 0 16px 16px' }}>
            <Breadcrumb 
              id="appBread"
              style={{ margin: '16px 0' }}
            >
              <Breadcrumb.Item>主页</Breadcrumb.Item>
              <Breadcrumb.Item>部门</Breadcrumb.Item>
              <Breadcrumb.Item>工作区</Breadcrumb.Item>
            </Breadcrumb>
            <Content>
              <MainTable 
                dataset={this.dataset} 
                siderWidth={this.state.siderWidth} 
              />
            </Content>
          </Layout>
        </Layout>
      </Layout>
     
    );
  }
}
