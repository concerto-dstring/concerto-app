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
  DELETE_ROW
} from '../maintable/MainTableRowKeyAndDesc'

import {
  VISIBILITY,
  DISPLAY
} from './StyleValues'

import MoveToSectionMenu from '../maintable/helper/MoveToSectionMenu'

import '../maintable/css/style/RowActionMenu.less'

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
      isShowSubMenu: DISPLAY.NONE
    }
  }

  hanldeRowActionMenuClick = ({ item, key, keyPath, selectedKeys, domEvent }) => {
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

  render() {
    const { data, rowIndex, isHeader } = this.props;

    const { isBtnClicked, isShowRowActionBtn } = this.state

    const headerMenu = (<Menu></Menu>);

    const rowMenu = (
      <Menu 
        onClick={this.hanldeRowActionMenuClick}
        style={{width: 180, borderRadius: '8px', padding: '5px, 0px, 5px, 5px'}}
      >
        <Menu.Item 
          key={ADD_SUB_TABLE.key}
        >
          {ADD_SUB_TABLE.desc}
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item 
          key={RENAME_ROW.key}
        >
          {RENAME_ROW.desc}
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
          {DELETE_ROW.desc}
        </Menu.Item>
      </Menu>
    )

    return (
      isHeader
      ?
      <Dropdown 
        overlay={headerMenu}
        trigger='click'
      >
        <AntdButton 
          icon={<CaretDownOutlined />}
          type='primary'
          shape="circle"
          size='small'
          style={{margin: '8px 6px'}}
        >
        </AntdButton>
      </Dropdown>
      :
      <div 
        onMouseEnter={this.showRowActionBtn}
        onMouseLeave={this.hiddenRowActionBtn}
      >
        <Dropdown 
          overlay={rowMenu} 
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
