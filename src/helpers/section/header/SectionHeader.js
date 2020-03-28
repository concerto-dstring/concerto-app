import React, { PureComponent } from 'react';
import { Overlay } from 'react-overlays';
import { Input } from 'semantic-ui-react';
import styled from 'styled-components';
import Keys from '../../../maintable/vendor_upstream/core/Keys';
import { getSectionColors } from './SectionColor'

import {
  COLOR
} from './StyleValues'
import { Dropdown, Menu } from 'antd';

import { connect } from 'react-redux'
import { dealSectionColorMenu } from '../../../maintable/actions/SectionActions'
import { mapSectionHeaderStateToProps } from '../../../maintable/data/mapStateToProps'

const CellContainer = styled.div`
  display: flex;
  flex: 1 0 100%;
  align-items: center;
  height: 100%;
  overflow: hidden;
  margin: 2px 5px;
  padding: 5px;
`
@connect(mapSectionHeaderStateToProps, { dealSectionColorMenu })
class SectionHeader extends PureComponent {

  constructor(props) {
    super(props)
    const { data, rowIndex, isShowSectionColorMenu } = props
    this.state = {
      group: data.getGroupByRowIndex(rowIndex),
      editing: isShowSectionColorMenu,
      isShowSectionColorMenu: isShowSectionColorMenu,
    }
  }

  componentWillReceiveProps(props) {

    const { data, rowIndex, curGroup } = props
    let group = data.getGroupByRowIndex(rowIndex)
    if (curGroup && group && curGroup.groupKey === group.groupKey) {
      this.setState({ 
        group: data.getGroupByRowIndex(rowIndex),
        version: props.dataVersion,
        editing: true,
        isShowSectionColorMenu: true,
      });
    }
    else {
      this.setState({ 
        group: data.getGroupByRowIndex(rowIndex),
        version: props.dataVersion,
        editing: false,
        isShowSectionColorMenu: false,
      });
    }
    
  }

  setTargetRef = ref => (this.targetRef = ref);

  getTargetRef = () => this.targetRef;

  handleClick = () => {
    if (this.state.group && !this.state.group.isCollapsed) {
      this.setState({ editing: true });
    } 
  }

  handleHide = () => {
    this.setState({ 
      editing: false,
    });
    if (this.props.data) {
      this.props.data.setGroupData(this.state.group);
    }

    // 设置菜单消失
    this.hiddenSectionColorMenu()
  }

  handleChange = e =>
  {
    this.setState({
      group: {...this.state.group, name: e.target.value},
    });
  }

  handleKey = e =>
  {
    if (e.keyCode === Keys.RETURN) {
      this.handleHide();
      return;
    }
  }

  handleColorClick = ({ item, key, keyPath, selectedKeys, domEvent }) => {
    // 点击菜单更换分区颜色
    let group = this.state.group
    group.color = key
    this.props.data.setGroupData(group)
    this.hiddenSectionColorMenu()
  }
  
  getSectionColorMenu = (color) => {
    let sectionColors = getSectionColors(color)

    return (
      <Menu
        onClick={this.handleColorClick}
      >
        {
          sectionColors.map(item => {
            return (
              <Menu.Item
                key={item.color}
              >
              <div 
                className='section_menu_change_color'
                style={{backgroundColor: item.color, marginLeft: 6, marginTop: 6}}
              />
            </Menu.Item>
            )
          })
        }
      </Menu>
    )
  }

  showSectionColorMenu = () => {
    this.setState({
      isShowSectionColorMenu: true
    })
  }

  hiddenSectionColorMenu = () => {
    this.setState({
      isShowSectionColorMenu: false
    })
    this.props.dealSectionColorMenu({})
  }

  render() {
    const { width, height } = this.props;
    const { group, editing, isShowSectionColorMenu, } = this.state;

    let groupName = group ? group.name : ''
    let groupColor = group ? group.color : COLOR.SECTION_DEFAULT

    const inputStyle = {
      width: width - 10 - 30,
      height: height - 5,
      borderRadius: '0px',
    }
    
    return (
      <CellContainer 
        ref={this.setTargetRef} 
        onClick={this.handleClick}
        style={{color: groupColor}}
      >
        {!editing && groupName}
        {editing && this.targetRef && (
          <Overlay
            show
            flip
            rootClose
            container={this.getTargetRef}
            target={this.getTargetRef}
            onHide={this.handleHide}
            onExit={this.handleHide}>
            {({ props, placement }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  width: this.targetRef.offsetWidth,
                  top:
                    placement === 'top'
                      ? this.targetRef.offsetHeight
                      : -this.targetRef.offsetHeight,
                  display: 'flex'
                }}
                onWheel={this.hiddenSectionColorMenu}
              >
                <Dropdown
                  overlay={this.getSectionColorMenu(groupColor)}
                  overlayClassName='section_menu_change_color_menu'
                  visible={isShowSectionColorMenu}
                  getPopupContainer={triggerNode => triggerNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode}
                >
                  <div 
                    className='section_menu_change_color'
                    style={{backgroundColor: groupColor,  margin: 'auto 5px'}}
                    onClick={this.showSectionColorMenu}
                  />
                </Dropdown>
                <Input autoFocus value={groupName} onChange={this.handleChange} style={inputStyle}     
                      onKeyDown={this.handleKey} />
              </div>
            )}
          </Overlay>
        )}
      </CellContainer>
    )
  }
}

export default SectionHeader;