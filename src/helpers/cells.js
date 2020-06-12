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
  Tooltip
} from 'antd';

import {
    CaretDownOutlined,
    DownOutlined,
    UpOutlined
} from '@ant-design/icons';

import {
  ADD_SUB_TABLE,
  RENAME_ROW,
  MOVE_TO_SECTION,
  DELETE_ROW,
  RENAME_SECTION,
  CHANGE_SECTION_COLOR,
  ADD_SECTION,
  COLLAPSE_THIS_SECTION,
  COLLAPSE_ALL_SECTION,
  DELETE_SECTION,
  COLLAPSE_SECTION,
  EXPAND_SECTION,
  EXPAND_ALL_SECTION
} from '../maintable/MainTableRowKeyAndDesc'


import {
  VISIBILITY,
  DISPLAY,
  COLOR,
  ANTD_BTN_TYPE
} from './section/header/StyleValues'

import MoveToSectionMenu from './section/header/MoveToSectionMenu'

import '../maintable/css/style/RowActionMenu.less'
import '../maintable/css/style/SectionMenu.less'

import { connect } from 'react-redux'
import { dealRowRenameModal, dealRowDeleteModal} from '../maintable/actions/rowActions';
import { dealSectionRenameModal, dealSectionDeleteModal, dealSectionColorMenu } from '../maintable/actions/SectionActions'

import getHighlightText from '../maintable/getHighlightText'

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
        {this.colorizeText(data.getCellValue(rowIndex, columnKey), rowIndex)}
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


class ImageCell extends React.PureComponent {
  render() {
    const {data, rowIndex, columnKey, ...props} = this.props;
    return (
      <ExampleImage
        src={data.getCellValue(rowIndex, columnKey)}
      />
    );
  }
}

class LinkCell extends React.PureComponent {
  render() {
    const {data, rowIndex, columnKey, ...props} = this.props;
    return (
      <Cell {...props}>
        <a href="#">{data.getCellValue(rowIndex, columnKey)}</a>
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
    const {data, rowIndex, columnKey, dataVersion,  filterInputValue, ...props} = this.props;
   
    return (
      <Cell {...props}>
        {getHighlightText(data.getCellValue(rowIndex, columnKey), filterInputValue)}
      </Cell>
    );
  }
}

@connect(null, { dealSectionRenameModal, dealSectionDeleteModal, dealSectionColorMenu })
class DropDownMenuHeader extends React.PureComponent {
  constructor(props) {
    super(props)
    
    const { data, rowIndex } = props

    let group = data.getGroupByRowIndex(rowIndex)
    let groupColor = group ? group.color : COLOR.DEFAULT
    let isCollapsed;
    if (typeof rowIndex === 'string') {
      isCollapsed = false;
    } else {
      isCollapsed = data._indexMap[props.rowIndex].isCollapsed;
    }
    // 保存分区原有的颜色
    this.state = {
      isBtnClicked: false,
      headerBtnColor: groupColor,
      headerBtnBorderColor: groupColor,
      group: group,
      groupColor: groupColor,
      headerBtnType: ANTD_BTN_TYPE.PRIMARY,
      isCollapsed,
      isShowHeaderMenu: false,
    }
  }

  componentWillReceiveProps(props) {

    const { data, rowIndex } = props
    let group = data.getGroupByRowIndex(rowIndex)
    let groupColor = group ? group.color : COLOR.DEFAULT
    let isCollapsed;
    if (typeof rowIndex === 'string') {
      isCollapsed = false;
    } else {
      isCollapsed = data._indexMap[props.rowIndex].isCollapsed;
    }

    this.setState({ 
      group: group,
      headerBtnColor: groupColor,
      headerBtnBorderColor: groupColor,
      groupColor: groupColor,
      version: props.dataVersion,
      isShowHeaderMenu: false,
      isCollapsed
    });
  }
  
  // 分区菜单
  hanldeRowHeaderMenuClick = ({ item, key, keyPath, selectedKeys, domEvent }) => {
    this.hiddenHeaderMenu()
    const { data } = this.props;
    if (key === RENAME_SECTION.key) {
      // 重命名
      this.props.dealSectionRenameModal({isShowReNameModal: true, data, isSection: true, group: this.state.group})
    }
    else if (key === CHANGE_SECTION_COLOR.key) {
      // 改变分区颜色
      this.props.dealSectionColorMenu({curGroup: this.state.group})
    }
    else if (key === ADD_SECTION.key) {
      // 添加分区
      data.addNewGroup('新分区', this.state.group.groupKey)
    }
    else if (key === COLLAPSE_THIS_SECTION.key) {
      // 折叠当前分区
      data.changeGroupCollapseState(this.state.group.groupKey, true)
    }
    else if (key === COLLAPSE_ALL_SECTION.key) {
      // 折叠所有分区
      data.changeGroupCollapseState(null, true)
    }
    else if (key === EXPAND_ALL_SECTION.key) {
      // 展开所有分区
      data.changeGroupCollapseState(null, false)
    }
    else if (key === DELETE_SECTION.key) {
      // 删除分区
      this.props.dealSectionDeleteModal({isShowDeleteModal: true, data, isSection: true, group: this.state.group})
    }
  } 

  handleBtnClick = (e) => {
    // 防止document事件的冒泡
    e.nativeEvent.stopImmediatePropagation();
    this.setState({
      isBtnClicked: true,
      isShowHeaderMenu: true
    })
  }

  // 隐藏菜单
  hiddenHeaderMenu = (e) => {
    this.setState({
      isBtnClicked: false,
      isShowHeaderMenu: false
    })
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

    // 判断此时折叠的分区大于0且展开的分区只有1，折叠所有分区则要换成展开所有分区
    let collapsedGroups = this.props.data.getGroups().filter(group => group.isCollapsed)
    let notCollapsedGroups = this.props.data.getGroups().filter(group => !group.isCollapsed)

    let sectionCollapsedMenuKey = COLLAPSE_ALL_SECTION.key
    let sectionCollapsedMenuDesc = COLLAPSE_ALL_SECTION.desc
    if (collapsedGroups.length > 0 && notCollapsedGroups.length === 1) {
      sectionCollapsedMenuKey = EXPAND_ALL_SECTION.key
      sectionCollapsedMenuDesc = EXPAND_ALL_SECTION.desc
    }

    return (
      <Menu 
        onClick={this.hanldeRowHeaderMenuClick}
        style={{width: 180, borderRadius: '8px', padding: '5px, 0px, 5px, 5px', pointerEvents: 'visible'}}
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
          key={COLLAPSE_THIS_SECTION.key}
        >
          {this.getHeaderMenuData(COLLAPSE_THIS_SECTION.desc)}
        </Menu.Item>
        <Menu.Item 
          key={sectionCollapsedMenuKey}
        >
          {this.getHeaderMenuData(sectionCollapsedMenuDesc)}
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

    if (color === COLOR.WHITE) {
      this.setState({
        isShowHeaderMenu: true
      })
    }
    else {
      this.setState({
        isShowHeaderMenu: false,
        isBtnClicked: false
      })
    }
  }

  handleVisibleChange = (visible) => {
    if (visible) {
      this.props.onCellEdit(this.props.rowIndex, this.props.columnKey)
    }
    else {
      this.props.onCellEditEnd(this.props.rowIndex, this.props.columnKey)
    }
  }

  render() {
    
    const { groupColor, headerBtnColor, headerBtnBorderColor, headerBtnType, 
      isShowHeaderMenu, isBtnClicked, isCollapsed } = this.state

      // 子阶菜单暂时不返回
    let rowIndexStr = String(this.props.rowIndex)
    if (rowIndexStr.indexOf('.') !== -1) return null

    return (
      <div 
        // onMouseEnter={this.changeHeaderMenuBtnColor.bind(this, COLOR.WHITE, COLOR.DEFAULT, ANTD_BTN_TYPE.DEFAULT)}
        // onMouseLeave={this.changeHeaderMenuBtnColor.bind(this, groupColor, groupColor, ANTD_BTN_TYPE.PRIMARY)}
        // onWheel={this.changeHeaderMenuBtnColor.bind(this, groupColor, groupColor, ANTD_BTN_TYPE.PRIMARY)}
      >
        <Dropdown 
          overlay={this.getHeaderMenu()}
          overlayClassName='menu_item_bgcolor'
          // visible={isBtnClicked && isShowHeaderMenu}
          trigger='click'
          getPopupContainer={() => this.props.container}
          onVisibleChange={this.handleVisibleChange}
        >
          <AntdButton 
            icon={<CaretDownOutlined />}
            type={headerBtnType}
            shape="circle"
            size='small'
            style={{
                    margin: '8px 6px', 
                    backgroundColor: headerBtnColor, 
                    borderColor: headerBtnBorderColor,
                    visibility: isCollapsed ? VISIBILITY.HIDDEN : VISIBILITY.VISIBLE
                  }}
            // onClick={this.handleBtnClick}
          >
          </AntdButton>
        </Dropdown>
      </div>
    )
  }
}

@connect(null, { dealRowRenameModal, dealRowDeleteModal })
class DropDownMenuCell extends React.PureComponent {
  constructor() {
    super()
    
    this.state = {
      isShowRowActionBtn: VISIBILITY.HIDDEN,
      isBtnClicked: false,
      isShowDropDown: false,
      isShowSubMenu: DISPLAY.NONE,
    }
  }

  // 行菜单
  hanldeRowCellMenuClick = ({ item, key, keyPath, selectedKeys, domEvent }) => {
    this.hiddenRowActionBtn()
    this.hiddenSubMenu()
    const { rowIndex, data } = this.props;
    if (key === ADD_SUB_TABLE.key) {
      // 添加子项
      data.addNewSubSection(rowIndex, null)
    }
    else if (key === RENAME_ROW.key) {
      // 重命名行
      let columnKey = data.getRowNameColumn()
      this.props.dealRowRenameModal({rowIndex, columnKey, isShowReNameModal: true, data});
    }
    else if (key === MOVE_TO_SECTION.key) {
      // 移动至其他分区


    }
    else if (key === DELETE_ROW.key) {
      // 删除行
      this.props.dealRowDeleteModal({isShowDeleteModal: true, data, rowIndex});
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

  showRowActionMenu = (e) => {
    // 防止document事件的冒泡
    e.nativeEvent.stopImmediatePropagation();
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
        style={{width: 180, borderRadius: '8px', padding: '5px, 0px, 5px, 5px', pointerEvents: 'visible'}}
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

  handleVisibleChange = (visible) => {
    this.setState({
      isShowDropDown: visible
    })
    if (visible) {
      this.props.onCellEdit(this.props.rowIndex, this.props.columnKey)
    }
    else {
      this.props.onCellEditEnd(this.props.rowIndex, this.props.columnKey)
    }
  }

  render() {
    const { data, rowIndex } = this.props
    
    const { isBtnClicked, isShowRowActionBtn, isShowDropDown } = this.state

    // 子阶菜单暂时不返回
    let rowIndexStr = String(rowIndex)
    if (rowIndexStr.indexOf('.') !== -1) return null

    return (
      <div 
        onMouseEnter={this.showRowActionBtn}
        onMouseLeave={this.hiddenRowActionBtn}
        // onWheel={this.hiddenRowActionBtn}
      >
        <Dropdown 
          overlay={this.getRowMenu(data, rowIndex)} 
          overlayClassName='menu_item_bgcolor'
          trigger='click'
          // visible={isBtnClicked ? (isShowRowActionBtn === VISIBILITY.HIDDEN ? false : true) : false}
          getPopupContainer={() => this.props.container}
          onVisibleChange={this.handleVisibleChange}
        >
          <AntdButton
            icon={<CaretDownOutlined />} 
            shape='circle'
            size='small'
            style={{margin: '8px 6px', visibility: isShowDropDown ? VISIBILITY.VISIBLE : isShowRowActionBtn}}
            // onClick={this.showRowActionMenu}
          />
        </Dropdown>
      </div>
    )
  }
}


class TooltipCell extends React.PureComponent {
  render() {
    const {data, rowIndex, columnKey, ...props} = this.props;
    const value = data.getCellValue(rowIndex, columnKey);
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
  constructor(props) {
    super(props);
    this.state = {
      checkbox:{
        display:'none',
        paddingBottom: '12px'
      },
      index:{
        display:'block'
      }
    }
  }
  showCheckbox = (e) => {
    this.setState({
      checkbox:{
        display:'block',
        paddingBottom: '12px'
      },
      index:{
        display:'none'
      }
    })
  }
  hideCheckbox = (e) => {
    this.setState({
      checkbox:{
        display:'none',
        paddingBottom: '12px'
      },
      index:{
        display:'block'
      }
    })
  }
  render() {
    const {data, rowIndex, columnKey, ...props} = this.props;
    const value = data.getObjectAt(rowIndex);
    
    let group = data.getGroupByRowIndex(rowIndex);
    let groupColor = group ? group.color : "#f1f3f5";
    let css_style={
      width:'100%',
      textAlign:'center',
      lineHeight:'40px',
      borderLeft:'3px solid '+groupColor
    }
    return <div style={css_style} onMouseEnter={this.showCheckbox} onMouseLeave={this.hideCheckbox}>
              <Checkbox style={this.state.checkbox} />
              <span style={this.state.index}>{rowIndex}</span>
           </div>;
    }
}

class CheckBoxHeader extends React.PureComponent {
  changeGroupCollapseState = () => {
    const { data, rowIndex } = this.props

    let group = data.getGroupByRowIndex(rowIndex)
    data.changeGroupCollapseState(group.groupKey)
  }

  render() {

    const { data, rowIndex } = this.props;
    let isCollapsed;
    if (typeof rowIndex === 'string') {
      isCollapsed = false;
    } else {
      isCollapsed = data._indexMap[rowIndex].isCollapsed;
    }
    
    // 子阶不显示展开折叠图标
    if (String(rowIndex).indexOf('.') !== -1) return null

    return (
      <Tooltip
        arrowPointAtCenter={true}
        title={isCollapsed ? EXPAND_SECTION.desc : COLLAPSE_SECTION.desc}
        mouseEnterDelay={0.8}
      >
        <AntdButton 
          icon={
            isCollapsed
            ?
            <DownOutlined style={{fontSize: '18px'}} />
            :
            <UpOutlined style={{fontSize: '18px'}} />
          }
          shape='circle'
          size='small'
          type='primary'
          style={{margin: '8px 6px', backgroundColor: '#BEBEBE', borderColor: '#BEBEBE'}}
          onClick={this.changeGroupCollapseState}
        />
      </Tooltip>
    );
  }
}


export { 
  CollapseCell, 
  ColoredTextCell, 
  ImageCell, 
  LinkCell, 
  PagedCell, 
  RemovableHeaderCell, 
  TextCell, 
  TooltipCell,
  DropDownMenuHeader, 
  DropDownMenuCell,
  CheckBoxCell,
  CheckBoxHeader 
};
