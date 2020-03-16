/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * @providesModule columnActions
 */

'use strict';

import {
  ROW_REORDER_START,
  ROW_REORDER_END,
  ROW_REORDER_MOVE,
  DEAL_ROW_RENAME_MODAL,
  DEAL_ROW_DELETE_MODAL,
  DEAL_ROW_MOVE_MODAL,
} from './ActionTypes';

/**
 * Initiates row reordering
 *
 * @param {{scrollStart: number, rowId: number, newRowId: number with: x: number, y:number}} reorderData
 */
export const startRowReorder = (reorderData) => ({
  type: ROW_REORDER_START,
  reorderData,
});

/**
 * Stops row reordering
 */
export const stopRowReorder = () => ({
  type: ROW_REORDER_END,
});

/**
 * Stops row reordering
 *
 * @param {{number} deltaX, {number} deltaY}
 */
export const moveRowReorder = (reorderData) => ({
  type: ROW_REORDER_MOVE,
  reorderData
});

/**
 * 处理重命名弹窗
 * @param {*} modalData 
 */
export const dealRowRenameModal = (modalData) => ({
  type: DEAL_ROW_RENAME_MODAL,
  modalData
});

/**
 * 处理删除行弹窗
 * @param {*} modalData 
 */
export const dealRowDeleteModal = (modalData) => ({
  type: DEAL_ROW_DELETE_MODAL,
  modalData
});

/**
 * 处理移动行后撤销操作的弹窗
 * @param {*} modalData 
 */
export const dealRowMoveModal = (modalData) => ({
  type: DEAL_ROW_MOVE_MODAL,
  modalData
});



