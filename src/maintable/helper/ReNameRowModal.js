import React, { PureComponent, createRef } from 'react';
import { Modal, Input, message } from 'antd';

import { connect } from 'react-redux'
import { dealRowRenameModal } from '../actions/rowActions'
import { mapRowActionStateToProps } from '../data/mapStateToProps'

@connect(mapRowActionStateToProps, { dealRowRenameModal })
class ReNameRowModal extends PureComponent {
  constructor() {
    super()

    this.inputDom = createRef()
  }

  handleCancelClick = () => {
    this.props.dealRowRenameModal({
      isShowReNameRowModal: false,
    })
  }

  handleOkClick = () => {
    const {data, rowIndex, columnKey} = this.props

    const inputValue = this.inputDom.current.input.value

    if (!inputValue) {
      message.warning('标题不能为空!', 1)
      return
    }
    
    // 更新标题 真实项目应该请求后台方法更新数据
    data.setObjectAt(rowIndex, columnKey, inputValue)
    this.handleCancelClick()
    this.props.refresh()
  }

  render() {

    const {
      isShowReNameRowModal,
      data, 
      rowIndex, 
      columnKey
    } = this.props
    
    return (
      <Modal
        title='重命名标题'
        visible={isShowReNameRowModal}
        okText='保存'
        onCancel={this.handleCancelClick}
        onOk={this.handleOkClick}
        destroyOnClose={true}
      >
        <Input 
          defaultValue={rowIndex&&columnKey ? data.getObjectAt(rowIndex)[columnKey] : ''}
          size='middle'
          allowClear={true}
          onPressEnter={this.handleOkClick}
          ref={this.inputDom}
        />
      </Modal>
    );
  }
}

export default ReNameRowModal;