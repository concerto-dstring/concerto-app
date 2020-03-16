import React, { PureComponent, createRef } from 'react';
import { Modal, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons'
import '../css/style/MoveToSectionMenu.less'

let intervalTimer

class AfterMoveRowModal extends PureComponent {
  constructor() {
    super()

    this.state = {
      countdown: 10
    }
  }

  handleCancelClick = () => {
    clearInterval(intervalTimer)

    this.props.handleRowModal(false, false, false, false, null, null)

    this.setState({
      countdown: 10
    })
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

  // 撤销移动行
  cancelMoveRow = () => {
    const { sourceGroupKey, targetGroupKey, rowKey } = this.props

    this.props.cancelMoveRowToOtherSection(targetGroupKey, sourceGroupKey, rowKey)

    this.handleCancelClick()
  }

  render() {

    const {
      isShowAfterMoveRowModal
    } = this.props

    // 更新时若isShowAfterMoveRowModal为true则倒计时
    if (isShowAfterMoveRowModal) {
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
      <Modal
        visible={isShowAfterMoveRowModal}
        footer={null}
        destroyOnClose={true}
        width={360}
        height={60}
        closable={false}
        className='after_mover_row_modal'
      >
        <span style={{margin: '10px 0px'}}>
          &emsp;&emsp;移动成功
        </span>
        <Button 
          shape='round'
          style={{margin: '10px 10px 10px 110px', width: 92}}
          onClick={this.cancelMoveRow}
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
      </Modal>
    );
  }
}

export default AfterMoveRowModal;