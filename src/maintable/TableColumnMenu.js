import React from 'react';
import {Button, Menu, Dropdown, message, Tooltip } from 'antd';
import { CaretDownOutlined, DeleteOutlined} from '@ant-design/icons';
import PropTypes from 'prop-types';
import { TableContext } from './data/DataContext';

class TableColumnMenu extends React.Component{
    static propTypes = {
        sortByColumn: PropTypes.func,
    }
    constructor(props){
        super(props);
        // this._onColumnMenuAction = this._onColumnMenuAction.bind(this);
    }
    
    render(){
        const columnMenubarStyle = {
            position:'absolute',
            top:'8px',
            right:'5px',
            display:'none'
        }
        const columnKey = this.props.columnKey;
        columnMenubarStyle.display = this.props.menuBarStyle;
        return(
            <TableContext.Consumer>
                {(table) => (
                    <div style={columnMenubarStyle}>
                        <Dropdown overlay={
                            <Menu style={{width:'100px'}}>
                                <Menu.Item key="reName" onClick={table.handleClick}>
                                    重命名
                                </Menu.Item>
                                <Menu.Item key="sort">
                                    排序
                                </Menu.Item>
                                <Menu.Item key="collpse" onClick={table._onCollpseColumnCallback.bind(this,columnKey,true)}>
                                    折叠
                                </Menu.Item>
                                <Menu.Item key="delete" onClick={table._onRemoveColumnCallback.bind(this,columnKey)}>
                                    删除
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
                )}
            </TableContext.Consumer>
            
        )
    }
}
export default TableColumnMenu;