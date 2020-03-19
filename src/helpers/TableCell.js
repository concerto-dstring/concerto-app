import React from 'react';
import 'antd/dist/antd.css'
import {Avatar,Button, DatePicker,Input,InputNumber,Select, Popover,Menu, Dropdown, Tag, Switch} from 'antd';
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
    initCellHashTable(type, value, handleChange,handleKey){
      const cellHashTable = {
          PEOPLE:<PeopleCell  value={value} handleChange={handleChange} handleKey={handleKey}/>,
          TEXT:<TextCell  value={value} handleChange={handleChange} handleKey={handleKey}/>,
          NUMBER:<NumberCell  value={value} handleChange={handleChange} handleKey={handleKey}/>,
          SELECT:<SelectCell  value={value} handleChange={handleChange} handleKey={handleKey}/>,
          DATE:<DateCell  value={value} handleChange={handleChange} handleKey={handleKey}/>,
          STATUS:<StatusCell  value={value} handleChange={handleChange} handleKey={handleKey}/>
      }
      return cellHashTable[type];

    }
    render(){
      const {type, ...props} = this.props;
      return(
        <TableContext.Consumer>
           {(table) => (
             this.initCellHashTable(table.type,table.value,table.handleChange,table.handleKey)
           )}
        </TableContext.Consumer>
      )
    } 
}


class DateCell extends React.Component {  
  renderyear = () => {
    const { Option } = Select;
    return (
      <div>
        Add time<Switch defaultChecked />
        <Select
              placeholder="Select a option"
              size="small"
              suffixIcon={<ClockCircleOutlined />}
              >
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
        </Select><br/>
        <Button type="primary" size="small" style={{float:'left'}}>保存</Button>
        <Button size="small" style={{float:'right'}}>清除</Button>
      </div>
    );
  };
  render() {
    const {data, rowIndex, columnKey, collapsedRows, callback, value, handleChange, handleKey, ...props} = this.props;
    const returnValue = (e,v) => {
      handleChange(v!=''?moment(v, 'YYYY-MM-DD'):undefined)
    }
    return (
      <Cell {...props} style={{ width: '100%' }}>
          <DatePicker 
          // renderExtraFooter={this.renderyear} //antd官网提供的加入额外页脚的方法
          style={{width:'100%'}} 
          value={value} 
          onChange={returnValue}/>
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
  returnValue(e){
    return e.key!='null'?e.key:'';
  }
  getMenu = (event) =>{
    return (
      <Menu style={{textAlign:'center',fontWeight:'bold'}} onClick={event}>
        <Menu.Item key="Low" style={this.getColorByStatus('Low')}>
        Low
        </Menu.Item>
        <Menu.Item key="High" style={this.getColorByStatus('High')}>
        High
        </Menu.Item>
        <Menu.Item key="Medium" style={this.getColorByStatus('Medium')}>
        Medium
        </Menu.Item>
        <Menu.Item key="Besteffort" style={this.getColorByStatus('Besteffort')}>
        Best effort
        </Menu.Item>
        <Menu.Item key="null" style={this.getColorByStatus('null')}>
        &nbsp;
        </Menu.Item>
      </Menu>
    );
  }

  getColorByStatus = (status) => {
      let styles = {
          color:'white',
          width:'100%',
          margin:'3px 0'
      };
      switch(status){
          case 'Low':
              styles['background'] = 'rgb(87, 155, 252)';
              break;
          case 'High':
              styles['background'] = 'rgb(226, 68, 92)';
              break;
          case 'Medium':
              styles['background'] = 'rgb(162, 93, 220)';
              break;
          case 'Besteffort':
              styles['background'] = 'rgb(253, 171, 61)';
              break;
          default:
              styles['background'] = 'rgb(196, 196, 196)';
          
      }
      return styles;
  }

  render() {
    const {data, rowIndex, columnKey, collapsedRows, callback, value, handleChange, handleKey, ...props} = this.props;
    const returnValue = (e) => {
      return handleChange(e.key!='null'?e.key:'');
    }
    const menu = <Menu style={{textAlign:'center',fontWeight:'bold'}} onClick={returnValue}>
        <Menu.Item key="Low" style={this.getColorByStatus('Low')}>
        Low
        </Menu.Item>
        <Menu.Item key="High" style={this.getColorByStatus('High')}>
        High
        </Menu.Item>
        <Menu.Item key="Medium" style={this.getColorByStatus('Medium')}>
        Medium
        </Menu.Item>
        <Menu.Item key="Besteffort" style={this.getColorByStatus('Besteffort')}>
        Best effort
        </Menu.Item>
        <Menu.Item key="null" style={this.getColorByStatus('null')}>
        &nbsp;
        </Menu.Item>
    </Menu>
    return (
      <Cell {...props} style={{ width: '100%' }}>
          <Dropdown overlay={menu}>
            <Button style={this.getColorByStatus(value)}>
                {value}
            </Button>
          </Dropdown>
      </Cell>
    );
  }
}

class PeopleCell extends React.Component {
  state = {
    selectedUsers:[]
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
        smallName:'J',
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
    return (
      <Cell {...props} style={{ width: '100%' }}>
         <Popover  placement="bottom" trigger="click" content={
            <div>
                {
                    this.getUserArray().map((v, i) => (
                        <div className="user" onClick={returnValue.bind(this,v)}>
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
                    this.state.selectedUsers.map((v, i) => (
                      <Tag closable color="blue" style={{borderRadius:'15px',margin:'3px'}} onClose={removeUser.bind(this,v)}>
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
                value&&
                <div className="userAvatar">
                    <Avatar className="Avatar" style={{cursor: 'pointer'}}>{value.substr(0,1)}</Avatar>
                    <PlusCircleFilled className="PlusCircleFilled"/>
                    <CloseCircleFilled className="CloseCircleFilled"/>
                </div>
            }    
            {
                !value&&
                <div className="userAvatar">
                    <Button className="userIcon"
                        shape="circle"
                        icon={<UserOutlined/>}
                    />
                    <PlusCircleFilled className="PlusCircleFilled"/>
                </div>
                
            }
         </Popover>;
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