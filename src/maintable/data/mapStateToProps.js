export const mapRowActionStateToProps = (state) => {
  return {
    isShowReNameRowModal: state.isShowReNameRowModal,
    isShowDeleteRowModal: state.isShowDeleteRowModal,
    isShowAfterMoveRowModal: state.isShowAfterMoveRowModal,
    columnKey: state.columnKey,
    rowIndex: state.rowIndex,
    rowKey: state.rowKey,
    data: state.data,
    sourceGroupKey: state.sourceGroupKey,
    targetGroupKey: state.targetGroupKey,
  }
}