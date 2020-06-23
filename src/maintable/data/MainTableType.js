'use strict';

import WebConstants from "../../WebConstants";

export const RowType = {
  TITLE: 'TITLE',
  HEADER: 'HEADER',
  ROW: 'ROW',
  ADDROW: 'ADDROW',
  FOOTER: 'FOOTER',
  SUBHEADER: 'SUBHEADER',
  SUBROW: 'SUBROW',
  SUBADDROW: 'SUBADDROW',
  SUBFOOTER: 'SUBFOOTER',
  SECTIONGROUP: 'SECTIONGROUP',
};

export const ColumnType = {
  LABEL: 'LABEL',
  EDITBOX: 'EDITBOX',
  DROPDOWN: 'DROPDOWN',
  CHECKBOX: 'CHECKBOX',
  ROWACTION: 'ROWACTION',
  ROWSELECT: 'ROWSELECT',
  GROUPTITLE: 'GROUPTITLE',
};

export const DeleteType = {
  ROW_DELETE: 'ROW_DELETE',
  SECTION_DELETE: 'SECTION_DELETE',
  COLUMN_DELETE: 'COLUMN_DELETE',
};

export const UndoType = {
  ROW_UNDO_MOVE: 'ROW_UNDO_MOVE',
  ROW_UNDO_DELETE: 'ROW_UNDO_DELETE',
  SECTION_UNDO_DELETE: 'SECTION_UNDO_DELETE',
  COLUMN_UNDO_DELETE: 'COLUMN_UNDO_DELETE',
};

export function compareSubLevel(rowIndex1, rowIndex2) {
  let indexString1 = `${rowIndex1}`;
  let indexString2 = `${rowIndex2}`;
  let t1 = (indexString1.split(/\./) || []).length;
  let t2 = (indexString2.split(/\./) || []).length;
  return t1 - t2;
}

export function getSubLevel(rowIndex) {
  let indexString = `${rowIndex}`;
  return (indexString.split(/\./) || []).length - 1;
}

export function getUpRowIndex(rowIndex) {
  let indexString = `${rowIndex}`;
  let t = indexString.split(/\./) || [];
  if (t.length <= 1) return null;
  return t.splice(-1, 1).join('.');
}

export function getRootRowIndex(rowIndex) {
  let indexString = `${rowIndex}`;
  let t = indexString.split(/\./) || [];
  return t[0];
}

export function getLeafRowIndex(rowIndex) {
  let indexString = `${rowIndex}`;
  let t = indexString.split(/\./) || [];
  return t[t.length - 1];
}

export function compareSubRowIndex(rowIndex1, rowIndex2) {
  let indexString1 = `${rowIndex1}`;
  let indexString2 = `${rowIndex2}`;
  let t1 = indexString1.split(/\./) || [];
  let t2 = indexString2.split(/\./) || [];
  let i = 0;
  for (i = 0; i < t1.length; i++) {
    let t1 = parseInt(t1[i]);
    if (i < t2.length) {
      if (t1 !== t2) {
        t2 = parseInt(t2[i]);
        return Math.sign(t1 - t2);
      }
    } else {
      return 1;
    }
  }
  if (i < t2.length) {
    return -1;
  }
  return 0;
}

export const getDisplayName = (username) => {
  let reg = new RegExp('[\\u4E00-\\u9FFF]+', 'g');
  let displayname;
  // 判断用户名是否包含中文
  if (reg.test(username)) {
    // 包含中文取最后两个字符
    displayname = username.substring(username.length - 2, username.length);
  } else if (username.trim().indexOf(' ') !== -1) {
    // 英文包含空格取根据空格分割前两段的首字母
    let usernames = username.split(' ');
    displayname = usernames[0].substring(0, 1) + usernames[1].substring(0, 1);
  } else {
    // 英文取前两个字符
    displayname = username.substring(0, 2);
  }

  return displayname;
};

export const getUserColor = (avatar) => {
  let faceColor;

  if (avatar.startsWith('#')) {
    faceColor = avatar;
  } else {
    faceColor = '';
  }

  return faceColor;
};

export const getUserUrl = (id) => {
  return WebConstants.baseUrl + WebConstants.userUrl + id
}
