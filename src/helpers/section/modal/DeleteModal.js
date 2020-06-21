import React, {PureComponent} from 'react';
import {Modal} from 'antd';

import {connect} from 'react-redux';
import {dealRowDeleteModal} from '../../../maintable/actions/rowActions';
import {dealSectionDeleteModal, dealSectionUndoDeleteMessage} from '../../../maintable/actions/SectionActions';
import {mapRowActionStateToProps} from '../../../maintable/data/mapStateToProps';

import '../../../maintable/css/style/SectionMenu.less';
import TooltipMsg from '../../../TooltipMsg';

@connect(mapRowActionStateToProps, {dealRowDeleteModal, dealSectionDeleteModal, dealSectionUndoDeleteMessage})
class DeleteModal extends PureComponent {
  handleCancelClick = (isSection, group) => {
    // 关闭弹窗
    if (isSection) {
      this.props.dealSectionDeleteModal({
        isShowDeleteModal: false,
        isSection,
        group
      });
    } else {
      this.props.dealRowDeleteModal({
        isShowDeleteModal: false,
        isSection
      });
    }
  };

  handleOKClick = () => {
    const {tableData, rowIndex, isSection, group} = this.props;

    if (isSection) {
      // 删除分区
      let groupIndex = tableData.removeGroup(group.groupKey);
      this.handleCancelClick(isSection, group);

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
      let msg = TooltipMsg.is_delete_group.replace('@param', group.name);
      return  msg;
    } else {
      return TooltipMsg.is_delete_row;
    }
  };

  render() {
    const {isShowDeleteModal, isSection, group} = this.props;

    return (
      <Modal
        title={this.getModalTitle(isSection, group)}
        visible={isShowDeleteModal}
        onCancel={this.handleCancelClick.bind(this, isSection, group)}
        onOk={this.handleOKClick}
      >
        <span>{TooltipMsg.delete_tip}</span>
      </Modal>
    );
  }
}

export default DeleteModal;
