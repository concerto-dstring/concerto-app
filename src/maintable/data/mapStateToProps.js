export const mapRowActionStateToProps = (state) => {
  return {
    isSection: state.isSection,
    isShowReNameModal: state.isShowReNameModal,
    isShowDeleteModal: state.isShowDeleteModal,
    isShowUndoModal: state.isShowUndoModal,
    columnKey: state.columnKey,
    rowIndex: state.rowIndex,
    rowKey: state.rowKey,
    group: state.group,
    groupIndex: state.groupIndex,
    sourceGroupKey: state.sourceGroupKey,
    targetGroupKey: state.targetGroupKey,
    tableData: state.data,
    oldSourceRow: state.oldSourceRow
  }
}

export const mapSectionHeaderStateToProps = (state) => {
  return {
    curGroup: state.curGroup
  }
}

export const mapRowHeaderDrawerStateToProps = (state) => {
  return {
    isOpenRowHeaderDrawer: state.isOpenRowHeaderDrawer,
    rowId: state.rowId,
    tableData: state.data,
    rowHeaderDrawerTitle: state.rowHeaderDrawerTitle,
    boardId: state.boardId
  }
}