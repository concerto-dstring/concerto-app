/**
 * Copyright Schrodinger, LLC
 */

"use strict";

import ExampleImage from './ExampleImage';
import { Cell } from '../maintable/FixedDataTableRoot';
import React from 'react';
import ReactTooltip from 'react-tooltip';
import { 
  Menu, 
  Dropdown, 
  Checkbox, 
  Button as AntdButton,
} from 'antd';

import {
    CaretDownOutlined
} from '@ant-design/icons';

import {
  ADD_SUB_TABLE,
  RENAME_ROW,
  MOVE_TO_SECTION,
  DELETE_ROW,
  RENAME_SECTION,
  CHANGE_SECTION_COLOR,
  ADD_SECTION,
  COLLPASE_THIS_SECTION,
  COLLPASE_ALL_SECTION,
  DELETE_SECTION
} from '../maintable/MainTableRowKeyAndDesc'

import {
  VISIBILITY,
  DISPLAY,
  COLOR,
  ANTD_BTN_TYPE
} from './StyleValues'

import MoveToSectionMenu from '../maintable/helper/MoveToSectionMenu'

import '../maintable/css/style/RowActionMenu.less'
import '../maintable/css/style/SectionMenu.less'

import { connect } from 'react-redux'
import { dealRowRenameModal, dealRowDeleteModal } from '../maintable/actions/rowActions'

const { SubMenu } = Menu;

class CollapseCell extends React.PureComponent {
  render() {
    const {data, rowIndex, columnKey, collapsedRows, callback, ...props} = this.props;
    return (
      <Cell {...props}>
        <a onClick={() => callback(rowIndex)}>
          {collapsedRows.has(rowIndex) ? '\u25BC' : '\u25BA'}
        </a>
      </Cell>
    );
  }
}

class ColoredTextCell extends React.PureComponent {
  render() {
    const {data, rowIndex, columnKey, ...props} = this.props;
    return (
      <Cell {...props}>
        {this.colorizeText(data.getObjectAt(rowIndex)[columnKey], rowIndex)}
      </Cell>
    );
  }

  colorizeText(str, index) {
    let val, n = 0;
    return str.split('').map((letter) => {
      val = index * 70 + n++;
      let color = 'hsl(' + val + ', 100%, 50%)';
      return <span style={{color}} key={val}>{letter}</span>;
    });
  }
}

class DateCell extends React.PureComponent {
  render() {
    const {data, rowIndex, columnKey, ...props} = this.props;
    return (
      <Cell {...props}>
        {data.getObjectAt(rowIndex)[columnKey].toLocaleString()}
      </Cell>
    );
  }
}



class ImageCell extends React.PureComponent {
  render() {
    const {data, rowIndex, columnKey, ...props} = this.props;
    return (
      <ExampleImage
        src={data.getObjectAt(rowIndex)[columnKey]}
      />
    );
  }
}

class LinkCell extends React.PureComponent {
  render() {
    const {data, rowIndex, columnKey, ...props} = this.props;
    return (
      <Cell {...props}>
        <a href="#">{data.getObjectAt(rowIndex)[columnKey]}</a>
      </Cell>
    );
  }
}

class PendingCell extends React.PureComponent {
  render() {
    const {data, rowIndex, columnKey, dataVersion, ...props} = this.props;
    const rowObject = data.getObjectAt(rowIndex);
    return (
      <Cell {...props}>
        {rowObject ? rowObject[columnKey] : 'pending'}
      </Cell>
    );
  }
}
const PagedCell = ({data, ...props}) => {
  const dataVersion = data.getDataVersion();
  return (
    <PendingCell
      data={data}
      dataVersion={dataVersion}
      {...props}>
    </PendingCell>
  );
};

class RemovableHeaderCell extends React.PureComponent {
  render() {
    const {data, rowIndex, columnKey, callback, children, ...props} = this.props;
    return (
      <Cell {...props}>
        {children}
        <a style={{float: 'right'}} onClick={() => callback(columnKey)}>
          {'\u274C'}
        </a>
      </Cell>
    );
  }
}

class TextCell extends React.PureComponent {
  render() {
    const {data, rowIndex, columnKey, dataVersion, ...props} = this.props;
    return (
      <Cell {...props}>
        {data.getObjectAt(rowIndex)[columnKey]}
      </Cell>
    );
  }
}

@connect(null, { dealRowRenameModal, dealRowDeleteModal })
class DropDownMenuCell extends React.PureComponent {
  constructor() {
    super()
    this.state = {
      isShowRowActionBtn: VISIBILITY.HIDDEN,
      isBtnClicked: false,
      isShowSubMenu: DISPLAY.NONE,
      headerBtnColor: '',
      headerBtnType: ANTD_BTN_TYPE.PRIMARY
    }
  }

  hanldeRowCellMenuClick = ({ item, key, keyPath, selectedKeys, domEvent }) => {
    this.hiddenRowActionBtn()
    this.hiddenSubMenu()
    const { rowIndex, data } = this.props;
    if (key == ADD_SUB_TABLE.key) {
      // 添加子项


    }
    else if (key == RENAME_ROW.key) {
      // 重命名行
      const columnKey = '1'
      this.props.dealRowRenameModal({rowIndex, columnKey, isShowReNameRowModal: true, data})
    }
    else if (key == MOVE_TO_SECTION.key) {
      // 移动至其他分区


    }
    else if (key == DELETE_ROW.key) {
      // 删除行
      this.props.dealRowDeleteModal({isShowDeleteRowModal: true, data, rowIndex})
    }
  } 

  // 显示按钮
  showRowActionBtn = (e) => {
    this.setState({
      isShowRowActionBtn: VISIBILITY.VISIBLE
    })
  }

  // 隐藏按钮
  hiddenRowActionBtn = (e) => {
    this.setState({
      isShowRowActionBtn: VISIBILITY.HIDDEN,
      isBtnClicked: false
    })
  }

  showRowActionMenu = () => {
    this.setState({
      isBtnClicked: true
    })
  }

  showSubMenu = () => {
    this.setState({
      isShowSubMenu: DISPLAY.BLOCK
    })
  }

  hiddenSubMenu = () => {
    this.setState({
      isShowSubMenu: DISPLAY.NONE,
      isShowRowActionBtn: VISIBILITY.HIDDEN,
    })
  }

  getRowMenu = (data, rowIndex) => {

    return (
      <Menu 
        onClick={this.hanldeRowCellMenuClick}
        style={{width: 180, borderRadius: '8px', padding: '5px, 0px, 5px, 5px'}}
      >
        <Menu.Item 
          key={ADD_SUB_TABLE.key}
        >
          <span>
            {ADD_SUB_TABLE.desc}
          </span>
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item 
          key={RENAME_ROW.key}
        >
          <span>
            {RENAME_ROW.desc}
          </span>
        </Menu.Item>
        <SubMenu
          key={MOVE_TO_SECTION.key}
          title={
            <span>
              {MOVE_TO_SECTION.desc}
            </span>
          }
          onMouseEnter={this.showSubMenu}
        >
          {
            <MoveToSectionMenu 
              data={data}
              rowIndex={rowIndex}
              isShowSubMenu={this.state.isShowSubMenu}
              hiddenSubMenu={this.hiddenSubMenu}
            />
          }
        </SubMenu>

        <Menu.Divider />

        <Menu.Item 
          key={DELETE_ROW.key}
        >
          <span>
            {DELETE_ROW.desc}
          </span>
        </Menu.Item>
      </Menu>
    )
  }

  getHeaderMenuData = (menuText) => {
    return (
      <>
        <i className='section_menu_icon' />
        <span className='section_menu_text'>
          {menuText}
        </span>
      </>
    )
  }

  getHeaderMenuColor = (menuText) => {
    return (
      <>
        <i 
          className='section_menu_circle_point section_menu_icon'
          style={{backgroundColor: this.state.groupColor}}
        />
        <span className='section_menu_text'>
          {menuText}
        </span>
      </>
    )
  }

  getHeaderMenu = () => {
    return (
      <Menu 
        onClick={this.hanldeRowHeaderMenuClick}
        style={{width: 180, borderRadius: '8px', padding: '5px, 0px, 5px, 5px'}}
      >
        <Menu.Item 
          key={RENAME_SECTION.key}
        >
          {this.getHeaderMenuData(RENAME_SECTION.desc)}
        </Menu.Item>
        <Menu.Item 
          key={CHANGE_SECTION_COLOR.key}
        >
          {this.getHeaderMenuColor(CHANGE_SECTION_COLOR.desc)}
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item 
          key={ADD_SECTION.key}
        >
          {this.getHeaderMenuData(ADD_SECTION.desc)}
        </Menu.Item>
        <Menu.Item 
          key={COLLPASE_THIS_SECTION.key}
        >
          {this.getHeaderMenuData(COLLPASE_THIS_SECTION.desc)}
        </Menu.Item>
        <Menu.Item 
          key={COLLPASE_ALL_SECTION.key}
        >
          {this.getHeaderMenuData(COLLPASE_ALL_SECTION.desc)}
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item 
          key={DELETE_SECTION.key}
        >
          {this.getHeaderMenuData(DELETE_SECTION.desc)}
        </Menu.Item>
      </Menu>
    )
  }

  changeHeaderMenuBtnColor = (color, borderColor, btnType) => {
    this.setState({
      headerBtnColor: color,
      headerBtnBorderColor: borderColor,
      headerBtnType: btnType
    })
  }

  render() {
    const { data, rowIndex, isHeader } = this.props;

    let returnMenu

    if (isHeader) {

      const { groupColor, headerBtnColor, headerBtnBorderColor } = this.state

      let ownGroupColor
      if (!groupColor) {
        let row = data.getRowMap()[rowIndex]
        let group = data.getGroups().filter(group => group.groupKey === row.groupKey)

        if (group.length > 0) {
          ownGroupColor = group[0].color
        }
        else {
          // 默认颜色
          ownGroupColor = COLOR.DEFAULT
        }
      }

      // 保存分区原有的颜色
      this.setState({
        groupColor: groupColor ? groupColor : ownGroupColor,
        headerBtnColor: headerBtnColor ? headerBtnColor : groupColor,
        headerBtnBorderColor: headerBtnBorderColor ? headerBtnBorderColor : groupColor
      })

      returnMenu = (
        <div 
          onMouseEnter={this.changeHeaderMenuBtnColor.bind(this, COLOR.WHITE, COLOR.DEFAULT, ANTD_BTN_TYPE.DEFAULT)}
          onMouseLeave={this.changeHeaderMenuBtnColor.bind(this, groupColor, groupColor, ANTD_BTN_TYPE.PRIMARY)}
        >
          <Dropdown 
            overlay={this.getHeaderMenu(groupColor)}
            trigger='click'
            overlayClassName='menu_item_bgcolor'
          >
            <AntdButton 
              icon={<CaretDownOutlined />}
              type={this.state.headerBtnType}
              shape="circle"
              size='small'
              style={{margin: '8px 6px', backgroundColor: this.state.headerBtnColor, borderColor: this.state.headerBtnBorderColor}}
            >
            </AntdButton>
          </Dropdown>
          </div>
      )
    }
    else {
      const { isBtnClicked, isShowRowActionBtn } = this.state

      returnMenu = (
        <div 
          onMouseEnter={this.showRowActionBtn}
          onMouseLeave={this.hiddenRowActionBtn}
        >
          <Dropdown 
            overlay={this.getRowMenu(data, rowIndex)} 
            overlayClassName='menu_item_bgcolor'
            visible={isBtnClicked ? (isShowRowActionBtn === VISIBILITY.HIDDEN ? false : true) : false}
          >
            <AntdButton
              icon={<CaretDownOutlined />} 
              shape='circle'
              size='small'
              style={{margin: '8px 6px', visibility: isShowRowActionBtn}}
              onClick={this.showRowActionMenu}
            />
          </Dropdown>
        </div>
      )
    }

    return returnMenu
  }
}


class TooltipCell extends React.PureComponent {
  render() {
    const {data, rowIndex, columnKey, ...props} = this.props;
    const value = data.getObjectAt(rowIndex)[columnKey];
    return (
      <Cell
        {...props}
        onMouseEnter={() => { ReactTooltip.show(); }}
        onMouseLeave={() => { ReactTooltip.hide(); }}>
        <div data-tip={value}>
          {value}
        </div>
      </Cell>
    );
  }
}

class CheckBoxCell extends React.PureComponent {
  render() {
    const {data, rowIndex, columnKey, ...props} = this.props;
    const value = data.getObjectAt(rowIndex);
    return (
      <Checkbox 
        checked={false}
        style={{padding: '9.2px 10px'}}
      />
    );
  }
}

export { 
  CollapseCell, 
  ColoredTextCell, 
  DateCell, 
  ImageCell, 
  LinkCell, 
  PagedCell, 
  RemovableHeaderCell, 
  TextCell, 
  TooltipCell, 
  DropDownMenuCell,
  CheckBoxCell };
