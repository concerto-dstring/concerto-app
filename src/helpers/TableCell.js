import React from 'react';
import 'antd/dist/antd.css'
import {Avatar,Button, DatePicker,Input,InputNumber,Select, Popover,Menu, Dropdown, Tag} from 'antd';
import {PlusOutlined, DownOutlined,ScheduleOutlined,AccountBookOutlined,CloseCircleFilled,UsergroupAddOutlined,UserOutlined,PlusCircleFilled } from '@ant-design/icons';
import moment from 'moment';
import 'moment/locale/zh-cn';
import '../maintable/css/style/TableCellComponent.css'
import { TableContext } from '../maintable/data/DataContext';
import { Cell } from '../maintable/FixedDataTableRoot';

class TableCell extends React.Component{
    constructor(props){
         super(props)
    }
    render(){
      const {type, ...props} = this.props;
      return(
        <TableContext.Consumer>
           {(table) => (
             table.type==='PEOPLE'&&<PeopleCell value={table.value} handleChange={table.handleChange} handleKey={table.handleKey}/>||
             table.type==='TEXT'&&<TextCell value={table.value} handleChange={table.handleChange} handleKey={table.handleKey}/>||
             table.type==='NUMBER'&&<NumberCell value={table.value} handleChange={table.handleChange} handleKey={table.handleKey}/>||
             table.type==='SELECT'&&<SelectCell value={table.value} handleChange={table.handleChange} handleKey={table.handleKey}/>||
             table.type==='DATE'&&<DateCell value={table.value} handleChange={table.handleChange} handleKey={table.handleKey}/>||
             table.type==='STATUS'&&<StatusCell value={table.value} handleChange={table.handleChange} handleKey={table.handleKey}/>
           )}
        </TableContext.Consumer>
      )
    } 
}


class DateCell extends React.Component {  
  render() {
    const {data, rowIndex, columnKey, collapsedRows, callback, value, handleChange, handleKey, ...props} = this.props;
    const returnValue = (e,v) => {
      handleChange(v!=''?moment(v, 'YYYY-MM-DD'):undefined)
    }
    return (
      <Cell {...props} style={{ width: '100%' }}>
          <DatePicker 
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
  
  getUserArray = () => {
    return [{
        'smallName':'Z',
        'userName':'ZhangTao'
    },{
        'smallName':'W',
        'userName':'WuMing'
    },{
        'smallName':'L',
        'userName':'LiBai'
    }]
  }

  render() {
    const {Search} = Input;
    const {data, rowIndex, columnKey, collapsedRows, callback, value, handleChange, handleKey, ...props} = this.props;
    const returnValue = (e) => {
      return handleChange(e.target.textContent);
    }
    return (
      <Cell {...props} style={{ width: '100%' }}>
         <Popover  placement="bottom" trigger="click" content={
            <div>
                {
                    this.getUserArray().map((v, i) => (
                        <div className="user" onClick={returnValue}>
                            <div style={{padding:'5px;'}}>
                                &nbsp;<Avatar>{v.smallName}</Avatar>&nbsp;{v.userName}
                            </div>
                        </div>
                    ))
                }
            </div>
            } title={
                <div>
                  {/* <div style={{paddingBottom:'10px'}}>
                  {
                    this.getUserArray().map((v, i) => (
                      <Tag closable color="blue" style={{borderRadius:'15px'}}>
                      <Avatar size="small">{v.smallName}</Avatar>{v.userName}
                      </Tag>
                    ))
                  }
                  </div> */}
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
                    <Avatar className="Avatar" style={{cursor: 'pointer'}}>{value.substr(1,1)}</Avatar>
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