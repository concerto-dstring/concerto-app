/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * @providesModule columnActions
 */

'use strict';

import {
  COLUMN_REORDER_START,
  COLUMN_REORDER_END,
  COLUMN_REORDER_MOVE,
  COLUMN_RESIZE,
  DEAL_COLUMN_DELETE_MODAL,
  DEAL_COLUMN_UNDO_DELETE_MESSAGE,
} from './ActionTypes';

/**
 * Initiates column reordering
 *
 * @param {{scrollStart: number, columnKey: string, with: number, left: number}} reorderData
 */
export const startColumnReorder = (reorderData) => ({
  type: COLUMN_REORDER_START,
  reorderData,
});

/**
 * Stops column reordering
 */
export const stopColumnReorder = () => ({
  type: COLUMN_REORDER_END,
});

/**
 * Stops column reordering
 *
 * @param {number} deltaX
 */
export const moveColumnReorder = (deltaX, deltaY) => ({
  type: COLUMN_REORDER_MOVE,
  deltaX,
  deltaY,
});

/**
 * Fires a resize on column
 *
 * @param {!Object} reorderData
 */
export const resizeColumn = (resizeData) => ({
  type: COLUMN_RESIZE,
  resizeData,
});

/**
 * 处理删除列弹窗
 * @param {*} modalData 
 */
export const dealColumnDeleteModal = (modalData) => ({
  type: DEAL_COLUMN_DELETE_MODAL,
  modalData
});

/**
 * 处理删除列后撤销操作
 * @param {*} modalData 
 */
export const dealColumnUndoDeleteMessage = (modalData) => ({
  type: DEAL_COLUMN_UNDO_DELETE_MESSAGE,
  modalData
});
