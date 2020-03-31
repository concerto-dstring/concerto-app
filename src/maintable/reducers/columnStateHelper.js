/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule columnStateHelper
 */

'use strict';

import emptyFunction from '../vendor_upstream/core/emptyFunction';
import isNil from 'lodash/isNil';
import columnWidths from '../selectors/columnWidths';
import clamp from 'lodash/clamp';
import { getSubLevel } from '../data/MainTableType';

const DRAG_SCROLL_SPEED = 15;
const DRAG_SCROLL_BUFFER = 50;

/**
 * Initialize scrollX state
 * TODO (jordan) Audit this method for cases where deep values are not properly cloned
 *
 * @param {!Object} state
 * @param {!Object} props
 * @param {Object} oldProps
 * @return {!Object}
 */
function initialize(state, props, oldProps) {
  const { scrollLeft, scrollToColumn } = props;
  let { columnResizingData, isColumnResizing, scrollX } = state;

  if (scrollLeft !== undefined &&
      (!oldProps || scrollLeft !== oldProps.scrollLeft)) {
    scrollX = scrollLeft;
  }

  scrollX = scrollTo(state, props, oldProps.scrollToColumn, scrollX);

  const { maxScrollX } = columnWidths(state);
  scrollX = clamp(scrollX, 0, maxScrollX);

  // isColumnResizing should be overwritten by value from props if available
  isColumnResizing = props.isColumnResizing !== undefined ? props.isColumnResizing : isColumnResizing;
  columnResizingData = isColumnResizing ? columnResizingData : {};

  return Object.assign({}, state, {
    columnResizingData,
    isColumnResizing,
    maxScrollX,
    scrollX,
  });
}

/**
 * @param {!Object} state
 * @param {{
 *   scrollToColumn: number,
 *   width: number,
 * }} props
 * @param {number} oldScrollToColumn
 * @param {number} scrollX
 * @return {number} The new scrollX
 */
function scrollTo(state, props, oldScrollToColumn, scrollX) {
  const { scrollToColumn } = props;
  if (isNil(scrollToColumn)) {
    return scrollX;
  }

  const {
    availableScrollWidth,
    fixedColumns,
    scrollableColumns,
  } = columnWidths(state);
  const fixedColumnsCount = fixedColumns.length;
  const scrollableColumnsCount = scrollableColumns.length;

  const noScrollableColumns = scrollableColumnsCount === 0;
  const scrollToUnchanged = scrollToColumn === oldScrollToColumn;
  const selectedColumnFixed = scrollToColumn < fixedColumnsCount;
  const selectedColumnFixedRight = scrollToColumn >= fixedColumnsCount + scrollableColumnsCount;
  if (scrollToUnchanged || selectedColumnFixed || selectedColumnFixedRight || noScrollableColumns) {
    return scrollX;
  }

  // Convert column index (0 indexed) to scrollable index (0 indexed)
  // and clamp to max scrollable index
  const clampedColumnIndex = Math.min(scrollToColumn - fixedColumnsCount,
    scrollableColumns.length - 1);

  // Compute the width of all columns to the left of the column
  let previousWidth = 0;
  for (let columnIdx = 0; columnIdx < clampedColumnIndex; ++columnIdx) {
    previousWidth += scrollableColumns[columnIdx].width;
  }

  // Get width of specified column
  const selectedColumnWidth = scrollableColumns[clampedColumnIndex].width;

  // Compute the scroll position which sets the column on the right of the viewport
  // Must scroll at least far enough for end of column (previousWidth + selectedColumnWidth)
  // to be in viewport.
  const minScrollPosition = previousWidth + selectedColumnWidth - availableScrollWidth;

  // Handle offscreen to the left
  // If scrolled less than minimum amount, scroll to minimum amount
  // so column on right of viewport
  if (scrollX < minScrollPosition) {
    return minScrollPosition;
  }

  // Handle offscreen to the right
  // If scrolled more than previous columns, at least part of column will be offscreen to left
  // Scroll so column is flush with left edge of viewport
  if (scrollX > previousWidth) {
    return previousWidth;
  }

  return scrollX;
}

/**
 * This is called when a cell that is in the header of a column has its
 * resizer knob clicked on. It displays the resizer and puts in the correct
 * location on the table.
 */
function resizeColumn(state, resizeData) {
  let {
    cellMinWidth,
    cellMaxWidth,
    cellWidth,
    columnKey,
    combinedWidth,
    clientX,
    clientY,
    leftOffset
  } = resizeData;
  return Object.assign({}, state, {
    isColumnResizing: true,
    columnResizingData: {
      left: leftOffset + combinedWidth - cellWidth,
      width: cellWidth,
      minWidth: cellMinWidth,
      maxWidth: cellMaxWidth,
      initialEvent: {
        clientX: clientX,
        clientY: clientY,
        preventDefault: emptyFunction
      },
      key: columnKey
    }
  });
}

function reorderColumn(state, reorderData) {
  let { columnKey, rowIndex, top, scrollStart, width, event } = reorderData;
  let level = getSubLevel(rowIndex);
  const { fixedColumns, columnProps} = columnWidths(state);
  const isFixed = fixedColumns.some(function(column) {
    return column.columnKey === columnKey;
  });
  let left = 0;
  for(let i = 0; i < columnProps.length; i ++) {
    if (level !== columnProps[i].level) {
      continue;
    }
    if (columnProps[i].columnKey === columnKey) {
      break;
    }
    left += columnProps[i].width;
  }

  return Object.assign({}, state, {
    isColumnReordering: true,
    columnReorderingData: {
      cancelReorder: false,
      dragDistanceX: 0,
      dragDistanceY: 0,
      isFixed: isFixed,
      scrollStart: scrollStart,
      columnKey: columnKey,
      rowIndex: rowIndex,
      columnWidth: width,
      originalLeft: left - scrollStart,
      originalTop: top,
      locationInElement: event.mouseLocation.inElement,
      columnBefore: undefined,
      columnAfter: undefined,
    }
  });
}

function reorderColumnMove(state, deltaX, deltaY) {
  const { isFixed, originalLeft } = state.columnReorderingData;
  let { columnReorderingData, maxScrollX, scrollX } = state;
  let level = getSubLevel(columnReorderingData.rowIndex);
  if (!isFixed) {
    // Relative dragX position on scroll
    const dragX = originalLeft + deltaX;
    const { columnProps, availableScrollWidth, availableScrollStart } = columnWidths(state);
    //deltaX += scrollX - scrollStart;
    let x = columnReorderingData.originalLeft + deltaX + columnReorderingData.locationInElement + scrollX;
    var columnAfter, left = 0;
    for(let i = 0; i < columnProps.length; i ++) {
      if (level !== columnProps[i].level) {
        continue;
      }
      let columnKey = columnProps[i].columnKey;
      let width = columnProps[i].width;
      if (columnKey !== '' && columnKey !== columnReorderingData.columnKey 
      && x >= left &&  x <= left + width) {
        columnAfter = columnKey;
        break;
      }
      left += width;
    }
    
    // Scroll the table left or right if we drag near the edges of the table
    if (dragX > availableScrollStart + availableScrollWidth - DRAG_SCROLL_BUFFER) {
      scrollX = Math.min(scrollX + DRAG_SCROLL_SPEED, maxScrollX);
    } else if (dragX <= availableScrollStart + DRAG_SCROLL_BUFFER) {
      scrollX = Math.max(scrollX - DRAG_SCROLL_SPEED, 0);
    }
  }

  // NOTE (jordan) Need to clone this object when use pureRendering
  const reorderingData = Object.assign({}, state.columnReorderingData, {
    dragDistanceX: deltaX,
    dragDistanceY: deltaY,
    columnBefore: undefined,
    columnAfter: columnAfter,
  });

  return Object.assign({}, state, {
    scrollX: scrollX,
    columnReorderingData: reorderingData
  });
}

export default {
  initialize,
  reorderColumn,
  reorderColumnMove,
  resizeColumn,
};
