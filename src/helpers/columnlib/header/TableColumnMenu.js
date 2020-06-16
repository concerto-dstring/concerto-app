import React from 'react';
import {Button, Menu, Dropdown, message, Tooltip} from 'antd';
import {CaretDownOutlined, DeleteOutlined} from '@ant-design/icons';
import PropTypes from 'prop-types';
import {TableContext} from '../../../maintable/data/DataContext';
import FixedDataTableTranslateDOMPosition from '../../../maintable/FixedDataTableTranslateDOMPosition';
import './TableColumnMenu.less';
import {DISPLAY} from '../../section/header/StyleValues';

class TableColumnMenu extends React.Component {
  static propTypes = {
    sortByColumn: PropTypes.func,
  };
  constructor(props) {
    super(props);

    this.state = {
      isShowDropDown: false,
    };
  }

  handleVisibleChange = (visible) => {
    this.setState({
      isShowDropDown: visible,
    });
    if (visible) {
      this.props.onCellEdit(this.props.rowIndex, this.props.columnKey);
    } else {
      this.props.onCellEditEnd(this.props.rowIndex, this.props.columnKey);
    }
  };

  render() {
    const {SubMenu} = Menu;
    const {isShowDropDown} = this.state;
    const columnMenubarStyle = {
      position: 'absolute',
      top: '4px',
      right: '5px',
      display: isShowDropDown ? DISPLAY.BLOCK : this.props.menuBarStyle,
    };
    const columnKey = this.props.columnKey;

    const menuStyle = {
      width: '100px',
      // position:'fixed',
      // zIndex:3,
      pointerEvents: 'visible',
    };

    return (
      <TableContext.Consumer>
        {(table) => (
          <div style={columnMenubarStyle} className="column_header_menu_btn">
            <Dropdown
              overlayClassName="menu_item_bgcolor"
              overlay={
                <Menu style={menuStyle}>
                  <Menu.Item key="reName">重命名</Menu.Item>
                  <SubMenu title="排序" popupClassName="menu_item_bgcolor">
                    <Menu.Item>升序</Menu.Item>
                    <Menu.Item>降序</Menu.Item>
                  </SubMenu>
                  <Menu.Item key="collpse" onClick={table._onCollpseColumnCallback.bind(this, columnKey, true)}>
                    折叠
                  </Menu.Item>
                  <Menu.Item key="delete" onClick={table._onRemoveColumnCallback.bind(this, columnKey)}>
                    删除
                  </Menu.Item>
                </Menu>
              }
              trigger={['click']}
              getPopupContainer={() => this.props.container}
              onVisibleChange={this.handleVisibleChange}
            >
              <Button size="small" shape="circle" icon={<CaretDownOutlined />} />
            </Dropdown>
          </div>
        )}
      </TableContext.Consumer>
    );
  }
}
export default TableColumnMenu;
