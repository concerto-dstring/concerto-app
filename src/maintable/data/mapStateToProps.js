export const mapRowActionStateToProps = (state) => {
  return {
    isSection: state.isSection,
    isShowReNameModal: state.isShowReNameModal,
    isShowDeleteModal: state.isShowDeleteModal,
    isShowUndoModal: state.isShowUndoModal,
    columnKey: state.columnKey,
    rowIndex: state.rowIndex,
    rowData: state.rowData,
    rowKey: state.rowKey,
    groupRowIndex: state.groupRowIndex,
    groupKey: state.groupKey,
    group: state.group,
    groupIndex: state.groupIndex,
    sourceGroupKey: state.sourceGroupKey,
    targetGroupKey: state.targetGroupKey,
    tableData: state.data,
    oldSourceRow: state.oldSourceRow,
    undoType: state.undoType,
  };
};

export const mapSectionHeaderStateToProps = (state) => {
  return {
    curGroup: state.curGroup,
  };
};

export const mapRowHeaderDrawerStateToProps = (state) => {
  return {
    isOpenRowHeaderDrawer: state.isOpenRowHeaderDrawer,
    rowId: state.rowId,
    rowIndex: state.rowIndex,
    tableData: state.data,
    rowHeaderDrawerTitle: state.rowHeaderDrawerTitle,
    groupId: state.groupId,
  };
};
