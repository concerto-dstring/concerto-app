'use strict';

import {RowType, getSubLevel, getRootRowIndex, ColumnType} from './MainTableType';
import moment from 'moment';
import 'moment/locale/zh-cn';
import {DraftEditorProps} from 'braft-editor';
import {DateCellSummaryRule, StatusCellProperties} from '../../helpers/columnlib/cell/CellProperties';

class DataViewWrapper {
  constructor(dataset, indexMap = null, subRowKeys) {
    this._indexMap = this.getIndexMap(dataset, indexMap);
    this._subRowMap = {};
    this._subRowData = {};
    this._dataset = dataset;
    this._subRowKeys = subRowKeys;
    this._indexMap.forEach((r, i) => {
      if (this._dataset.isSubRowExpanded(r.rowKey)) {
        let rows = this._dataset.getSubRows(r.rowKey);
        if (rows.length > 0) {
          let j = 0;
          for (let k = 0; k < rows.length; k++) {
            if (this._subRowKeys && this._subRowKeys.length > 0) {
              if (this._subRowKeys.indexOf(rows[k].id) !== -1) {
                j += 1;
                const indexString = `${i}.${j}`;
                this._subRowMap[indexString] = rows[k].id;
                this._subRowData[indexString] = rows[k];
              }
            } else {
              j += 1;
              const indexString = `${i}.${j}`;
              this._subRowMap[indexString] = rows[k].id;
              this._subRowData[indexString] = rows[k];
            }
          }
          const indexString = `${i}.${j + 1}`;
          this._subRowMap[indexString] = r.rowKey;
          this._subRowData[indexString] = r;
        }
      }
    });
    this.getSize = this.getSize.bind(this);
    this.getRowType = this.getRowType.bind(this);
    this.addNewRow = this.addNewRow.bind(this);
    this.getRowKey = this.getRowKey.bind(this);
    this.getRowHeight = this.getRowHeight.bind(this);
    this.getRowMap = this.getRowMap.bind(this);
    this.getSubRowHeight = this.getSubRowHeight.bind(this);
    this.removeRow = this.removeRow.bind(this);
    this.removeRows = this.removeRows.bind(this);
    this.reorderRow = this.reorderRow.bind(this);
    this.setObjectAt = this.setObjectAt.bind(this);
    this.getObjectAt = this.getObjectAt.bind(this);
    this.getGroups = this.getGroups.bind(this);
    this.moveRow = this.moveRow.bind(this);
    this.getGroupByRowIndex = this.getGroupByRowIndex.bind(this);
    this.setGroupData = this.setGroupData.bind(this);
    this.addNewGroup = this.addNewGroup.bind(this);
    this.getColumn = this.getColumn.bind(this);
    this.changeGroupCollapseState = this.changeGroupCollapseState.bind(this);
    this.getCellValue = this.getCellValue.bind(this);
    this.undoRemoveGroup = this.undoRemoveGroup.bind(this);
    this.setColumnData = this.setColumnData.bind(this);
    this.toggleSubRows = this.toggleSubRows.bind(this);
    this.getSubRowTotalHeight = this.getSubRowTotalHeight.bind(this);
    this.getSubRows = this.getSubRows.bind(this);
    this.getSubRowCount = this.getSubRowCount.bind(this);
    this.getGroupTableRowIndexAt = this.getGroupTableRowIndexAt.bind(this);
    this.addNewSubSection = this.addNewSubSection.bind(this);
    this.getCurrentUser = this.getCurrentUser.bind(this);
    this.getStatusSummary = this.getStatusSummary.bind(this);
    this.getDateSummary = this.getDateSummary.bind(this);
    this.getRowNameColumn = this.getRowNameColumn.bind(this);
    this.getTeamUsers = this.getTeamUsers.bind(this);
    this.filterTeamUsers = this.filterTeamUsers.bind(this);
    this.getRowThreadData = this.getRowThreadData.bind(this);
    this.createThreadData = this.createThreadData.bind(this);
    this.updateThreadData = this.updateThreadData.bind(this);
    this.createReplyData = this.createReplyData.bind(this);
    this.updateReplyData = this.updateReplyData.bind(this);
    this.getRowThreadCount = this.getRowThreadCount.bind(this);
    this.updateThreadOrReplySeen = this.updateThreadOrReplySeen.bind(this);
    this.createNotification = this.createNotification.bind(this);
    this.updateRowReadMessageStatus = this.updateRowReadMessageStatus.bind(this);
    this.getNotificationsByRowId = this.getNotificationsByRowId.bind(this);
    this.getCurrentBoardId = this.getCurrentBoardId.bind(this);
    this.updateColumnBoardData = this.updateColumnBoardData.bind(this);
    this.undoRemoveRow = this.undoRemoveRow.bind(this);
    this.updateColumnEditing = this.updateColumnEditing.bind(this);
    this.updateRowEditing = this.updateRowEditing.bind(this);
  }

  /**
   * 根据是否折叠初始化indeMap
   */
  getIndexMap = (dataset, indexMap) => {
    let isFristRow = false;
    indexMap.forEach((row, i) => {
      if (row.rowType === RowType.HEADER) {
        if (!isFristRow) {
          isFristRow = true;
        } else {
          row.rowType = RowType.SECTIONGROUP;
        }
      }
    });
    indexMap.splice(2, 0, {
      rowType: RowType.SECTIONGROUP,
      groupKey: indexMap[1] ? indexMap[1].groupKey : '',
    });
    // 先过滤折叠的分区
    let groups = dataset.getGroups().filter((group) => group.isCollapsed);
    let indexMapData = [];
    if (groups.length > 0 && indexMap) {
      for (let j = 0; j < indexMap.length; j++) {
        let row = indexMap[j];
        // 查询是否为折叠分区
        let group = groups.find((group) => group.groupKey === row.groupKey);
        if (group && row.rowType != RowType.FOOTER && row.rowType != RowType.HEADER) {
          continue;
        } else if (!group) {
          row.isCollapsed = false;
          indexMapData.push(row);
        } else {
          indexMapData.push(row);
        }
      }
    } else if (groups.length === 0) {
      indexMapData.push(...indexMap);
    }

    return indexMapData;
  };

  // /**
  //  * Runs callbacks in the order that they've been added.
  //  *
  //  * The function is triggered when the fetchRange() Promise resolves.
  //  *
  //  * @return {void}
  //  */
  // runCallbacks() {
  //     for (const cb of this._callbacks) {
  //         cb.fun();
  //     }
  // }

  // The callback is used for triggering re-rendering
  setCallback(cb, id = 'wrapper') {
    if (this._dataset.setCallback) {
      this._dataset.setCallback(cb, id);
    }
  }

  getSize() {
    if (this._indexMap === null) {
      return this._dataset.getSize();
    }
    return this._indexMap.length;
  }

  //根据groupKey和rowIndex获得索引
  getGroupTableRowIndexAt(groupKey, rowIndex) {
    let number = 0;
    for (var i = 0; i < this._indexMap.length; i++) {
      const row = this._indexMap[i];
      if (groupKey === row.groupKey && row.rowType === 'ROW') {
        number++;
        if (rowIndex === i) {
          return number;
        }
      }
    }
  }

  getObjectAt(index) {
    if (getSubLevel(index) === 0) {
      if (this._indexMap === null) {
        return this._data.getObjectAt(index);
      }

      if (index > this._indexMap.length - 1 && index < 0) {
        return null;
      }
      let rowkey = this._indexMap[index].rowKey;
      return rowkey ? this._dataset.getObjectAt(rowkey) : null;
    }
    let rowKey = this._subRowMap[index];
    return rowKey ? this._dataset.getObjectAt(rowKey) : null;
  }

  toggleSubRows(rowIndex) {
    let rowKey = this._indexMap[rowIndex].rowKey;
    this._dataset.toggleExpandSubRows(rowKey);
  }

  getSubRowTotalHeight(rowIndex) {
    let rowKey = this._indexMap[rowIndex].rowKey;
    if (!this._dataset.isSubRowExpanded(rowKey)) {
      return 0;
    }
    let rows = this._dataset.getSubRows(rowKey);
    if (rows.length == 0) return 0;
    return (rows.length + 2) * 32 + 40;
  }

  getSubRowCount(rowIndex) {
    if (getSubLevel(rowIndex) === 0) {
      let rowKey = this._indexMap[rowIndex].rowKey;
      let rows = this._dataset.getSubRows(rowKey, this._subRowKeys);
      return rows.length;
    }
    return 0;
  }

  getSubRows(rowIndex) {
    let rowKey = this._indexMap[rowIndex].rowKey;
    if (!this._dataset.isSubRowExpanded(rowKey)) {
      return [];
    }
    let indexes = [];
    let offset = 0;
    let rows = this._dataset.getSubRows(rowKey, this._subRowKeys);
    if (rows.length > 0) {
      indexes.push({rowType: RowType.SUBHEADER, rowKey: '', parentRowKey: rowKey});
      offset++;
      for (let k = 0; k < rows.length; k++) {
        const indexString = `${rowIndex}.${offset}`;
        this._subRowMap[indexString] = rows[k].id;
        indexes.push({rowType: RowType.SUBROW, rowKey: rows[k].id, parentRowKey: rowKey});
        offset++;
      }
      const indexString = `${rowIndex}.${offset}`;
      this._subRowMap[indexString] = rowKey;
      indexes.push({rowType: RowType.SUBADDROW, rowKey: '', parentRowKey: rowKey});
      offset++;
      indexes.push({rowType: RowType.SUBFOOTER, rowKey: '', parentRowKey: rowKey});
    }
    return indexes;
  }

  getRowKey(rowIndex) {
    if (getSubLevel(rowIndex) === 0) {
      if (rowIndex < this._indexMap.length && rowIndex >= 0) {
        return this._indexMap[rowIndex].rowKey;
      }
    } else if (this._subRowMap[rowIndex]) {
      return this._subRowMap[rowIndex];
    }
    return '';
  }

  getColumns() {
    return this._dataset.getColumns();
  }

  getCellValue(rowIndex, columnKey) {
    let row = this.getObjectAt(rowIndex);
    if (row) {
      let value = row[columnKey];
      return value === null ? '' : value;
    }

    return '';
  }

  getRowType(index) {
    if (typeof index === 'string') {
      return RowType.SUBROW;
    }
    if (this._indexMap === null) {
      return null;
    }
    if (index === undefined || index > this._indexMap.length - 1 || index < 0) {
      return null;
    }
    return this._indexMap[index].rowType;
  }

  getRowKey(rowIndex) {
    if (getSubLevel(rowIndex) === 0) {
      if (rowIndex < this._indexMap.length && rowIndex >= 0) {
        return this._indexMap[rowIndex].rowKey;
      }
    } else if (this._subRowMap[rowIndex]) {
      return this._subRowMap[rowIndex];
    }
    return '';
  }

  addNewRow(rowIndex, newItem) {
    if (newItem !== '') {
      if (getSubLevel(rowIndex) === 0) {
        let newrow = this._indexMap[rowIndex];
        let rowKey = this._dataset.addNewRow(newrow.groupKey, newItem);
        for (let row = this._indexMap.length; row > rowIndex; row--) {
          this._indexMap[row] = this._indexMap[row - 1];
        }
        this._indexMap[rowIndex] = {rowType: RowType.ROW, groupKey: newrow.groupKey, rowKey: rowKey};
      } else {
        let rowKey = this._subRowMap[rowIndex];
        let rowData = this._subRowData[rowIndex];
        this._dataset.addNewSubRow(rowData.groupKey, rowKey, newItem);
      }
    }
  }

  removeRow(index) {
    let removeRow = this._indexMap[index];
    if (!removeRow) return;

    let rows = this._indexMap;
    for (let ridx = 0; ridx < rows.length; ridx++) {
      let row = rows[ridx];
      if (row && row.rowKey === removeRow.rowKey) {
        rows.splice(ridx, 1);
      }
    }

    // 删除行
    return this._dataset.removeRow(removeRow.groupKey, removeRow.rowKey);
  }

  removeRows(indexArray) {
    let rowKeys = [];
    indexArray.array.forEach((index) => {
      if (this._indexMap[index]) rowKeys.push(this._indexMap[index]);
    });
    this._dataset.rowRows(rowKeys);
  }

  reorderRow(oldRowIndex, newRowIndex) {
    if (oldRowIndex !== newRowIndex && getSubLevel(oldRowIndex) === 0 && getSubLevel(newRowIndex) === 0) {
      let rows = this.getRowMap();
      let oldrow = rows[oldRowIndex];
      let oldGroupKey = oldrow.groupKey;
      let rowKey = oldrow.rowKey;
      let newrow = rows[oldRowIndex < newRowIndex ? newRowIndex : newRowIndex - 1];
      let newGroupKey = newrow.groupKey;
      let rowAfter = newrow.rowKey;
      this._dataset.reorderRow(oldGroupKey, rowKey, newGroupKey, rowAfter);
    }
  }

  // add subrow to subtable
  addSubRow(rowIndex, parentRowIndex) {
    let rows = this.getRowMap();
    let row = rows[parentRowIndex];
    this._dataset.addSubrow(rowIndex, row.groupKey);
  }

  getRowHeight(index) {
    let rowtype = this.getRowType(index);
    if (rowtype) {
      switch (rowtype) {
        case RowType.TITLE:
          return 115;
        case RowType.ADDROW:
          return 32;
        case RowType.HEADER:
          return 32;
        case RowType.FOOTER:
          return 60;
        case RowType.ROW:
          return 32;
        case RowType.SECTIONGROUP:
          return 40;
      }
    }
    return 32;
  }

  getSubRowHeight(rowtype) {
    switch (rowtype) {
      case RowType.SUBHEADER:
        return 32;
      case RowType.SUBROW:
        return 32;
      case RowType.SUBFOOTER:
        return 32;
    }
    return 32;
  }

  getRowMap() {
    return this._indexMap;
  }

  setObjectAt(rowIndex, columnKey, value, type) {
    if (getSubLevel(rowIndex) === 0) {
      if (this._indexMap === null) {
        this._dataset.setObjectAt(rowIndex, columnKey, value, type);
        return;
      }
      if (rowIndex < 0 || rowIndex >= this._indexMap.length) {
        return;
      }
      this._dataset.setObjectAt(this._indexMap[rowIndex].rowKey, columnKey, value, type);
    } else {
      let rowKey = this._subRowMap[rowIndex];
      this._dataset.setObjectAt(rowKey, columnKey, value, type);
    }
  }

  /**
   * add a new group to the backend dataset
   * @param {*} groupName
   */
  addNewGroup(groupName, groupKey) {
    return this._dataset.addNewGroup(groupName, groupKey);
  }

  /**
   * remove a group from the backend dataset by the groupKey
   * @param {*} groupKey
   */
  removeGroup(groupKey) {
    return this._dataset.removeGroup(groupKey);
  }

  undoRemoveGroup(groupIndex, group) {
    this._dataset.undoRemoveGroup(groupIndex, group);
  }

  getGroups() {
    return this._dataset.getGroups();
  }

  moveRow(sourceGroupKey, targetGroupKey, rowKey, oldSourceRow) {
    return this._dataset.moveRow(sourceGroupKey, targetGroupKey, rowKey, oldSourceRow);
  }

  getGroupByRowIndex(rowIndex) {
    let root = getRootRowIndex(rowIndex);
    let row = this._indexMap[root];
    return this._dataset.getGroups().find((group) => group.groupKey === row.groupKey);
  }

  setGroupData(groupData) {
    this._dataset.setGroupData(groupData);
  }

  getColumn(columnKey) {
    let columns = this._dataset.getColumns();
    if (columns) {
      let column = columns.find((column) => column.columnKey === columnKey);
      return column ? column : null;
    }

    return null;
  }

  getRowNameColumn(level) {
    let columns = this._dataset.getColumns();
    let column = columns.find((column) => column.isTitle && column.level === level);
    return column.columnKey;
  }

  changeGroupCollapseState(groupKey, isGroupCollapsed) {
    this._dataset.changeGroupCollapseState(groupKey, isGroupCollapsed);
  }

  /**
   *
   * @param {*} columnKey
   * @param {name, width等} columnData 对象
   */
  setColumnData(columnKey, columnData) {
    this._dataset.setColumnData(columnKey, columnData);
  }

  /**
   * 添加子项(给个空行)
   */
  addNewSubSection(parentRowIndex, newItem) {
    let row = this._indexMap[parentRowIndex];
    if (row) {
      this._dataset.addNewSubSection(row.groupKey, row.rowKey, newItem);
    }
  }

  /**
   * 获取当前用户
   */
  getCurrentUser() {
    return this._dataset._currentUser;
  }

  getTeamUsers() {
    return this._dataset._teamUsers.slice();
  }

  filterTeamUsers(filterValue) {
    return this._dataset.filterTeamUsers(filterValue);
  }

  getColumnRows(rowIndex) {
    let rows = [];
    if (getSubLevel(rowIndex) === 0) {
      let group = this.getGroupByRowIndex(rowIndex);
      if (group) {
        let filterIndexMap = this._indexMap.filter(
          (index) => index.groupKey === group.groupKey && index.rowType === RowType.ROW
        );
        if (filterIndexMap && filterIndexMap.length > 0) {
          rows = [];
          filterIndexMap.map((index) => {
            rows.push(index.rowKey);
          });
          return rows;
        } else {
          group.rows.forEach((row) => {
            rows.push(row.id);
          });
          return rows;
        }
      }
    } else {
      let rootRowIndex = getRootRowIndex(rowIndex);
      rows = this._dataset.getSubRows(this._indexMap[rootRowIndex].rowKey);

      if (this._subRowKeys.length > 0) {
        let filterRows = rows.filter((row) => {
          if (this._subRowKeys.indexOf(row) !== -1) {
            return row;
          }
        });

        return filterRows;
      } else {
        return rows;
      }
    }

    // return null
  }

  /**
   * 获取状态列每个状态占用的比列
   */
  getStatusSummary(rowIndex, columnKey) {
    let statusPercent = [];
    let rows = this.getColumnRows(rowIndex);

    if (rows) {
      let finishedCount = 0;
      let workingCount = 0;
      let blockCount = 0;
      let todoCount = 0;
      let defaultCount = 0;

      rows.map((rowKey) => {
        if (!this._dataset.getObjectAt(rowKey) || !columnKey in this._dataset.getObjectAt(rowKey)) return;
        // let statusValue = this._dataset.getObjectAt(rowKey)[columnKey]
        let statusValue = this._dataset.getObjectAt(rowKey) ? this._dataset.getObjectAt(rowKey)[columnKey] : null;
        switch (statusValue) {
          case StatusCellProperties.FINISHED.desc:
            finishedCount += 1;
            break;

          case StatusCellProperties.WORKING.desc:
            workingCount += 1;
            break;

          case StatusCellProperties.BLOCK.desc:
            blockCount += 1;
            break;

          case StatusCellProperties.TODO.desc:
            todoCount += 1;
            break;

          default:
            defaultCount += 1;
            break;
        }
      });

      let finishedPercent = Number((finishedCount / rows.length).toFixed(2));

      let workingPercent = 0;
      if (workingCount > 0) {
        if (blockCount !== 0 || todoCount !== 0 || defaultCount !== 0) {
          workingPercent = Number((workingCount / rows.length).toFixed(2));
        } else {
          workingPercent = Number((1 - finishedPercent).toFixed(10));
        }
      }

      let blockPercent = 0;
      if (blockCount > 0) {
        if (todoCount !== 0 || defaultCount !== 0) {
          blockPercent = Number((blockCount / rows.length).toFixed(2));
        } else {
          blockPercent = Number((1 - finishedPercent - workingPercent).toFixed(10));
        }
      }

      let todoPercent = 0;
      if (todoCount > 0) {
        if (defaultCount !== 0) {
          todoPercent = Number((todoCount / rows.length).toFixed(2));
        } else {
          todoPercent = Number((1 - finishedPercent - workingPercent - blockPercent).toFixed(10));
        }
      }

      let defaultPercent =
        defaultCount === 0
          ? 0
          : Number((1 - finishedPercent - workingPercent - blockPercent - todoPercent).toFixed(10));

      if (finishedPercent !== 0) {
        statusPercent.push({
          style: {
            width: String(finishedPercent * 100) + '%',
            background: StatusCellProperties.FINISHED.color,
          },
        });
      }

      if (workingPercent !== 0) {
        statusPercent.push({
          style: {
            width: String(workingPercent * 100) + '%',
            background: StatusCellProperties.WORKING.color,
          },
        });
      }

      if (blockPercent !== 0) {
        statusPercent.push({
          style: {
            width: String(blockPercent * 100) + '%',
            background: StatusCellProperties.BLOCK.color,
          },
        });
      }

      if (todoPercent != 0) {
        statusPercent.push({
          style: {
            width: String(todoPercent * 100) + '%',
            background: StatusCellProperties.TODO.color,
          },
        });
      }

      if (defaultPercent != 0) {
        statusPercent.push({
          style: {
            width: String(defaultPercent * 100) + '%',
            background: StatusCellProperties.DEFAULT.color,
          },
        });
      }

      return statusPercent;
    }

    statusPercent.push({
      style: {
        width: '100%',
        background: '#c4c4c4',
      },
    });
    return statusPercent;
  }

  /**
   * 获取日期列的统计
   * @param {*} rowIndex
   * @param {*} columnKey
   */
  getDateSummary(rowIndex, columnKey) {
    let rows = this.getColumnRows(rowIndex);

    let dateText1 = '';
    let dateText2 = '';
    let minDate;
    let maxDate;
    if (rows && Object.keys(this._dataset._rowData).length > 0) {
      rows.map((rowKey) => {
        let dateValue = this._dataset.getObjectAt(rowKey) ? this._dataset.getObjectAt(rowKey)[columnKey] : null;
        // let dateValue = this._dataset._rowData[rowKey] ? this._dataset._rowData[rowKey][columnKey] : null
        if (dateValue) {
          // 只要日期不要时间
          dateValue = dateValue.substring(0, 11);

          minDate = minDate ? (minDate > dateValue ? dateValue : minDate) : dateValue;
          maxDate = maxDate ? (maxDate > dateValue ? maxDate : dateValue) : dateValue;
        }
      });
    }

    let summaryRule = this._dataset.getColumn(columnKey)['summaryRule'];
    if (summaryRule && summaryRule === DateCellSummaryRule.EARLIEST.key) {
      // 显示最早时间
      dateText1 = DateCellSummaryRule.EARLIEST.desc;
      dateText2 = minDate;
    } else {
      // 显示最晚时间
      summaryRule = DateCellSummaryRule.LATEST.key
      dateText1 = DateCellSummaryRule.LATEST.desc;
      dateText2 = maxDate;
    }

    let dateSummary = {
      dateText1,
      dateText2,
      summaryRule
    };

    return dateSummary;
  }

  getRowThreadCount(rowIndex) {
    let rowId = this.getRowKey(rowIndex);
    return this._dataset.getRowThreadSize(rowId) ? this._dataset.getRowThreadSize(rowId) : 0;
  }

  getRowThreadData(rowId, setUpdateInfo) {
    return this._dataset.getRowThreadData(rowId, setUpdateInfo);
  }

  createThreadData(createData, setUpdateInfo, notifications) {
    this._dataset.createThreadData(createData, setUpdateInfo, notifications);
  }

  updateThreadData(updateData, setUpdateInfo) {
    this._dataset.updateThreadData(updateData, setUpdateInfo);
  }

  createReplyData(createData, rowId, setUpdateInfo) {
    this._dataset.createReplyData(createData, rowId, setUpdateInfo);
  }

  updateReplyData(updateData, rowId, setUpdateInfo) {
    this._dataset.updateReplyData(updateData, rowId, setUpdateInfo);
  }

  updateThreadOrReplySeen(threadId, replyId, seenUserIds, rowId) {
    this._dataset.updateThreadOrReplySeen(threadId, replyId, seenUserIds, rowId);
  }

  createNotification(notificationData) {
    this._dataset.createNotification(notificationData);
  }

  getCurrentBoardId() {
    return this._dataset._currentBoardId;
  }

  updateRowReadMessageStatus(row) {
    this._dataset.updateRowReadMessageStatus(row);
  }

  getNotificationsByRowId(rowIndex) {
    let rowId = this.getRowKey(rowIndex);
    return this._dataset.getNotificationsByRowId(rowId);
  }

  updateColumnBoardData(columnKey, updateData) {
    this._dataset.updateColumnBoardData(columnKey, updateData);
  }

  undoRemoveRow(groupKey, rowKey, groupRowIndex, rowData) {
    this._dataset.undoRemoveRow(groupKey, rowKey, groupRowIndex, rowData);
  }

  updateColumnEditing(columnKey, isEditing) {
    this._dataset.updateColumnEditing(columnKey, isEditing);
  }

  updateRowEditing(rowIndex, isEditing) {
    let rowId = this.getRowKey(rowIndex);
    this._dataset.updateRowEditing(rowId, isEditing);
  }
}

export {DataViewWrapper};
