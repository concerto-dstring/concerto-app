import React from 'react';
import 'antd/dist/antd.css'
import {Avatar,Button, DatePicker,Input,InputNumber,Select, Popover,Menu, Dropdown} from 'antd';
import {DownloadOutlined,PlusOutlined, DownOutlined, UserOutlined,ScheduleOutlined,AccountBookOutlined } from '@ant-design/icons';
import moment from 'moment';
import 'moment/locale/zh-cn';

class TableCellComponent{
    constructor(props){
        this.createTableCellComponentByType = this.createTableCellComponentByType.bind(this);
        this._proptype = {
            TABLE_CELL_COMPONENT:{
                 INPUT_TEXT : 'TEXT',
                 DATEPICK : 'DATE',
                 PEOPLE : 'PEOPLE',
                 SELECT_LIST : 'SELECT',
                 STATUS : 'STATUS',
                 NUMBER : 'NUMBER'
            }
        }
    }
    getItems = () =>{
        const { Option } = Select;
        const children = [];
        for (let i = 10; i < 36; i++) {
          children.push(<Option key={i.toString(36) + i}>
              <Avatar style={{ verticalAlign: 'middle' }}>
              {i.toString(36)}
              </Avatar>&nbsp;
              {i.toString(36) + i}</Option>);
        }
        return children;
    } 
    getMenu = () =>{
        return (
          <Menu style={{textAlign:'center',fontWeight:'bold'}}>
            <Menu.Item key="DATE" style={{background:'red',color:'white'}}>
            Low
            </Menu.Item>
            <Menu.Item key="NUMBER" style={{background:'yellow',color:'white'}}>
            High
            </Menu.Item>
            <Menu.Item key="TEXT" style={{background:'blue',color:'white'}}>
            Medium
            </Menu.Item>
            <Menu.Item key="SELECT"  style={{background:'green',color:'white'}}>
            Best effort
            </Menu.Item>
          </Menu>
        );
    }
    createTableCellComponentByType = (cell_type,value,style,events)=>{
       const { Option } = Select;
       switch(cell_type){
   
           case this._proptype.TABLE_CELL_COMPONENT.DATEPICK:               
                  value = value?moment(value, 'YYYY-MM-DD'):"";
           return <DatePicker style={{width:'100%'}} value={value} onChange={events[0]}/>;

           case this._proptype.TABLE_CELL_COMPONENT.PEOPLE:
           return <Select 
                    mode="tags" 
                    style={{ width: '100%' }}
                    placeholder="Select a person" 
                    suffixIcon={<UserOutlined />}
                    tokenSeparators={[',']}
                    onChange = {events[0]}
                    value={value}
                    >
                    {this.getItems()}
                  </Select>;

           case this._proptype.TABLE_CELL_COMPONENT.SELECT_LIST:
           return <Select
                    showSearch
                    value={value}
                    style={{ width: '100%' }}
                    placeholder="Select a option"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    onSelect={events[0]}
                    >
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="tom">Tom</Option>
                </Select>;

           case this._proptype.TABLE_CELL_COMPONENT.STATUS:
           return <Dropdown overlay={this.getMenu}>
                    <Button  style={{width:'100%',background:'#f1f3f5'}} >
                    </Button>
                  </Dropdown>
           
           case this._proptype.TABLE_CELL_COMPONENT.NUMBER:
           return <InputNumber style={{width:'100%'}} value={value} onChange={events[0]} onKeyDown={events[1]}/>;

           default:
           return <Input style={style} value={value} onChange={events[0]} onKeyDown={events[1]}/>;
       }
    }
    
}
export default TableCellComponent;