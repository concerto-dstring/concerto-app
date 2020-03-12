import React from 'react';
import {Button, Menu, Dropdown, message, Tooltip } from 'antd';
import {
    CaretDownOutlined,
    DeleteOutlined,
    } from '@ant-design/icons';
import PropTypes from 'prop-types';
class TableColumnMenu extends React.Component{
    static propTypes = {
        sortByColumn: PropTypes.func,
    }
    constructor(props){
        super(props);
        this.columnMenubarStyle = {
            position:'absolute',
            top:'8px',
            right:'5px'
        }
        this.state = {
            sortBy:'null',
            tableData:props.tableData,
            rowIndex:props.rowIndex,
            columnKey:props.columnKey
        }
        this._onColumnMenuAction = this._onColumnMenuAction.bind(this);
    }
    _onColumnMenuAction = () =>{
         
        
    }
    render(){
       
        return(
            <div style={this.columnMenubarStyle}>
                <Dropdown overlay={
                    <Menu onClick={this._onColumnMenuAction}>
                        <Menu.Item key="deleteColumn">
                            <DeleteOutlined />
                             Delete Column
                        </Menu.Item>
                    </Menu>
                } trigger={['click']}>
                    <Button 
                        size="small"
                        shape="circle"
                        icon={<CaretDownOutlined />}
                    />
                </Dropdown>  
            </div>
        )
    }
}
export default TableColumnMenu;