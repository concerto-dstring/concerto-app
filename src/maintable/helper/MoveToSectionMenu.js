import React, { Component } from 'react';

import { 
  Input,
  List,
  Modal,
  message,
  Button,
  Alert
} from 'antd';

import '../css/style/MoveToSectionMenu.less'

import { DISPLAY } from '../../helpers/StyleValues'

const { Search } = Input;

let timer

class MoveToSectionMenu extends Component {

  constructor() {
    super()
    this.state = {
      groups: [],
      curGroupKey: null,
      timeSecond: 10,
      isShowModal: false,
      isShowSubMenu: DISPLAY.BLOCK,
    }
  }

  componentDidMount() {
    this.setState({
      groups: this.getInitGroups(),
    })
  }

  getInitGroups = () => {
    const {data, rowIndex} = this.props

    const rowKey = data.getRowKey(rowIndex)

    let groupKey

    // 寻找行所在的分区
    data._indexMap.map(index => {
      if (index.rowKey === rowKey) {
        groupKey = index.groupKey
        return
      }
    })

    this.setState({
      curGroupKey: groupKey
    })

    // 去除当前行所在的分区
    let groups = []

    data.getGroups().map(group => {
      if (group.groupKey !== groupKey) {
        groups.push(group)
      }
    })

    return groups
  }

  handleInputChange = (e) => {
    const inputValue = e.currentTarget.value;

    // 过滤数据
    this.filterGroupData(inputValue)
  }

  filterGroupData = (inputValue) => {
    let filterData = []
    const groups = this.getInitGroups()

    if (inputValue) {
      groups.map(item => {
        if (item.name.indexOf(inputValue) > 0) {
          filterData.push(item)
        }
      })
    }
    else {
      filterData = groups
    }

    this.setState({
      groups: filterData
    })
  }
  
  hanldeInputSearch = (value) => {
    // 过滤数据
    this.filterGroupData(value)
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { groups, curGroupKey, isShowSubMenu } = this.state
    if (nextState.groups !== groups
          || nextState.curGroupKey !== curGroupKey
          || nextState.isShowSubMenu !== isShowSubMenu) {
      return true
    }
    return false
  }

  moveRow = (targetGroupKey) => {
    const { rowIndex } = this.props
    
    // 关闭菜单并移动行
    this.setState({
      isShowSubMenu: DISPLAY.NONE
    })

    this.props.moveRowToOtherSection(this.state.curGroupKey, targetGroupKey, rowIndex);

    // 再次设置菜单的display setTimeou必须使用匿名函数
    timer = setTimeout(() => {
      this.setState({
        isShowSubMenu: DISPLAY.BLOCK
      })
    }, 1000);
  }

  componentWillUnmount() {

    // 清除异步操作
    this.setState = (state, callback) => {
      return
    }

    // 清除定时
    clearTimeout(timer)
  }

  render() {

    return (
        <div
          className='move_menu'
          style={{display: this.state.isShowSubMenu}}
        >
          <Search
            className='move_menu_search_input'
            onChange={this.handleInputChange}
            onSearch={this.hanldeInputSearch}
          />
          <List
            style={{overflowX: 'hidden', height: 160}}
            dataSource={this.state.groups}
            renderItem={item => (
                <div 
                  className='move_menu_list'
                  key={item.groupKey}
                  onClick={this.moveRow.bind(this, item.groupKey)}
                >
                  <div 
                    className='move_menu_list_item_circle_point'
                    style={{backgroundColor: item.color}}
                  />
                  <span className='move_menu_item_span'>
                    {item.name}
                  </span>
                </div>
            )}
          />
        </div>
    );
  }
}

export default MoveToSectionMenu;