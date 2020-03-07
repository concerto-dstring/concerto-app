
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

export default class MainPage extends React.Component {
  constructor(props){
    super(props)
    this.dataset = props.dataset;
    this.state = {
      collapsed: false,
    };
  }

  toggle = () => {
    this.setState({
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
          <Sider style={{background:'white'}} collapsible={true} collapsedWidth={0} width={250}
            trigger={null} collapsed={this.state.collapsed}>
            
            <Collapse accordion defaultActiveKey={['1']}>
              <Panel header={<h3 style={{fontWeight:"bold",color:'#767676'}}>Boards</h3>} showArrow={false} key="1">
                <Search
                  placeholder="Search"
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
                    Navigation One
                  </Menu.Item>
                  <Menu.Item key="2">
                    <CalendarOutlined />
                    Navigation Two
                  </Menu.Item>
                  <SubMenu
                    key="sub1"
                    title={
                      <span>
                        <AppstoreOutlined />
                        <span>Navigation Three</span>
                      </span>
                    }
                  >
                    <Menu.Item key="3">Option 3</Menu.Item>
                    <Menu.Item key="4">Option 4</Menu.Item>
                    <SubMenu key="sub1-2" title="Submenu">
                      <Menu.Item key="5">Option 5</Menu.Item>
                      <Menu.Item key="6">Option 6</Menu.Item>
                    </SubMenu>
                  </SubMenu>
                  
                </Menu>
              </Panel>
              <Panel showArrow={false} header={<h3 style={{fontWeight:"bold",color:'#767676'}}>Dashboards</h3>} key="2">
                <Menu
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}
                  mode='inline'
                >
                  <Menu.Item key="1">
                    <MailOutlined />
                    Navigation One
                  </Menu.Item>
                  <Menu.Item key="2">
                    <CalendarOutlined />
                    Navigation Two
                  </Menu.Item>
                  <SubMenu
                    key="sub1"
                    title={
                      <span>
                        <AppstoreOutlined />
                        <span>Navigation Three</span>
                      </span>
                    }
                  >
                    <Menu.Item key="3">Option 3</Menu.Item>
                    <Menu.Item key="4">Option 4</Menu.Item>
                    <SubMenu key="sub1-2" title="Submenu">
                      <Menu.Item key="5">Option 5</Menu.Item>
                      <Menu.Item key="6">Option 6</Menu.Item>
                    </SubMenu>
                  </SubMenu>
                
                </Menu>
              </Panel>
            </Collapse>
            
          </Sider>
          <Layout style={{ padding: '0 15px 15px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content>
              <MainTable dataset={this.dataset}/>
            </Content>
          </Layout>
        </Layout>
      </Layout>
     
    );
  }
}
