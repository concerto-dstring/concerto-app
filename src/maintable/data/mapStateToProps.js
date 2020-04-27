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
    tableData: state.data
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
    rowIndex: state.rowIndex,
    tableData: state.data,
    updateInfo: state.updateInfo,
    rowHeaderDrawerTitle: state.rowHeaderDrawerTitle
  }
}