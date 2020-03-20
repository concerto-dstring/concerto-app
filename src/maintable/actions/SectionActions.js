'use strict';

import {
  DEAL_SECTION_RENAME_MODAL,
  DEAL_SECTION_DELETE_MODAL,
  DEAL_SECTION_UNDO_DELETE_MESSAGE,
} from './ActionTypes';


/**
 * 处理分区重命名弹窗
 * @param {*} modalData 
 */
export const dealSectionRenameModal = (modalData) => ({
  type: DEAL_SECTION_RENAME_MODAL,
  modalData
});

/**
 * 处理分区删除弹窗
 * @param {*} modalData 
 */
export const dealSectionDeleteModal = (modalData) => ({
  type: DEAL_SECTION_DELETE_MODAL,
  modalData
});

/**
 * 处理分区删除后撤销提示信息
 * @param {*} modalData 
 */
export const dealSectionUndoDeleteMessage = (modalData) => ({
  type: DEAL_SECTION_UNDO_DELETE_MESSAGE,
  modalData
});