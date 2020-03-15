"use strict";

import { RowType } from './MainTableType';

class DataViewWrapper {
    constructor(dataset, indexMap = null) {
        this._indexMap = indexMap;
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
        this._dataset.removeRow(rowKey);
    }

    removeRows(indexArray) {
        let rowKeys = [];
        indexArray.array.forEach(index => {
            if (this._indexMap[index])
                rowKeys.push(this._indexMap[index]);
        });
        this._dataset.rowRows(rowKeys);
    }

    reorderRow(rowKey, oldRowIndex, newRowIndex) {
        if (oldRowIndex !== newRowIndex) {    
            let rows = this.getRowMap();
            let oldrow = rows[oldRowIndex];
            let oldGroupKey = oldrow.groupKey; 
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
       
}

export {
    DataViewWrapper
};