
import React from 'react';
import clsx from 'clsx';
import { fade, makeStyles } from '@material-ui/core/styles';
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

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default class MiniSidebar extends React.Component {
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
