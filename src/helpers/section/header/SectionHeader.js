import React, {PureComponent} from 'react';
import {Overlay} from 'react-overlays';
import {Input} from 'semantic-ui-react';
import styled from 'styled-components';
import Keys from '../../../maintable/vendor_upstream/core/Keys';
import {getSectionColors} from './SectionColor';

import {COLOR} from './StyleValues';
import {Dropdown, Menu} from 'antd';

import {connect} from 'react-redux';
import {dealSectionColorMenu} from '../../../maintable/actions/SectionActions';
import {mapSectionHeaderStateToProps} from '../../../maintable/data/mapStateToProps';

const CellContainer = styled.div`
  display: flex;
  flex: 1 0 100%;
  align-items: center;
  height: 100%;
  overflow: hidden;
  margin: 0px 5px;
  padding: 5px;
`;
@connect(mapSectionHeaderStateToProps, {dealSectionColorMenu})
class SectionHeader extends PureComponent {
  constructor(props) {
    super(props);
    const {data, rowIndex, isShowSectionColorMenu, columnKey} = props;
    this.state = {
      group: data.getGroupByRowIndex(rowIndex),
      editing: isShowSectionColorMenu,
      isShowSectionColorMenu: isShowSectionColorMenu,
      isSubSection: String(rowIndex).indexOf('.') !== -1,
      subItemName: data.getColumn(columnKey).name,
    };
  }

  componentWillReceiveProps(props) {
    const {data, rowIndex, curGroup, columnKey} = props;
    let group = data.getGroupByRowIndex(rowIndex);
    let isSubSection = String(rowIndex).indexOf('.') !== -1;
    let subItemName = data.getColumn(columnKey).name;
    this.setState({
      group: data.getGroupByRowIndex(rowIndex),
      oldNameValue: isSubSection ? subItemName : group.name,
      version: props.dataVersion,
      editing: curGroup && group && curGroup.groupKey === group.groupKey,
      isShowSectionColorMenu: curGroup && group && curGroup.groupKey === group.groupKey,
      isSubSection: isSubSection,
      subItemName: subItemName,
    });
  }

  setTargetRef = (ref) => (this.targetRef = ref);

  getTargetRef = () => this.targetRef;

  handleClick = () => {
    if (this.state.group && !this.state.group.isCollapsed) {
      this.setState({editing: true});
    }
  };

  handleHide = () => {
    this.setState({
      editing: false,
    });
    if (this.props.data) {
      if (this.state.isSubSection) {
        // 子分区
        if (this.state.subItemName) {
          // 有值
          this.props.data.setColumnData(this.props.columnKey, {name: this.state.subItemName});
        } else {
          // 无值则恢复上一次的值
          this.props.data.setColumnData(this.props.columnKey, {name: this.state.oldNameValue});
        }
      } else {
        // 主分区
        let group = this.state.group;
        if (group.name) {
          // 有值
          this.props.data.setGroupData(group);
        } else {
          // 无值则恢复上一次的值
          group.name = this.state.oldNameValue;
          this.props.data.setGroupData(group);
        }
      }
    }

    // 设置菜单消失
    this.hiddenSectionColorMenu();
  };

  handleChange = (e) => {
    // 子分区
    if (this.state.isSubSection) {
      this.setState({
        subItemName: e.target.value,
      });
    }
    // 主分区
    else {
      this.setState({
        group: {...this.state.group, name: e.target.value},
      });
    }
  };

  handleKey = (e) => {
    if (e.keyCode === Keys.RETURN) {
      this.handleHide();
      return;
    }
  };

  handleColorClick = ({item, key, keyPath, selectedKeys, domEvent}) => {
    // 点击菜单更换分区颜色
    let group = this.state.group;
    group.color = key;
    this.props.data.setGroupData(group);
    this.hiddenSectionColorMenu();
  };

  getSectionColorMenu = (color) => {
    let sectionColors = getSectionColors(color);

    return (
      <Menu onClick={this.handleColorClick}>
        {sectionColors.map((item) => {
          return (
            <Menu.Item key={item.color}>
              <div
                className="section_menu_change_color"
                style={{backgroundColor: item.color, marginLeft: 6, marginTop: 6}}
              />
            </Menu.Item>
          );
        })}
      </Menu>
    );
  };

  showSectionColorMenu = () => {
    this.setState({
      isShowSectionColorMenu: true,
    });
  };

  hiddenSectionColorMenu = () => {
    this.setState({
      isShowSectionColorMenu: false,
    });
    this.props.dealSectionColorMenu({});
  };

  render() {
    const {width, height} = this.props;
    const {group, editing, isShowSectionColorMenu, isSubSection, subItemName} = this.state;

    let inputValue = isSubSection ? subItemName : group ? group.name : '';
    let groupColor = group ? group.color : COLOR.SECTION_DEFAULT;

    const inputStyle = {
      width: width - 10 - 30,
      height: height - 5,
      borderRadius: '0px',
    };

    // 子分区没有菜单
    let dropdownMenu;
    if (!isSubSection) {
      dropdownMenu = (
        <Dropdown
          overlay={this.getSectionColorMenu(groupColor)}
          overlayClassName="section_menu_change_color_menu"
          visible={isShowSectionColorMenu}
          getPopupContainer={(triggerNode) =>
            triggerNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
              .parentNode.parentNode
          }
        >
          <div
            className="section_menu_change_color"
            style={{backgroundColor: groupColor, margin: 'auto 5px'}}
            onClick={this.showSectionColorMenu}
          />
        </Dropdown>
      );
    }

    return (
      <CellContainer
        ref={this.setTargetRef}
        // onClick={this.handleClick}
        // style={{color: isSubSection ? '' : groupColor}}
      >
        {!editing && '名称'}
        {editing && this.targetRef && (
          <Overlay
            show
            flip
            rootClose
            container={this.getTargetRef}
            target={this.getTargetRef}
            onHide={this.handleHide}
            onExit={this.handleHide}
          >
            {({props, placement}) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  width: this.targetRef.offsetWidth,
                  top: placement === 'top' ? this.targetRef.offsetHeight : -this.targetRef.offsetHeight,
                  display: 'flex',
                }}
                onWheel={this.hiddenSectionColorMenu}
              >
                {/* {dropdownMenu} */}
                <Input
                  autoFocus
                  value={inputValue}
                  onChange={this.handleChange}
                  style={inputStyle}
                  onKeyDown={this.handleKey}
                />
              </div>
            )}
          </Overlay>
        )}
      </CellContainer>
    );
  }
}

export default SectionHeader;
