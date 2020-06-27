/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule reducers
 */

'use strict';

import { getScrollAnchor, scrollTo } from './scrollAnchor';
import * as ActionTypes from '../actions/ActionTypes';
import IntegerBufferSet from '../vendor_upstream/struct/IntegerBufferSet';
import PrefixIntervalTree from '../vendor_upstream/struct/PrefixIntervalTree';
import columnStateHelper from './columnStateHelper';
import rowStateHelper from './rowStateHelper';
import computeRenderedRows from './computeRenderedRows';
import convertColumnElementsToData from '../helper/convertColumnElementsToData';
import pick from 'lodash/pick';
import shallowEqual from '../vendor_upstream/core/shallowEqual';

/**
 * Returns the default initial state for the redux store.
 * This must be a brand new, independent object for each table instance
 * or issues may occur due to multiple tables sharing data.
 *
 * @return {!Object}
 */
function getInitialState() {
  return {
    /*
     * Input state set from props
     */
    columnProps: [],
    columnGroupProps: [],
    elementTemplates: {
      cell: [],
      footer: [],
      groupHeader: [],
      header: [],
    },
    elementHeights: {
      titleHeight: 0,
      footerHeight: 0,
      groupHeaderHeight: 0,
      headerHeight: 0,
      addRowHeight: 0,
    },
    rowSettings: {
      bufferRowCount: undefined,
      rowAttributesGetter: undefined,
      rowGroupKeyGetter: () => 0,
      rowTypeGetter: () => 0,
      rowHeight: 0,
      rowHeightGetter: () => 0,
      rowsCount: 0,
      subRowHeight: 0,
      subRowHeightGetter: () => 0,
    },
    scrollFlags: {
      overflowX: 'auto',
      overflowY: 'auto',
      showScrollbarX: true,
      showScrollbarY: true,
    },
    tableSize: {
      height: undefined,
      maxHeight: 0,
      ownerHeight: undefined,
      useMaxHeight: false,
      width: 0,
    },
    isCellEditing: false,
    CellEditingData: {},
    /*
     * Output state passed as props to the the rendered FixedDataTable
     * NOTE (jordan) rows may contain undefineds if we don't need all the buffer positions
     */
    columnReorderingData: {},
    columnResizingData: {},
    rowReorderingData: {},
    firstRowIndex: 0,
    firstRowOffset: 0,
    isColumnReordering: false,
    isColumnResizing: false,
    isRowReordering: false,
    maxScrollX: 0,
    maxScrollY: 0,
    rowOffsets: {},
    rows: [], // rowsToRender
    scrollContentHeight: 0,
    scrollX: 0,
    scrollY: 0,
    scrolling: false,
    sortColumn: null,  // +/- ascending/descending 
    heightAdjustment: 0,
    /*
     * Internal state only used by this file
     * NOTE (jordan) internal state is altered in place
     * so don't trust it for redux history or immutability checks
     * TODO (jordan) investigate if we want to move this to local or scoped state
     */
    rowBufferSet: new IntegerBufferSet(),
    storedHeights: [],
    rowOffsetIntervalTree: null, // PrefixIntervalTree
    isSection: false,
    isShowReNameModal: false,
    isShowDeleteModal: false,
    isShowUndoModal: false,
    columnKey: null,
    rowIndex: null,
    data: null,
    group: {},
  };
}

function reducers(state = getInitialState(), action) {
  switch (action.type) {
    case ActionTypes.INITIALIZE: {
      const { props } = action;

      let newState = setStateFromProps(state, props);
      newState = initializeRowHeightsAndOffsets(newState);
      const scrollAnchor = getScrollAnchor(newState, props);
      newState = computeRenderedRows(newState, scrollAnchor);
      return columnStateHelper.initialize(newState, props, {});
    }
    case ActionTypes.PROP_CHANGE: {
      const { newProps, oldProps } = action;
      let newState = setStateFromProps(state, newProps);

      if (oldProps.rowsCount !== newProps.rowsCount ||
          oldProps.rowHeight !== newProps.rowHeight ||
          oldProps.subRowHeight !== newProps.subRowHeight) {
        newState = initializeRowHeightsAndOffsets(newState);
      }

      if (oldProps.rowsCount !== newProps.rowsCount) {
        // NOTE (jordan) bad practice to modify state directly, but okay since
        // we know setStateFromProps clones state internally
        newState.rowBufferSet = new IntegerBufferSet();
      }
      
      const scrollAnchor = getScrollAnchor(newState, newProps, oldProps);

      // If anything has changed in state, update our rendered rows
      if (!shallowEqual(state, newState) || scrollAnchor.changed) {
        newState = computeRenderedRows(newState, scrollAnchor);
      }

      newState = columnStateHelper.initialize(newState, newProps, oldProps);

      // if scroll values have changed, then we're scrolling!
      if (newState.scrollX !== state.scrollX || newState.scrollY !== state.scrollY) {
        newState.scrolling = newState.scrolling || true;
      }

      // TODO REDUX_MIGRATION solve w/ evil-diff
      // TODO (jordan) check if relevant props unchanged and
      // children column widths and flex widths are unchanged
      // alternatively shallow diff and reconcile props
      return newState;
    }
    case ActionTypes.SCROLL_END: {
      const newState = Object.assign({}, state, {
        scrolling: false,
      });
      const previousScrollAnchor = {
        firstIndex: state.firstRowIndex,
        firstOffset: state.firstRowOffset,
        lastIndex: state.lastIndex,
      };
      return computeRenderedRows(newState, previousScrollAnchor);
    }
    case ActionTypes.HEIGHT_INCREASE: {
      let {increase} = action;
      const newState = Object.assign({}, state, {
        heightAdjustment: increase,
      });
      if (state.heightAdjustment === increase) {
        return newState;
      }
      const scrollAnchor = scrollTo(newState, state.scrollContentHeight);
      return computeRenderedRows(newState, scrollAnchor);
    }
    case ActionTypes.SCROLL_TO_Y: {
      let { scrollY } = action;
      const newState = Object.assign({}, state, {
        scrolling: true,
      });
      const scrollAnchor = scrollTo(newState, scrollY);
      return computeRenderedRows(newState, scrollAnchor);
    }
    case ActionTypes.COLUMN_RESIZE: {
      const { resizeData } = action;
      return columnStateHelper.resizeColumn(state, resizeData);
    }
    case ActionTypes.COLUMN_REORDER_START: {
      const { reorderData } = action;
      return columnStateHelper.reorderColumn(state, reorderData);
    }
    case ActionTypes.COLUMN_REORDER_END: {
      return Object.assign({}, state, {
        isColumnReordering: false,
        columnReorderingData: {}
      });
    }
    case ActionTypes.COLUMN_REORDER_MOVE: {
      const { deltaX, deltaY } = action;
      return columnStateHelper.reorderColumnMove(state, deltaX, deltaY);
    }
    case ActionTypes.ROW_REORDER_START: {
      const { reorderData } = action;
      return rowStateHelper.reorderRow(state, reorderData);
    }
    case ActionTypes.ROW_REORDER_MOVE: {
      const { reorderData } = action;
        return rowStateHelper.reorderRowMove(state, reorderData);
    }
    case ActionTypes.ROW_REORDER_END: {
      return Object.assign({}, state, {
        isRowReordering: false,
        RowReorderingData: {}
      });
    }
    case ActionTypes.CELL_EDIT_START: {
      const { editData } = action;
      return Object.assign({}, state, {
        isCellEditing: true,
        CellEditingData: editData
      });
    }
    case ActionTypes.CELL_EDIT_END: {
      return Object.assign({}, state, {
        isCellEditing: false,
        CellEditingData: null
      });
    }
    case ActionTypes.SCROLL_TO_X: {
      const { scrollX } = action;
      return Object.assign({}, state, {
        scrolling: true,
        scrollX,
      });
    }

    case ActionTypes.DEAL_ROW_RENAME_MODAL:
      return Object.assign({}, state, {
        isShowReNameModal: action.modalData.isShowReNameModal,
        columnKey: action.modalData.columnKey,
        rowIndex: action.modalData.rowIndex,
        data: action.modalData.data,
        isSection: action.modalData.isSection,
      })

    case ActionTypes.DEAL_ROW_DELETE_MODAL:
      return Object.assign({}, state, {
        isShowDeleteModal: action.modalData.isShowDeleteModal,
        data: action.modalData.data,
        rowIndex: action.modalData.rowIndex,
        deleteType: action.modalData.deleteType,
      })

    case ActionTypes.DEAL_ROW_UNDO_DELETE_MESSAGE:
      return Object.assign({}, state, {
        isShowUndoModal: action.modalData.isShowUndoModal,
        data: action.modalData.data,
        rowData: action.modalData.rowData,
        rowKey: action.modalData.rowKey,
        groupRowIndex: action.modalData.groupRowIndex,
        groupKey: action.modalData.groupKey,
        isSection: action.modalData.isSection,
        undoType: action.modalData.undoType,
      })

    case ActionTypes.DEAL_COLUMN_DELETE_MODAL:
      return Object.assign({}, state, {
        isShowDeleteModal: action.modalData.isShowDeleteModal,
        mainTable: action.modalData.mainTable,
        columnKey: action.modalData.columnKey,
        deleteType: action.modalData.deleteType,
      })

    case ActionTypes.DEAL_COLUMN_UNDO_DELETE_MESSAGE:
      return Object.assign({}, state, {
        isShowUndoModal: action.modalData.isShowUndoModal,
        mainTable: action.modalData.mainTable,
        columnIndex: action.modalData.columnIndex,
        column: action.modalData.column,
        undoType: action.modalData.undoType,
      })

    case ActionTypes.DEAL_ROW_MOVE_MODAL:
      return Object.assign({}, state, {
        isShowUndoModal: action.modalData.isShowUndoModal,
        data: action.modalData.data,
        oldSourceRow: action.modalData.oldSourceRow,
        rowKey: action.modalData.rowKey,
        sourceGroupKey: action.modalData.sourceGroupKey,
        targetGroupKey: action.modalData.targetGroupKey,
        isSection: action.modalData.isSection,
        undoType: action.modalData.undoType,
      })

    case ActionTypes.DEAL_SECTION_RENAME_MODAL:
      return Object.assign({}, state, {
        isShowReNameModal: action.modalData.isShowReNameModal,
        data: action.modalData.data,
        isSection: action.modalData.isSection,
        group: action.modalData.group
      })

    case ActionTypes.DEAL_SECTION_DELETE_MODAL:
      return Object.assign({}, state, {
        isShowDeleteModal: action.modalData.isShowDeleteModal,
        data: action.modalData.data,
        group: action.modalData.group,
        groupIndex: action.modalData.groupIndex,
        deleteType: action.modalData.deleteType,
      })

    case ActionTypes.DEAL_SECTION_UNDO_DELETE_MESSAGE:
      return Object.assign({}, state, {
        isShowUndoModal: action.modalData.isShowUndoModal,
        data: action.modalData.data,
        isSection: action.modalData.isSection,
        group: action.modalData.group,
        groupIndex: action.modalData.groupIndex,
        undoType: action.modalData.undoType,
      })

    case ActionTypes.DEAL_SECTION_COLOR_MENU:
      return  Object.assign({}, state, {
        curGroup: action.modalData.curGroup,
      })

    case ActionTypes.DEAL_ROW_HEADER_DRAWER:
      return Object.assign({}, state, {
        isOpenRowHeaderDrawer: action.drawerData.isOpenRowHeaderDrawer,
        data: action.drawerData.data,
        rowId: action.drawerData.rowId,
        rowIndex: action.drawerData.rowIndex,
        rowHeaderDrawerTitle: action.drawerData.rowHeaderDrawerTitle,
        groupId: action.drawerData.groupId,
      })

    default: {
      return state;
    }
  }
}

/**
 * Initialize row heights (storedHeights) & offsets based on the default rowHeight
 *
 * @param {!Object} state
 * @private
 */
function initializeRowHeightsAndOffsets(state) {
  const { rowHeight, rowsCount, subRowHeight } = state.rowSettings;
  const defaultFullRowHeight = rowHeight + subRowHeight;
  const rowOffsetIntervalTree = PrefixIntervalTree.uniform(rowsCount, defaultFullRowHeight);
  const scrollContentHeight = rowsCount * defaultFullRowHeight;
  const storedHeights = new Array(rowsCount);
  for (let idx = 0; idx < rowsCount; idx++) {
    storedHeights[idx] = defaultFullRowHeight;
  }
  return Object.assign({}, state, {
    rowOffsetIntervalTree,
    scrollContentHeight,
    storedHeights,
  });
}

/**
 * @param {!Object} state
 * @param {!Object} props
 * @return {!Object}
 * @private
 */
function setStateFromProps(state, props) {
  const {
    columnGroupProps,
    columnProps,
    elementTemplates,
    useGroupHeader,
  } = convertColumnElementsToData(props.children);

  const newState = Object.assign({}, state,
    { columnGroupProps, columnProps, elementTemplates });

  newState.elementHeights = Object.assign({}, newState.elementHeights,
    pick(props, ['cellGroupWrapperHeight', 'footerHeight', 'groupHeaderHeight', 'headerHeight', 'addRowHeight', 'titleHeight']));
  if (!useGroupHeader) {
    newState.elementHeights.groupHeaderHeight = 0;
  }

  newState.rowSettings = Object.assign({}, newState.rowSettings,
    pick(props, ['bufferRowCount', 'rowHeight', 'rowsCount', 'subRowHeight']));
  const { rowHeight, subRowHeight } = newState.rowSettings;
  newState.rowSettings.rowHeightGetter =
    props.rowHeightGetter || (() => rowHeight);
  newState.rowSettings.subRowHeightGetter = props.subRowHeightGetter;
  newState.rowSettings.subRowTotalHeightGetter =
    props.subRowTotalHeightGetter || (() => subRowHeight || 0);
    
  newState.rowSettings.rowAttributesGetter = props.rowAttributesGetter;
  newState.rowSettings.rowTypeGetter = props.rowTypeGetter;

  newState.scrollFlags = Object.assign({}, newState.scrollFlags,
    pick(props, ['overflowX', 'overflowY', 'showScrollbarX', 'showScrollbarY']));

  newState.tableSize = Object.assign({}, newState.tableSize,
    pick(props, ['height', 'maxHeight', 'ownerHeight', 'width']));
  newState.tableSize.useMaxHeight =
    newState.tableSize.height === undefined;

  return newState;
}

export default reducers;
