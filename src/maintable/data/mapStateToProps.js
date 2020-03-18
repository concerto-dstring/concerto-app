export const mapRowActionStateToProps = (state) => {
  return {
    isSection: state.isSection,
    isShowReNameRowModal: state.isShowReNameRowModal,
    isShowDeleteRowModal: state.isShowDeleteRowModal,
    isShowAfterMoveRowModal: state.isShowAfterMoveRowModal,
    columnKey: state.columnKey,
    rowIndex: state.rowIndex,
    rowKey: state.rowKey,
    data: state.data,
    group: state.group,
    sourceGroupKey: state.sourceGroupKey,
    targetGroupKey: state.targetGroupKey,
  }
}