import React from 'react';
import 'antd/dist/antd.css'
import {Avatar,Button, DatePicker,Input,InputNumber,Select, Popover,Menu, Dropdown, Tag, Switch, Row, Col } from 'antd';
import {ClockCircleOutlined, PlusOutlined, DownOutlined,ScheduleOutlined,AccountBookOutlined,CloseCircleFilled,UsergroupAddOutlined,UserOutlined,PlusCircleFilled } from '@ant-design/icons';
import moment from 'moment';
import 'moment/locale/zh-cn';
import '../maintable/css/style/TableCellComponent.css'
import { TableContext } from '../maintable/data/DataContext';
import { Cell } from '../maintable/FixedDataTableRoot';

class TableCell extends React.Component{
    constructor(props){
         super(props)
    }
    initCellHashTable(table){
      const cellHashTable = {
          PEOPLE:<PeopleCell  value={table.value} handleChange={table.handleChange} handleKey={table.handleKey}/>,
          TEXT:<TextCell  value={table.value} handleChange={table.handleChange} handleKey={table.handleKey}/>,
          NUMBER:<NumberCell  value={table.value} handleChange={table.handleChange} handleKey={table.handleKey}/>,
          SELECT:<SelectCell  value={table.value} handleChange={table.handleChange} handleKey={table.handleKey}/>,
          DATE:<DateCell  value={table.value} handleChange={table.handleChange} handleKey={table.handleKey}/>,
          STATUS:<StatusCell  value={table.value} handleChange={table.handleChange} handleKey={table.handleKey}/>
      }
      return cellHashTable[table.type];

    }
    render(){
      const {type, ...props} = this.props;
      return(
        <TableContext.Consumer>
           {(table) => (
             this.initCellHashTable(table)
           )}
        </TableContext.Consumer>
      )
    } 
}


class DateCell extends React.Component { 
  state = {
    open:false,
    addDateTime:'',
    addTimeStyle:{
      display:'none'
    }
  }
  showDatePicker = () => {
    this.setState({
      open:true
    })
  }
  switchAddTime = (checked) => {
    this.setState({
      addTimeStyle:{
        display:checked?'block':'none'
      }
    })
  }
  checkedAddTime = (v,o) => {
    debugger;
    var test = this;
    // var newDateTime = moment(this.props.value).format('YYYY-MM-DD') +"  "+o.children;
    this.setState({
      addDateTime:o.children
    })
  }
  renderDatePicker = () => {
    const { Option } = Select;
    const saveDateTime = () => {
      this.setState({
        open:false
      })
    }
    return (
      <div>
        <Row>
          <Col span={12}>
            <div style={{float:'left'}}>Add time&nbsp;<Switch size="small" onChange={this.switchAddTime}/>
            </div>
          </Col>
          <Col span={12}>
            <div style={{float:'right',marginTop:'7px'}}>
              <Select placeholder="选择时间" size="small" suffixIcon={<ClockCircleOutlined />} style={this.state.addTimeStyle} onSelect={this.checkedAddTime}> 
                <Option value="1">01:00 AM</Option>
                <Option value="2">02:00 AM</Option>
                <Option value="3">03:00 AM</Option>
                <Option value="4">04:00 AM</Option>
                <Option value="5">05:00 AM</Option>
                <Option value="6">06:00 AM</Option>
                <Option value="7">07:00 AM</Option>
                <Option value="8">08:00 AM</Option>
                <Option value="9">09:00 AM</Option>
                <Option value="10">10:00 AM</Option>
                <Option value="11">11:00 AM</Option>
                <Option value="12">12:00 AM</Option>
                <Option value="13">01:00 PM</Option>
                <Option value="14">02:00 PM</Option>
                <Option value="15">03:00 PM</Option>
                <Option value="16">04:00 PM</Option>
                <Option value="17">05:00 PM</Option>
                <Option value="18">06:00 PM</Option>
                <Option value="19">07:00 PM</Option>
                <Option value="20">08:00 PM</Option>
                <Option value="21">09:00 PM</Option>
                <Option value="22">10:00 PM</Option>
                <Option value="23">11:00 PM</Option>
                <Option value="24">12:00 PM</Option>
              </Select>
            </div>
          </Col>
        </Row>
        <Row style={{paddingBottom:'5px'}}>
          <Col span={12}>
            <Button type="primary" shape="round" size="small" style={{float:'left'}} onClick={saveDateTime}>保存</Button>
          </Col>
          <Col span={12}>
            <Button size="small" shape="round" style={{float:'right'}}>清除</Button>
          </Col>
        </Row>
      </div>
    );
  };
  
  render() {
    const {data, rowIndex, columnKey, collapsedRows, callback, value, handleChange, handleKey, ...props} = this.props;
    const returnValue = (e,v) => {
      this.setState({
        open:true
      })
      handleChange(v!=''?moment(v, 'YYYY-MM-DD'):undefined);
    }
     
    return (
      <Cell {...props} style={{ width: '100%' }}>
       <DatePicker 
              allowClear={false}
              bordered={false}
              placeholder=""
              open={this.state.open}
              suffixIcon={<div style={{lineHeight:'33px',color:'#8b8c8d'}}>{this.state.addDateTime}</div>}
              renderExtraFooter={this.renderDatePicker} //antd官网提供的加入额外页脚的方法
              value={value?moment(value, 'YYYY-MM-DD'):undefined} 
              onChange={returnValue}
              onFocus={this.showDatePicker}
            />
      </Cell>
    );
  }
}

class TextCell extends React.Component {
  render() {
    const {data, rowIndex, columnKey, collapsedRows, callback, value, handleChange, handleKey, ...props} = this.props;
    const returnValue = (e) => {
      return handleChange(e.target.value); 
    }
    return (
      <Cell {...props} style={{ width: '100%' }}>
          <Input 
          // style={style} 
          value={value} 
          onChange={returnValue} 
          onKeyDown={handleKey}/>
      </Cell>
    );
  }
}

class NumberCell extends React.Component {
  
  render() {
    const {data, rowIndex, columnKey, collapsedRows, callback, value, handleChange, handleKey, ...props} = this.props;
    const returnValue = (e) => {
      return handleChange(e); 
    }
    return (
      <Cell {...props} style={{ width: '100%' }}>
          <InputNumber 
          style={{width:'100%'}} 
          value={value} 
          onChange={returnValue} 
          onKeyDown={handleKey}/>
      </Cell>
    );
  }
}

class SelectCell extends React.Component {
  render() {
    const { Option } = Select;
    const {data, rowIndex, columnKey, collapsedRows, callback, value, handleChange, handleKey, ...props} = this.props;
    const returnValue = (e) => {
      return handleChange(e); 
    }
    return (
      <Cell {...props} style={{ width: '100%' }}>
          <Select
              showSearch
              value={value}
              style={{ width: '100%' }}
              placeholder="Select a option"
              optionFilterProp="children"
              filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              onSelect={returnValue}
              >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="tom">Tom</Option>
          </Select>
      </Cell>
    );
  }
}

class StatusCell extends React.Component {
  constructor(props){
    super(props);
    this.statusHashTable = {
      block:'阻塞',
      working:'进行中',
      finished:'已完成',
      todo:'To Do',
      default:undefined
    }
    this.statusColorHashTable = {
      block:{background:'#d2515e',color:'white',margin:'5px'},
      working:{background:'#fec06e',color:'white',margin:'5px'},
      finished:{background:'#5ac47d',color:'white',margin:'5px'},
      todo:{background:'#808080',color:'white',margin:'5px'},
      default:{background:'#c4c4c4',color:'white',height:'31px',margin:'5px'}
    }
  }
  getSelectedStatusColor(statusName){
     for(let key in this.statusColorHashTable){
        if(statusName === this.statusHashTable[key]){
           return this.statusColorHashTable[key];
        }
     }
  }
  returnValue(e){
    return e.key!='null'?e.key:'';
  }
  render() {
    const {data, rowIndex, columnKey, collapsedRows, callback, value, handleChange, handleKey, ...props} = this.props;
    const returnValue = (e) => {
      return handleChange(e.key!='null'?e.item.props.children:'');
    }
    const menu = <Menu style={{textAlign:'center',fontWeight:'bold'}} onClick={returnValue}>
        <Menu.Item key="working" style={this.statusColorHashTable.working}>
        {this.statusHashTable.working}
        </Menu.Item>
        <Menu.Item key="block" style={this.statusColorHashTable.block}>
        {this.statusHashTable.block}
        </Menu.Item>
        <Menu.Item key="finished" style={this.statusColorHashTable.finished}>
        {this.statusHashTable.finished}
        </Menu.Item>
        <Menu.Item key="todo" style={this.statusColorHashTable.todo}>
        {this.statusHashTable.todo}
        </Menu.Item>
        <Menu.Item key="default" style={this.statusColorHashTable.default}>
        {undefined}
        </Menu.Item>
    </Menu>
    return (
      <Cell {...props} style={{ width: '100%' }}>
          <Dropdown overlay={menu} trigger={['click']}>
            <Button style={this.getSelectedStatusColor(value)} className="statusWidth">
                {value}
            </Button>
          </Dropdown>
      </Cell>
    );
  }
}

class PeopleCell extends React.Component {
  state = {
    selectedUsers:[],
    removeBar:{
      display:'none'
    }
  }
  getUserArray = () => {
    return [{
        smallName:'Z',
        userName:'ZhangTao'
    },{
        smallName:'C',
        userName:'Lucy Chen'
    },{
        smallName:'L',
        userName:'Leo'
    },{
        smallName:'M',
        userName:'Jack Ma'
    },{
        smallName:'W',
        userName:'Civen Wang'
    }]
  }
  render() {
    const {Search} = Input;
    const {data, rowIndex, columnKey, collapsedRows, callback, value, handleChange, handleKey, ...props} = this.props;
    const someusers = this.state.selectedUsers;
    const returnValue = (e) => {
      let isHas = false;
      for(let i=0,len=someusers.length;i<len;i++){
          if(e.userName === someusers[i].userName){
             isHas = true;
             break;
          }
      }
      if(!isHas){
        someusers.push(e);
      }
      this.setState({
        selectedUsers:someusers
      })
      return handleChange(e.userName);
      
    }
    const removeUser = (user) =>{
      const someusers = this.state.selectedUsers;
      for(let j=0,len2=someusers.length;j<len2;j++){
          if(user.userName === someusers[j].userName){
            someusers.splice(j,1);
            break;
          }
      }
      this.setState({
        selectedUsers:someusers
      })
      if(someusers.length<1){
        return handleChange("");
      }
    }
    const memoveAllUsers = (e) => {
      this.setState({
        selectedUsers:[]
      })
      return handleChange("");
    }
    const showRemoveUserBar = () => {
      const display = this.state.selectedUsers.length<1?'none':'block';
      this.setState({
        removeBar:{
          display:display
        }
      })
    }
    const hideRemoveUserBar = () => {
      this.setState({
        removeBar:{
          display:"none"
        }
      })
    }
    return (
      <Cell {...props} style={{ width: '100%' }}>
         <Popover  placement="bottom" trigger="click" content={
            <div>
                {
                    this.getUserArray().map((v, i) => (
                        <div key={i} className="user" onClick={returnValue.bind(this,v)}>
                            <div style={{padding:'5px'}}>
                                &nbsp;<Avatar>{v.smallName}</Avatar>&nbsp;{v.userName}
                            </div>
                        </div>
                    ))
                }
            </div>
            } title={
                <div>
                  <div style={{paddingBottom:'10px'}}>
                  {
                    someusers.map((v, i) => (
                      <Tag key={i} closable color="blue" className="userTag" onClose={removeUser.bind(this,v)}>
                        <Avatar size="small">{v.smallName}</Avatar>{v.userName}
                      </Tag>
                    ))
                  }
                  </div>
                  <Search
                      placeholder="Search"
                      bordered={false}
                      onSearch={value => console.log(value)}
                      style={{margin:'0 0 5px 0' }}
                  />
                </div>
            }>
            {
                someusers.length>0&&
                <div onMouseEnter={showRemoveUserBar} onMouseLeave={hideRemoveUserBar}>
                  <div className="userAvatar">
                    {someusers.length===1&&<Avatar className="Avatar">{someusers[0].smallName}</Avatar>}
                    {someusers.length===2&&<div><Avatar className="Avatar">{someusers[0].smallName}</Avatar><Avatar className="Avatar" style={{right:'10px'}}>{someusers[1].smallName}</Avatar></div>}
                    {someusers.length>2&&<div><Avatar className="Avatar">{someusers[0].smallName}</Avatar><Avatar className="Avatar moreUserAvatar">+{someusers.length-1}</Avatar></div>}
                  </div>
                  <PlusCircleFilled className="PlusCircleFilled"/>
                </div>
            }    
            {
                someusers.length<1&&
                <div className="userAvatar">
                    <Button className="userIcon"
                        shape="circle"
                        icon={<UserOutlined/>}
                    />
                    <PlusCircleFilled className="PlusCircleFilled"/>
                </div>
                
            }
         </Popover>;
         <CloseCircleFilled className="CloseCircleFilled" onClick={memoveAllUsers} style={this.state.removeBar}  onMouseEnter={showRemoveUserBar} onMouseLeave={hideRemoveUserBar}/>
      </Cell>
    );
  }
}
export { 
  DateCell, 
  TextCell, 
  SelectCell, 
  StatusCell, 
  PeopleCell, 
  NumberCell, 
  TableCell 
};