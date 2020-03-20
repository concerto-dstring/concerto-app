import React, { PureComponent } from 'react';
import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons'
import '../css/style/MoveToSectionMenu.less'
import {
  VISIBILITY,
  COLOR,
  DISPLAY
} from '../../helpers/StyleValues'

import { connect } from 'react-redux'
import { dealRowMoveModal } from '../actions/rowActions'
import { dealSectionUndoDeleteMessage } from '../actions/SectionActions'
import { mapRowActionStateToProps } from '../data/mapStateToProps'

let intervalTimer

@connect(mapRowActionStateToProps, { dealRowMoveModal, dealSectionUndoDeleteMessage })
class UndoMessage extends PureComponent {

  constructor() {
    super()

    this.state = {
      countdown: 10,
      isShowUndoModal: false
    }
  }

  handleCancelClick = () => {
    clearInterval(intervalTimer)
    const { isSection } = this.props

    if (isSection) {
      this.props.dealSectionUndoDeleteMessage({
        isShowUndoModal: false
      })
    }
    else {
      this.props.dealRowMoveModal({
        isShowUndoModal: false
      })
    }
  }

  componentWillUnmount() {
    this.clearComponent()
  }

  clearComponent = () => {
    // 清除异步操作
    this.setState = (state, callback) => {
      return
    }

    // 清除定时
    clearInterval(intervalTimer)
  }

  // 撤销相关操作
  cancelAction = () => {
    const { data, sourceGroupKey, targetGroupKey, rowKey, rowIndex, isSection, group, groupIndex  } = this.props

    if (isSection) {
      // 撤销删除分区
      data.undoRemoveGroup(groupIndex, group)
    }
    else {
      // 撤销移动行
      data.moveRow(targetGroupKey, sourceGroupKey, rowKey, rowIndex)
    }

    this.handleCancelClick()
  }

  componentWillReceiveProps(props) {
    const { isShowUndoModal } = props
    if (isShowUndoModal) {
      this.setState({
        countdown: 10
      })
    }
    this.setState({
      isShowUndoModal: isShowUndoModal
    })
  }

  render() {

    // 更新时若isShowUndoModal为true则倒计时
    if (this.state.isShowUndoModal) {
      let countdown = this.state.countdown
      clearInterval(intervalTimer)
      intervalTimer = setInterval(() => {
        if (countdown > 0) {
          countdown -= 1
          this.setState({
            countdown: countdown
          })
        }
        else {
          // 自动关闭组件
          this.handleCancelClick()
        }
      }, 1000);
    }

    return (
      <div className='undo_message' style={{display: this.state.isShowUndoModal ? DISPLAY.BLOCK : DISPLAY.NONE}}>
      <div className='undo_message_content'>
        <span style={{margin: '10px 0px'}}>
          &emsp;&emsp;{this.props.isSection ? '删除成功' : '移动成功'}
        </span>
        <Button 
          shape='round'
          type='primary'
          style={{margin: '10px 10px 10px 110px', width: 92, backgroundColor: COLOR.UNDO, borderColor: COLOR.WHITE}}
          onClick={this.cancelAction}
        >
          <span>撤 销&emsp;</span>
          <span style={{width: 12}}>{this.state.countdown}</span>
        </Button>
        <Button 
          icon={<CloseOutlined  />}
          type='link'
          style={{margin: '10px 10px 10px 16px'}}
          onClick={this.handleCancelClick}
        />
      </div>
      </div>
    );
  }
}

export default UndoMessage;