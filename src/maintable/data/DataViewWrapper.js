"use strict";

import { RowType } from './MainTableType';

class DataViewWrapper {
    constructor(dataset, indexMap = null) {

        let indexMapData = [] 
        if (indexMap) {
          for (let i = 0; i < indexMap.length; i++) {
            let row = indexMap[i]
            let group = dataset._groups.filter(group => group.groupKey === row.groupKey)[0]
            if (!group.isCollapsed || row.rowType === RowType.HEADER) {
              row.isCollapsed = group.isCollapsed
              indexMapData.push(row)
            }
          }
        }

        this._indexMap = indexMapData;
        this._dataset = dataset;
        this.getSize = this.getSize.bind(this);
        this.getRowType = this.getRowType.bind(this);
        this.addNewRow = this.addNewRow.bind(this);
        this.getRowKey = this.getRowKey.bind(this);
        this.getRowHeight = this.getRowHeight.bind(this);
        this.getRowMap = this.getRowMap.bind(this);
        this.removeRow = this.removeRow.bind(this);
        this.removeRows = this.removeRows.bind(this);
        this.reorderRow = this.reorderRow.bind(this);
        this.setObjectAt = this.setObjectAt.bind(this);
        this.getObjectAt = this.getObjectAt.bind(this);
        this.getGroups = this.getGroups.bind(this)
        this.moveRow = this.moveRow.bind(this)
        this.getGroupByRowIndex = this.getGroupByRowIndex.bind(this)
        this.setGroupData = this.setGroupData.bind(this)
        this.addNewGroup = this.addNewGroup.bind(this)
        this.getColumn = this.getColumn.bind(this)
        this.changeGroupCollapseState = this.changeGroupCollapseState.bind(this)
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
        if (this._indexMap === null) {
            return this._data.getObjectAt(index);
        }
        
        if (index > this._indexMap.length - 1 && index < 0 ) {
            return null;
        }
        let rowkey = this._indexMap[index].rowKey;
        return rowkey ? this._dataset.getObjectAt(rowkey) : null;
    }

    getRowType(index) {
        if (this._indexMap === null) {
            return RowType.ROW;
        }
        if (index === undefined || index > this._indexMap.length - 1 || index < 0 ) {
            return null;
        }
        return this._indexMap[index].rowType;
    }

    getRowKey(index) {
        if (index > this._indexMap.length - 1 && index < 0 ) {
            return null;
        }
        return this._indexMap[index].rowKey;
    }

    addNewRow(rowIndex, newItem) {
        if (newItem !== '') {
            let row = this._indexMap[rowIndex];
            let rowKey = this._dataset.addNewRow(row.groupKey, newItem);
            for (let row = this._indexMap.length; row > rowIndex; row--) {
                this._indexMap[row] = this._indexMap[row-1]; 
            }
            this._indexMap[rowIndex] = {rowType:RowType.ROW, groupKey:row.groupKey, rowKey:rowKey};
        }
    }
    
    removeRow(index) {
      let rowKey = this._indexMap[index];
      
      let rows = this._indexMap;
      let groupKey
      for  (let ridx = 0; ridx < rows.length; ridx ++) {
          let row = rows[ridx];
          if (row && row.rowKey === rowKey) {
              groupKey = row.groupKey
              rows.splice(ridx, 1);
          }
      }

      // 删除行
      this._dataset.removeRow(groupKey, rowKey)
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
        if (oldRowIndex !== newRowIndex) {    
            let rows = this.getRowMap();
            let oldrow = rows[oldRowIndex];
            let oldGroupKey = oldrow.groupKey;
            let rowKey = oldrow.rowKey;
            let newrow = rows[oldRowIndex < newRowIndex ? newRowIndex : newRowIndex - 1];
            let newGroupKey = newrow.groupKey; 
            let rowAfter = newrow.rowKey;
            
            this._dataset.reorderRow(oldGroupKey, rowKey, newGroupKey, rowAfter, oldRowIndex < newRowIndex);
        }
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

    getRowMap() {
        return this._indexMap;
    }

    setObjectAt(rowIndex, columnKey, value) {
        if (this._indexMap === null) {
            this._dataset.setObjectAt(rowIndex, columnKey, value);
            return;
        } 
        if (rowIndex < 0 || rowIndex >= this._indexMap.length) {
            return;
        }
        this._dataset.setObjectAt(this._indexMap[rowIndex].rowKey, columnKey, value);
    }

    /**
     * add a new group to the backend dataset 
     * @param {*} groupName 
     */
    addNewGroup(groupName) {
        return this._dataset.addNewGroup(groupName);
    }

    /**
     * remove a group from the backend dataset by the groupKey
     * @param {*} groupKey 
     */
    removeGroup(groupKey) {
        return this._dataset.removeGroup(groupKey);
    }

    getGroups() {
      return this._dataset.getGroups()
    }
    
    moveRow(sourceGroupKey, targetGroupKey, rowKey, rowIndex) {

      let moveRow
      for  (let ridx = 0; ridx < this._indexMap.length; ridx ++) {
        let row = this._indexMap[ridx];
        if (row && row.rowKey === rowKey) {
          moveRow = row
          this._indexMap.splice(ridx, 1)
          break;
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
      if (rowIndex === undefined || null === rowIndex) return null
      let row = this._indexMap[rowIndex]
      let groups = this._dataset.getGroups().filter(group => group.groupKey === row.groupKey)

      if (groups && groups.length > 0) {
        return groups[0]
      }
      else {
        return null
      }
    }

    setGroupData(groupData) {
      this._dataset.setGroupData(groupData)
    }

    addNewGroup(groupKey) {
      this._dataset.addNewGroup("新分区", groupKey)
    }

    getColumn(columnKey) {
      let columns = this._dataset.getColumns()
      if (columns) {
        let filterColumns = columns.filter(column => column.columnKey === columnKey)
          return filterColumns.length > 0 ? filterColumns[0] : null
      }

      return null
    }

    changeGroupCollapseState(groupKey) {
      this._dataset.changeGroupCollapseState(groupKey)
    }
}

export {
    DataViewWrapper
};