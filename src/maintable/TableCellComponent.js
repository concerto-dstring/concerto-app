import React from 'react';
import {Avatar,Button, DatePicker,Input,InputNumber,Select, Popover,Menu, Dropdown} from 'antd';
import {DownloadOutlined,PlusOutlined, DownOutlined, UserOutlined,ScheduleOutlined,AccountBookOutlined,UsergroupAddOutlined,PlusCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import 'moment/locale/zh-cn';
import '../maintable/css/style/TableCellComponent.css'
const {Search} = Input;
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

    getUserArray = () => {
       return [{
           'smallName':'ZT',
           'userName':'ZhangTao'
       },{
           'smallName':'WM',
           'userName':'WuMing'
       },{
           'smallName':'李',
           'userName':'李白'
       }]
    }

    columnCanEditor = (cell_type) => {
        switch(cell_type){
            case this._proptype.TABLE_CELL_COMPONENT.PEOPLE:
            return false;

            default:
            return true;
        }
    }

    renderCellContextByType = (cell_type,value,events) => {
       switch(cell_type){
           case this._proptype.TABLE_CELL_COMPONENT.PEOPLE:
           return <Popover  placement="bottom" trigger="click" content={
                    <div>
                        {
                            this.getUserArray().map((v, i) => (
                                <div className='user' onClick={events[0]}>
                                    <div style={{padding:'5px;'}}>
                                        &nbsp;<Avatar>{v.smallName}</Avatar>&nbsp;{v.userName}
                                    </div>
                                </div>
                            ))
                        }
                    
                    </div>
                    } title={
                        <Search
                            placeholder="Search"
                            bordered={false}
                            onSearch={value => console.log(value)}
                            style={{margin:'0 0 5px 0' }}
                        />
                    }>
                    {
                        value&&
                        <div>
                            <Avatar style={{cursor:'pointer'}}>{value.substr(1,1)}</Avatar>
                            <PlusCircleOutlined style={{position:'absolute',bottom:'3px',left:'30px',color:'#1890ff'}} />
                        </div>
                    }    
                    {
                        !value&&<Button 
                        shape="circle"
                        icon={<UsergroupAddOutlined />}
                    />
                    }
                </Popover>;
            default:
            return value;
       }
    }

    createTableCellComponentByType = (cell_type,value,style,events) => {
       const { Option } = Select;
       switch(cell_type){
   
           case this._proptype.TABLE_CELL_COMPONENT.DATEPICK:               
                  value = value?moment(value, 'YYYY-MM-DD'):"";
           return <DatePicker 
                    style={{width:'100%'}} 
                    value={value} 
                    onChange={events[0]}/>;

           case this._proptype.TABLE_CELL_COMPONENT.PEOPLE:
           return <Popover  placement="bottom" trigger="click" content={
                    <div>
                        {
                            this.getUserArray().map((v, i) => (
                                <div className='user' onClick={events[0]}>
                                    <div style={{padding:'5px;'}}>
                                        &nbsp;<Avatar>{v.smallName}</Avatar>&nbsp;{v.userName}
                                    </div>
                                </div>
                            ))
                        }
                    
                    </div>
                  } title={
                    <Search
                        placeholder="Search"
                        bordered={false}
                        onSearch={value => console.log(value)}
                        style={{margin:'0 0 5px 0' }}
                    />
                  }>
                    <Button 
                        shape="circle"
                        icon={<UsergroupAddOutlined />}
                    />
                  </Popover>

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
           return <Dropdown overlay={this.getMenu(events[0])}>
                    <Button style={this.getColorByStatus(value)}>
                        {value}
                    </Button>
                  </Dropdown>
           
           case this._proptype.TABLE_CELL_COMPONENT.NUMBER:
           return <InputNumber 
                    style={{width:'100%'}} 
                    value={value} 
                    onChange={events[0]} 
                    onKeyDown={events[1]}/>;

           default:
           return <Input 
                    style={style} 
                    value={value} 
                    onChange={events[0]} 
                    onKeyDown={events[1]}/>;
       }
    }
    
}
export default TableCellComponent;