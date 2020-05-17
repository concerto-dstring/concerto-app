import React from 'react';
import {Button, Menu, Dropdown, message, Tooltip } from 'antd';
import { CaretDownOutlined, DeleteOutlined} from '@ant-design/icons';
import PropTypes from 'prop-types';
import { TableContext } from '../../../maintable/data/DataContext';
import FixedDataTableTranslateDOMPosition from '../../../maintable/FixedDataTableTranslateDOMPosition';
import './TableColumnMenu.less'

class TableColumnMenu extends React.Component{
    static propTypes = {
        sortByColumn: PropTypes.func,
    }
    constructor(props){
        super(props);
    }
    
    render(){
        const { SubMenu } = Menu;
        const columnMenubarStyle = {
            position:'absolute',
            top:'8px',
            right:'5px',
        }
        const columnKey = this.props.columnKey;

        const menuStyle = {
            width:'100px',
            position:'fixed',
            zIndex:3,
        }

        return(
            <TableContext.Consumer>
                {(table) => (
                    <div style={columnMenubarStyle} className="column_header_menu_btn">
                        <Dropdown
                            overlay={
                            <Menu style={menuStyle}>
                                <Menu.Item key="reName">
                                    重命名
                                </Menu.Item>
                                <SubMenu title="排序">
                                    <Menu.Item>升序</Menu.Item>
                                    <Menu.Item>降序</Menu.Item>
                                </SubMenu>
                                <Menu.Item key="collpse" onClick={table._onCollpseColumnCallback.bind(this,columnKey,true)}>
                                    折叠
                                </Menu.Item>
                                <Menu.Item key="delete" onClick={table._onRemoveColumnCallback.bind(this,columnKey)}>
                                    删除
                                </Menu.Item>
                            </Menu>
                        } trigger={["click"]} getPopupContainer={() => this.props.container}>
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