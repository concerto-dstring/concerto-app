import React, {PureComponent} from 'react';
import {Modal} from 'antd';

import {connect} from 'react-redux';
import {dealRowDeleteModal, dealRowUndoDeleteMessage} from '../../../maintable/actions/rowActions';
import {dealColumnDeleteModal, dealColumnUndoDeleteMessage} from '../../../maintable/actions/columnActions';
import {dealSectionDeleteModal, dealSectionUndoDeleteMessage} from '../../../maintable/actions/SectionActions';
import {mapRowActionStateToProps} from '../../../maintable/data/mapStateToProps';

import '../../../maintable/css/style/SectionMenu.less';
import TooltipMsg from '../../../TooltipMsg';
import {UndoType, DeleteType} from '../../../maintable/data/MainTableType';

@connect(mapRowActionStateToProps, {
  dealRowDeleteModal,
  dealRowUndoDeleteMessage,
  dealSectionDeleteModal,
  dealSectionUndoDeleteMessage,
  dealColumnDeleteModal,
  dealColumnUndoDeleteMessage
})
class DeleteModal extends PureComponent {
  handleCancelClick = (deleteType, group) => {
    // 关闭弹窗
    if (deleteType === DeleteType.SECTION_DELETE) {
      this.props.dealSectionDeleteModal({
        isShowDeleteModal: false,
        deleteType,
        group,
      });
    } else if (deleteType === DeleteType.ROW_DELETE) {
      this.props.dealRowDeleteModal({
        isShowDeleteModal: false,
        deleteType,
      });
    } else if (deleteType === DeleteType.COLUMN_DELETE) {
      this.props.dealColumnDeleteModal({
        isShowDeleteModal: false,
        deleteType,
      });
    }
  };

  handleOKClick = () => {
    const {tableData, rowIndex, deleteType, group, mainTable, columnKey} = this.props;

    if (deleteType === DeleteType.SECTION_DELETE) {
      // 删除分区
      let groupIndex = tableData.removeGroup(group.groupKey);
      this.handleCancelClick(deleteType, group);

      // 显示撤销窗口
      this.props.dealSectionUndoDeleteMessage({
        isShowUndoModal: true,
        groupIndex,
        group,
        data: tableData,
        undoType: UndoType.SECTION_UNDO_DELETE,
      });
    } else if (deleteType === DeleteType.ROW_DELETE) {
      // 删除行
      let oldData = tableData.removeRow(rowIndex);

      this.handleCancelClick(deleteType);

      // 显示撤销窗口
      this.props.dealRowUndoDeleteMessage({
        isShowUndoModal: true,
        rowKey: oldData.rowKey,
        groupRowIndex: oldData.groupRowIndex,
        groupKey: oldData.groupKey,
        rowData: oldData.rowData,
        data: tableData,
        undoType: UndoType.ROW_UNDO_DELETE,
      });
    } else if (deleteType === DeleteType.COLUMN_DELETE) {
      // 删除列
      let columnData = mainTable.removeColumn(columnKey);
      this.handleCancelClick(deleteType);

      // 显示撤销窗口
      this.props.dealColumnUndoDeleteMessage({
        isShowUndoModal: true,
        columnIndex: columnData.columnIndex,
        column: columnData.oldColumn,
        mainTable: mainTable,
        undoType: UndoType.COLUMN_UNDO_DELETE,
      });
    }
  };

  getModalTitle = (deleteType, group) => {
    if (deleteType === DeleteType.SECTION_DELETE) {
      let msg = TooltipMsg.is_delete_group.replace('@param', group ? group.name : '');
      return msg;
    } else if (deleteType === DeleteType.ROW_DELETE) {
      return TooltipMsg.is_delete_row;
    } else if (deleteType === DeleteType.COLUMN_DELETE) {
      return TooltipMsg.is_delete_column;
    }
  };

  render() {
    const {isShowDeleteModal, deleteType, group} = this.props;

    return (
      <Modal
        title={this.getModalTitle(deleteType, group)}
        visible={isShowDeleteModal}
        onCancel={this.handleCancelClick.bind(this, deleteType, group)}
        onOk={this.handleOKClick}
      >
        <span>{TooltipMsg.delete_tip}</span>
      </Modal>
    );
  }
}

export default DeleteModal;
