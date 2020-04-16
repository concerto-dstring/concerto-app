"use strict";

import { RowType, getSubLevel, getRootRowIndex } from './MainTableType';

class DataViewWrapper {
    constructor(dataset, indexMap = null, subRowKeys) {
        this._indexMap = this.getIndexMap(dataset, indexMap);
        this._subRowMap = {};
        this._dataset = dataset;
        this._subRowKeys = subRowKeys
        this._indexMap.forEach((r, i) => {
          if (this._dataset.isSubRowExpanded(r.rowKey)) {
              let rows = this._dataset.getSubRows(r.rowKey);
              if (rows.length > 0) {      
                  let j = 0;      
                  for (let k = 0; k < rows.length; k ++) {
                    if (this._subRowKeys && this._subRowKeys.length > 0) {
                      if (this._subRowKeys.indexOf(rows[k]) !== -1) {
                        j += 1 
                        const indexString = `${i}.${j}`;
                        this._subRowMap[indexString] = rows[k];
                      }
                    }
                    else {
                      j += 1
                      const indexString = `${i}.${j}`;
                      this._subRowMap[indexString] = rows[k];
                    }  
                  }
                  const indexString = `${i}.${j + 1}`;
                  this._subRowMap[indexString] = r.rowKey;
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
        this.addNewSubSection = this.addNewSubSection.bind(this)
        this.getCurrentUser = this.getCurrentUser.bind(this)
        this.getStatusSummary = this.getStatusSummary.bind(this)
        this.getDateSummary = this.getDateSummary.bind(this)
    }

    /**
     * 根据是否折叠初始化indeMap
     */
    getIndexMap = (dataset, indexMap) => {
      // 先过滤折叠的分区
      let groups = dataset._groups.filter(group => group.isCollapsed)

      let indexMapData = [] 
      if (groups.length > 0 && indexMap) {
        for (let j = 0; j < indexMap.length; j++) {
          let row = indexMap[j]

          // 查询是否为折叠分区
          let group = groups.find(group => group.groupKey === row.groupKey)

          if (group && row.rowType === RowType.HEADER) {
            row.isCollapsed = true
            indexMapData.push(row)
          }
          else if (!group) {
            row.isCollapsed = false
            indexMapData.push(row)
          }
        }
      }
      else if (groups.length === 0) {
        indexMapData.push(...indexMap)
      }

      return indexMapData
    }

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

    getObjectAt(index) {
      if (getSubLevel(index) === 0) {
        if (this._indexMap === null) {
            return this._data.getObjectAt(index);
        }
        
        if (index > this._indexMap.length - 1 && index < 0 ) {
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
      if (rows.length == 0)
          return 0;
      return (rows.length + 3) * 40;
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
          indexes.push({rowType:RowType.SUBHEADER, rowKey:'', parentRowKey: rowKey});
          offset ++;
          for (let k = 0; k < rows.length; k ++) {
              const indexString = `${rowIndex}.${offset}`;
              this._subRowMap[indexString] = rows[k];
              indexes.push({ rowType:RowType.SUBROW, rowKey:rows[k], parentRowKey: rowKey});
              offset ++;
          }
          const indexString = `${rowIndex}.${offset}`;
          this._subRowMap[indexString] = rowKey;
          indexes.push({rowType:RowType.SUBADDROW, rowKey:'', parentRowKey: rowKey});
          offset ++;
          indexes.push({rowType:RowType.SUBFOOTER, rowKey:'', parentRowKey: rowKey});
      }
      return indexes;
    }

    getRowKey(rowIndex) {
      if (getSubLevel(rowIndex) === 0) {
          if (rowIndex < this._indexMap.length && rowIndex >= 0 ) {
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
      let row = this.getObjectAt(rowIndex)
      if (row) {
        return row[columnKey]
      }

      return ''
    }

    getRowType(index) {
      if (typeof index === 'string') {
        return RowType.SUBROW;
      }
      if (this._indexMap === null) {
          return null;
      }
      if (index === undefined || index > this._indexMap.length - 1 || index < 0 ) {
          return null;
      }
      return this._indexMap[index].rowType;
    }

    getRowKey(rowIndex) {
      if (getSubLevel(rowIndex) === 0) {
          if (rowIndex < this._indexMap.length && rowIndex >= 0 ) {
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
            let row = this._indexMap[rowIndex];
            let rowKey = this._dataset.addNewRow(row.groupKey, newItem);
            for (let row = this._indexMap.length; row > rowIndex; row--) {
                this._indexMap[row] = this._indexMap[row-1]; 
            }
            this._indexMap[rowIndex] = {rowType:RowType.ROW, groupKey:row.groupKey, rowKey:rowKey};
          } else {
            let row = this._subRowMap[rowIndex];
            this._dataset.addNewSubRow(row, newItem);
          } 
        }
    }
    
    removeRow(index) {
      let removeRow = this._indexMap[index];
      if (!removeRow) return 

      let rows = this._indexMap;
      for  (let ridx = 0; ridx < rows.length; ridx ++) {
          let row = rows[ridx];
          if (row && row.rowKey === removeRow.rowKey) {
              rows.splice(ridx, 1);
          }
      }

      // 删除行
      this._dataset.removeRow(removeRow.groupKey, removeRow.rowKey)
    }

    removeRows(indexArray) {
        let rowKeys = [];
        indexArray.array.forEach(index => {
            if (this._indexMap[index])
                rowKeys.push(this._indexMap[index]);
        });
        this._dataset.rowRows(rowKeys);
    }

    reorderRow(oldRowIndex, newRowIndex) {
        if (oldRowIndex !== newRowIndex 
          && getSubLevel(oldRowIndex) === 0 
          && getSubLevel(newRowIndex) === 0 ) {    
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
                case RowType.ADDROW: 
                    return 35;
                case RowType.HEADER:
                    return 40;
                case RowType.FOOTER:
                    return 140;
                case RowType.ROW:
                    return 40;
            }
        }
        return 40;
    }

    getSubRowHeight(rowtype) {
      switch (rowtype) {
          case RowType.SUBHEADER:
              return 35;
          case RowType.SUBROW:
              return 40;
          case RowType.SUBFOOTER:
              return 40;
      }
      return 40;
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
      this._dataset.undoRemoveGroup(groupIndex, group)
    }

    getGroups() {
      return this._dataset.getGroups()
    }
    
    moveRow(sourceGroupKey, targetGroupKey, rowKey, rowIndex) {

      let moveRow;
      for  (let ridx = 0; ridx < this._indexMap.length; ridx ++) {
        let row = this._indexMap[ridx];
        if (row && row.rowKey === rowKey) {
          moveRow = row
          this._indexMap.splice(ridx, 1)
        }
      }

      if (rowIndex < 0) {
        for (let ridx = 0; ridx < this._indexMap.length; ridx ++) {
          let row = this._indexMap[ridx];
          if (row && row.groupKey === targetGroupKey && row.rowType === RowType.ADDROW) {
            rowIndex = ridx
            break
          }
        }
      }

      this._indexMap.splice(rowIndex, 0, moveRow)

      return this._dataset.moveRow(sourceGroupKey, targetGroupKey, rowKey, rowIndex)
    }

    getGroupByRowIndex(rowIndex) {
      let root = getRootRowIndex(rowIndex);
      let row = this._indexMap[root];
      return this._dataset.getGroups().find(group => group.groupKey === row.groupKey)
    }

    setGroupData(groupData) {
      this._dataset.setGroupData(groupData)
    }

    getColumn(columnKey) {
      let columns = this._dataset.getColumns()
      if (columns) {
        let column = columns.find(column => column.columnKey === columnKey)
          return column ? column : null
      }

      return null
    }

    changeGroupCollapseState(groupKey, isGroupCollapsed) {
      this._dataset.changeGroupCollapseState(groupKey, isGroupCollapsed)
    }

    /**
     * 
     * @param {*} columnKey 
     * @param {name, width等} columnData 对象
     */
    setColumnData(columnKey, columnData) {
      this._dataset.setColumnData(columnKey, columnData)
    }

    /**
     * 添加子项(给个空行)
     */
    addNewSubSection(parentRowIndex, newItem) {
      let row = this._indexMap[parentRowIndex]
      if (row) {
        this._dataset.addNewSubSection(row.rowKey, newItem)
      }
    }

    /**
     * 获取当前用户
     */
    getCurrentUser() {
      return this._dataset.getCurrentUser()
    }

    getColumnRows(rowIndex) {
      let rows
      if (getSubLevel(rowIndex) === 0) {

        let group = this.getGroupByRowIndex(rowIndex)
        if (group) {
          rows = group.rows
          return rows
        }
      }
      else {
        let rootRowIndex = getRootRowIndex(rowIndex)
        rows = this._dataset.getSubRows(this._indexMap[rootRowIndex].rowKey)
        return rows
      }

      return null
    }

    /**
     * 获取状态列每个状态占用的比列
     */
    getStatusSummary(rowIndex, columnKey) {
      const status = {
        block:'阻塞',
        working:'进行中',
        finished:'已完成',
        todo:'To Do',
        default:''
      }

      let statusPercent = []
      let rows = this.getColumnRows(rowIndex)

      if (rows) {

        let finishedCount = 0
        let workingCount = 0
        let blockCount = 0
        let todoCount = 0
        let defaultCount = 0

        rows.map(rowKey => {
          let statusValue = this._dataset.getObjectAt(rowKey)[columnKey]
          switch (statusValue) {
            case status.finished:
              finishedCount += 1
              break;
            
            case status.working:
              workingCount += 1
              break;

            case status.block:
              blockCount += 1
              break;

            case status.todo:
              todoCount += 1
              break;

            default:
              defaultCount += 1
              break;
          }
        })

        let finishedPercent = Number((finishedCount / rows.length).toFixed(2))
        let workingPercent = Number((workingCount / rows.length).toFixed(2))
        let blockPercent = Number((blockCount / rows.length).toFixed(2))
        let todoPercent = Number((todoCount / rows.length).toFixed(2))
        let defaultPercent = defaultCount === 0 ? 0 : ( 1 - finishedPercent - workingPercent - blockPercent - todoPercent )

        if (finishedPercent !== 0) {
          statusPercent.push({
            style: {
              width: String(finishedPercent * 100) + '%',
              background: '#5ac47d'
            }
          })
        }

        if (workingPercent !== 0) {
          statusPercent.push({
            style: {
              width: String(workingPercent * 100) + '%',
              background: '#fec06e'}
          })
        }

        if (blockPercent !== 0) {
          statusPercent.push({
            style: {
              width: String(blockPercent * 100) + '%',
              background: '#d2515e'
            }
          })
        }

        if (todoPercent != 0) {
          statusPercent.push({
            style: {
              width: String(todoPercent * 100) + '%',
              background: '#808080'
            }
          })
        }

        if (defaultPercent != 0) {
          statusPercent.push({
            style: {
              width: String(defaultPercent * 100) + '%',
              background: '#c4c4c4'
            }
          })
        }

        return statusPercent
      }

      statusPercent.push({
        style: {
          width: '100%',
          background: '#c4c4c4'
        }
      })
      return statusPercent
    }

    /**
     * 获取日期列的统计
     * @param {*} rowIndex 
     * @param {*} columnKey 
     */
    getDateSummary(rowIndex, columnKey) {
      let rows = this.getColumnRows(rowIndex)

      if (rows) {
        rows.map(rowKey => {
          let dateValue = this._dataset.getObjectAt(rowKey)[columnKey]
        })
      }
    }
}

export {
    DataViewWrapper
};