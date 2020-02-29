/**
 * Data store the close to persistent data layer
 * Column array [{ColumnKey, Name, Width, Type}]
 * Rows Data {(RowKey, ColumnKey) -> Data }]
 * Group array [GroupKey, Group Name, [Rows]]
 * all data will go to api
 */

'use strict';

import { ColumnType } from './MainTableType';

class MainTableDataStore {

    // rows is array, rowkey -> {key value hashmap}
    // columnkey

    constructor() {
        this._sizeRows = 0;
        this._columns= [];
        this._sizeColumns = 0;
        this._rowData = {};
        this._groups = [];
        this._sizeGroups = 0;
        this.addNewRow = this.addNewRow.bind(this);
        this.addNewColumn = this.addNewColumn.bind(this);
        this.setObjectAt = this.setObjectAt.bind(this);
        this.removeRow = this.removeRow.bind(this);
        this.removeRows = this.removeRows.bind(this);
        this.reorderColumn = this.reorderColumn.bind(this);
        this.addGroup = this.addGroup.bind(this);
        this.removeGroup = this.removeGroup.bind(this);
    }
    
    createFakeObjectData() {
        // create columns
        this._columns.push({columnKey: '1', name:'Column 1', width: 100, type: ColumnType.EDITBOX});
        this._columns.push({columnKey: '2', name:'Column 2', width: 200, type: ColumnType.EDITBOX});
        this._columns.push({columnKey: '3', name:'Column 3', width: 200, type: ColumnType.EDITBOX});
        this._columns.push({columnKey: '4', name:'Column 4', width: 200, type: ColumnType.LABEL});
        this._columns.push({columnKey: '5', name:'Column 5', width: 200, type: ColumnType.EDITBOX});
        this._columns.push({columnKey: '6', name:'Column 6', width: 200, type: ColumnType.EDITBOX});
        this._sizeColumns = 6;

        // create groups 
        this._groups.push({groupKey: '1', name: 'group 1', rows:['1', '2', '3', '4']});
        this._groups.push({groupKey: '2', name: 'group 2', rows:['5', '6', '7', '8']});
        this._groups.push({groupKey: '3', name: 'group 3', rows:['9', '10']});
        this._sizeGroups = 3;
        
        // create row data
        this._rowData['1'] = {'1': 'row 1, column 1','2': 'row 1, column 2', '3': 'row 1, column 3', '4': 'row 1, column 4',
        '5': 'row 1, column 5', '6': 'row 1, column 6'};

        this._rowData['2'] = {'1': 'row 2, column 1','2': 'row 2, column 2', '3': 'row 2, column 3', '4': 'row 2, column 4',
        '5': 'row 2, column 5', '6': 'row 2, column 6'};
        
        this._rowData['3'] = {'1': 'row 3, column 1','2': 'row 3, column 2', '3': 'row 3, column 3', '4': 'row 3, column 4',
        '5': 'row 3, column 5', '6': 'row 3, column 6'};  

        this._rowData['4'] = {'1': 'row 4, column 1','2': 'row 4, column 2', '3': 'row 4, column 3', '4': 'row 4, column 4',
        '5': 'row 4, column 5', '6': 'row 4, column 6'}; 

        this._rowData['5'] = {'1': 'row 5, column 1','2': 'row 5, column 2', '3': 'row 5, column 3', '4': 'row 5, column 4',
        '5': 'row 5, column 5', '6': 'row 5, column 6'}; 

        this._rowData['6'] = {'1': 'row 6, column 1','2': 'row 6, column 2', '3': 'row 6, column 3', '4': 'row 6, column 4',
        '5': 'row 6, column 5', '6': 'row 6, column 6'}; 

        this._rowData['7'] = {'1': 'row 7, column 1','2': 'row 7, column 2', '3': 'row 7, column 3', '4': 'row 7, column 4',
        '5': 'row 7, column 5', '6': 'row 7, column 6'};

        this._rowData['8'] = {'1': 'row 8, column 1','2': 'row 8, column 2', '3': 'row 8, column 3', '4': 'row 8, column 4',
        '5': 'row 8, column 5', '6': 'row 8, column 6'};

        this._rowData['9'] = {'1': 'row 9, column 1','2': 'row 9, column 2', '3': 'row 9, column 3', '4': 'row 9, column 4',
        '5': 'row 9, column 5', '6': 'row 9, column 6'};

        this._rowData['10'] = {'1': 'row 10, column 1','2': 'row 10, column 2', '3': 'row 10, column 3', '4': 'row 10, column 4',
        '5': 'row 10, column 5', '6': 'row 10, column 6'};

        this._sizeRows = 10;
    }

    getObjectAt(rowKey) {
        return this._rowData[rowKey];
    }

    setObjectAt(rowKey, columnKey, value) {
        // skip the group row 
        if (!rowKey || !columnKey) 
            return;
        this._rowData[rowKey][columnKey] = value;
    }

    getGroups() {
        return this._groups;
    }

    addGroup(groupName) {
        this._sizeGroups ++;
        let id = this._sizeGroups.toString();
        this._groups.push({groupKey: id, name: groupName, rows:[]});
    }

    removeGroup(groupKey) {
        let index = this._groups.findIndex(column => column.groupKey == groupKey);
        if (index < 0) {
            return;
        }
        this._groups.splice(index, 1);
    }

    getColumns() {
        return this._columns;
    }

    addNewRow(newItem, groupKey) {
        let index = this._groups.findIndex(column => column.groupKey == groupKey);
        if (index < 0) {
            return;
        }
        this._sizeRows ++;
        let id = this._sizeRows.toString();
        this._rowData[id] = {'1':newItem};
        let rows = this._groups[index].rows;
        rows.push(id);
        return id;
    }

    addNewColumn(newItem) {
        this._sizeColumns ++; 
        let id = this._sizeColumns.toString();
        this._columns.push({columnKey: id, name:newItem, width: 200, type: ColumnType.EDITBOX});
        return id;
    }

    removeColumn(columnKey) {
        let index = this._columns.findIndex(column => column.columnKey == columnKey);
        if (index < 0) {
            return;
        }
        this._columns.splice(index, 1);
        // push undo stack 
    }

    removeRow(rowKey) {
        delete this._rowData[rowKey];
    }

    removeRows(rowKeys) {
        rowKeys.forEach(rowKey => {
            delete this._rowData[rowKey];
        });
    }

    reorderColumn(columnAfter, columnKey) {
        if (columnAfter === columnKey) {
            return;
        }
        let index = this._columns.findIndex(column => column.columnKey == columnKey);
        if (index < 0) {
            return;
        }
        let columnToReorder = this._columns[index];

        if (columnAfter) {
            var iindex = this._columns.findIndex(column => column.columnKey == columnAfter);
            if (iindex < 0) { 
                return;
            }
            this._columns.splice(index, 1);
            this._columns.splice(iindex, 0, columnToReorder);
        } else if (index !== this._columns.length - 1) {
            this._columns.splice(index, 1);
            this._columns.push(columnToReorder);
        }
    }
}


export default MainTableDataStore;