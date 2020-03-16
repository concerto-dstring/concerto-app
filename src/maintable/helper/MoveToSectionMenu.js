import React, { Component } from 'react';

import { 
  Input,
  List,
} from 'antd';

import '../css/style/MoveToSectionMenu.less'

import { DISPLAY } from '../../helpers/StyleValues'

import { connect } from 'react-redux'
import { dealRowMoveModal } from '../actions/rowActions'

const { Search } = Input;

@connect(null, { dealRowMoveModal })
class MoveToSectionMenu extends Component {

  constructor() {
    super()
    this.state = {
      groups: [],
      curGroupKey: null,
      timeSecond: 10,
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

    // 寻找行所在的分区
    const rows = data.getRowMap()
    const row = rows[rowIndex]
    let groupKey = row.groupKey

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
    const { groups, curGroupKey } = this.state
    const { isShowSubMenu } = this.props
    if (nextState.groups !== groups
          || nextState.curGroupKey !== curGroupKey
          || nextProps.isShowSubMenu !== isShowSubMenu) {
      return true
    }
    return false
  }

  moveRow = (targetGroupKey) => {
    const { data, rowIndex } = this.props
    
    // 关闭菜单并移动行
    this.props.hiddenSubMenu()

    let rowKey = data.getRowKey(rowIndex)
    let sourceGroupRowIndex =  data.moveRow(this.state.curGroupKey, targetGroupKey, rowKey, -1)
    this.props.dealRowMoveModal({
      isShowAfterMoveRowModal: true,
      data,
      rowIndex: sourceGroupRowIndex,
      rowKey,
      sourceGroupKey: this.state.curGroupKey,
      targetGroupKey
    })
  }

  componentWillUnmount() {

    // 清除异步操作
    this.setState = (state, callback) => {
      return
    }
  }

  render() {

    return (
        <div
          className='move_menu'
          style={{display: this.props.isShowSubMenu}}
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