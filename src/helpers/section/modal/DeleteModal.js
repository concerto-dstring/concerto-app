import React, {PureComponent} from 'react';
import {Modal} from 'antd';

import {connect} from 'react-redux';
import {dealRowDeleteModal} from '../../../maintable/actions/rowActions';
import {dealSectionDeleteModal, dealSectionUndoDeleteMessage} from '../../../maintable/actions/SectionActions';
import {mapRowActionStateToProps} from '../../../maintable/data/mapStateToProps';

import '../../../maintable/css/style/SectionMenu.less';

@connect(mapRowActionStateToProps, {dealRowDeleteModal, dealSectionDeleteModal, dealSectionUndoDeleteMessage})
class DeleteModal extends PureComponent {
  handleCancelClick = (isSection) => {
    // 关闭弹窗
    if (isSection) {
      this.props.dealSectionDeleteModal({
        isShowDeleteModal: false,
      });
    } else {
      this.props.dealRowDeleteModal({
        isShowDeleteModal: false,
      });
    }
  };

  handleOKClick = () => {
    const {tableData, rowIndex, isSection, group} = this.props;

    if (isSection) {
      // 删除分区
      let groupIndex = tableData.removeGroup(group.groupKey);
      this.handleCancelClick(isSection);

      // 显示撤销窗口
      this.props.dealSectionUndoDeleteMessage({
        isShowUndoModal: true,
        groupIndex,
        group,
        isSection,
        data: tableData,
      });
    } else {
      // 删除行
      tableData.removeRow(rowIndex);

      this.handleCancelClick(isSection);
    }
  };

  getModalTitle = (isSection, group) => {
    if (isSection) {
      return '是否删除 ' + group.name + ' 分区?';
    } else {
      return '是否删除行?';
    }
  };

  render() {
    const {isShowDeleteModal, isSection, group} = this.props;

    return (
      <Modal
        title={this.getModalTitle(isSection, group)}
        visible={isShowDeleteModal}
        onCancel={this.handleCancelClick.bind(this, isSection)}
        onOk={this.handleOKClick}
      >
        <span>删除后可以从回收站恢复</span>
      </Modal>
    );
  }
}

export default DeleteModal;
