import React, { PureComponent } from 'react';
import { Modal, Input } from 'antd';

class DeleteRowModal extends PureComponent {

  handleCancelClick = () => {
    // 关闭弹窗
    this.props.handleRowModal(false, false, false, false, null, null)
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
        onOk={this.props.handleDeleteRowOKClick}
      >
        <span>删除后可以从回收站恢复</span>
      </Modal>
    );
  }
}

export default DeleteRowModal;