export const mapRowActionStateToProps = (state) => {
  return {
    isSection: state.isSection,
    isShowReNameModal: state.isShowReNameModal,
    isShowDeleteModal: state.isShowDeleteModal,
    isShowUndoModal: state.isShowUndoModal,
    columnKey: state.columnKey,
    rowIndex: state.rowIndex,
    rowKey: state.rowKey,
    data: state.data,
    group: state.group,
    groupIndex: state.groupIndex,
    sourceGroupKey: state.sourceGroupKey,
    targetGroupKey: state.targetGroupKey,
  }
}

export const mapSectionHeaderStateToProps = (state) => {
  return {
    curGroup: state.curGroup
  }
}