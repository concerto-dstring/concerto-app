import React, { PureComponent, createRef } from 'react';
import { Modal, Input, message } from 'antd';

import { connect } from 'react-redux'
import { dealRowRenameModal, } from '../actions/rowActions'
import { dealSectionRenameModal, } from '../actions/SectionActions'
import { mapRowActionStateToProps } from '../data/mapStateToProps'

@connect(mapRowActionStateToProps, { dealRowRenameModal, dealSectionRenameModal })
class ReNameModal extends PureComponent {
  constructor() {
    super()

    this.inputDom = createRef()
  }

  handleCancelClick = (isSection) => {
    if (isSection) {
      this.props.dealSectionRenameModal({
        isShowReNameModal: false,
        isSection: false
      })
    }
    else {
      this.props.dealRowRenameModal({
        isShowReNameModal: false,
      })
    }
  }

  handleOkClick = () => {
    const {data, rowIndex, columnKey, isSection, group} = this.props
    
    const inputValue = this.inputDom.current.input.value
    if (!inputValue) {
      message.warning('名称不能为空!', 1)
      return
    }

    if (isSection) {
      // 更新分区标题 真实项目应该请求后台方法更新数据
      group.name = inputValue
      data.setGroupData(group)
    }
    else {
      // 更新行标题 真实项目应该请求后台方法更新数据
      data.setObjectAt(rowIndex, columnKey, inputValue)
    }
    
    this.handleCancelClick(isSection)
  }

  render() {
    const {
      isShowReNameModal,
      data, 
      rowIndex, 
      columnKey,
      isSection,
      group
    } = this.props
   
    let defaultInputValue

    if (isSection) {
      // 分区重命名
      defaultInputValue = group ? group.name : ''
    }
    else {
      // 行重命名
      defaultInputValue = rowIndex&&columnKey ? data.getObjectAt(rowIndex)[columnKey] : ''
    }
    
    return (
      <Modal
        title='重命名名称'
        visible={isShowReNameModal}
        okText='保存'
        onCancel={this.handleCancelClick.bind(this, isSection)}
        onOk={this.handleOkClick}
        destroyOnClose={true}
      >
        <Input 
          defaultValue={defaultInputValue}
          size='middle'
          allowClear={true}
          onPressEnter={this.handleOkClick}
          ref={this.inputDom}
        />
      </Modal>
    );
  }
}

export default ReNameModal;