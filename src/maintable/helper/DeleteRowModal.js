import React, { PureComponent } from 'react';
import { Modal } from 'antd';

import { connect } from 'react-redux'
import { dealRowDeleteModal } from '../actions/rowActions'
import { mapRowActionStateToProps } from '../data/mapStateToProps'

@connect(mapRowActionStateToProps, { dealRowDeleteModal })
class DeleteRowModal extends PureComponent {

  handleCancelClick = () => {
    // 关闭弹窗
    this.props.dealRowDeleteModal({
      isShowDeleteRowModal: false,
    })
  }

  handleOKClick = () => {

    const { data, rowIndex } = this.props
    const rows = data.getRowMap()
    const row = rows[rowIndex]

    this.props.handleDeleteRowOKClick(row.groupKey, row.rowKey)

    this.handleCancelClick()
    this.props.refresh()
  }

  render() {

    const {
      isShowDeleteRowModal
    } = this.props

    return (
      <Modal
        title='是否删除行?'
        visible={isShowDeleteRowModal}
        onCancel={this.handleCancelClick}
        onOk={this.handleOKClick}
      >
        <span>删除后可以从回收站恢复</span>
      </Modal>
    );
  }
}

export default DeleteRowModal;