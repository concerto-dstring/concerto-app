/**
 * Data store the close to persistent data layer
 * Column array [{ColumnKey, Name, Width, Type}]
 * Rows Data {(RowKey, ColumnKey) -> Data }]
 * Group array [GroupKey, Group Name, [Rows]]
 * all data will go to api
 */

'use strict';

import { ColumnType } from './data/MainTableType';
import { COLOR } from '../helpers/section/header/StyleValues'

class MainTableDataStore {

    // rows is array, rowkey -> {key value hashmap}
    // columnkey

    constructor() {
        this._sizeRows = 0;
        this._sizeSubrows = 0;
        this._columns= [];
        this._subColumns = [];
        this._sizeColumns = 0;
        this._rowData = {};
        this._subRowData = {};
        this._groups = [];
        this._sizeGroups = 0;
        this._subRows = {};
        this.getSize = this.getSize.bind(this);
        this.addNewRow = this.addNewRow.bind(this);
        this.addNewColumn = this.addNewColumn.bind(this);
        this.setObjectAt = this.setObjectAt.bind(this);
        this.removeRow = this.removeRow.bind(this);
        this.removeRows = this.removeRows.bind(this);
        this.reorderColumn = this.reorderColumn.bind(this);
        this.addNewGroup = this.addNewGroup.bind(this);
        this.removeGroup = this.removeGroup.bind(this);
        this.isSubRowExpanded = this.isSubRowExpanded.bind(this);
        this.getSubRows = this.getSubRows.bind(this);
        this.toggleExpandSubRows = this.toggleExpandSubRows.bind(this);
        this._callbacks = [];
        this.runCallbacks = this.runCallbacks.bind(this);
    }
    
    createFakeObjectData() {
        // create columns
        // 增加行操作列和行复选框列
        this._columns.push({columnKey: '1000', name:'', width: 36, type: ColumnType.ROWACTION, columnComponentType:'', fixed:true, level: 0});
        this._columns.push({columnKey: '1001', name:'', width: 36, type: ColumnType.ROWSELECT, columnComponentType:'', fixed:true, level: 0}); 

        this._columns.push({columnKey: '1', name:'主题', width: 100, type: ColumnType.EDITBOX, columnComponentType:'TEXT', collpse:false, fixed:true, level: 0});
        this._columns.push({columnKey: '2', name:'备注', width: 200, type: ColumnType.EDITBOX, columnComponentType:'TEXT', collpse:false, level: 0});
        this._columns.push({columnKey: '3', name:'分配', width: 200, type: ColumnType.EDITBOX, columnComponentType:'TEXT', collpse:false, level: 0});
        this._columns.push({columnKey: '4', name:'日志', width: 200, type: ColumnType.LABEL, columnComponentType:'TEXT', collpse:false, level: 0});
        this._columns.push({columnKey: '5', name:'文件', width: 200, type: ColumnType.EDITBOX, columnComponentType:'TEXT', collpse:false, level: 0});
        this._columns.push({columnKey: '6', name:'补充说明', width: 200, type: ColumnType.EDITBOX, columnComponentType:'TEXT', collpse:false, level: 0});

        this._columns.push({columnKey: '1002', name:'', width: 36, type: ColumnType.ROWACTION, columnComponentType:'', fixed:true, level: 1});
        this._columns.push({columnKey: '1003', name:'', width: 36, type: ColumnType.ROWSELECT, columnComponentType:'', fixed:true, level: 1}); 
        this._columns.push({columnKey: '1', name:'子题', width: 100, type: ColumnType.EDITBOX, columnComponentType:'TEXT', collpse:false, fixed:true, level: 1});
        this._columns.push({columnKey: '11', name:'分配', width: 200, type: ColumnType.EDITBOX, columnComponentType:'TEXT', collpse:false, level: 1});
        this._columns.push({columnKey: '12', name:'日志', width: 200, type: ColumnType.EDITBOX, columnComponentType:'TEXT', collpse:false, level: 1});
        this._sizeColumns = 12;

        // create groups 
        this._groups.push({groupKey: '1', name: '分区1', rows:['1', '2', '3', '4'], color:'#4682B4', isCollapsed: false});
        this._groups.push({groupKey: '2', name: '分区2', rows:['5', '6', '7', '8'], color:'#CD5C5C', isCollapsed: false});
        this._groups.push({groupKey: '3', name: '分区3', rows:['9', '10'], color:'#79CDCD', isCollapsed: false});
        this._sizeGroups = 3;
        
        // create row data
        this._rowData['1'] = {'1': '主题 1','2': '备注 1', '3': '分配 1', '4': '日志 1',
        '5': '文件 1', '6': '补充说明 1'};

        this._rowData['2'] = {'1': '主题 2','2': '备注 2', '3': '分配 2', '4': '日志 2',
        '5': '文件 2', '6': '补充说明 2'};
        
        this._rowData['3'] = {'1': '主题 3','2': '备注 3', '3': '分配 3', '4': '日志 3',
        '5': '文件 3', '6': '补充说明 3'};  

        this._rowData['4'] = {'1': '主题 4','2': '备注 4', '3': '分配 4', '4': '日志 4',
        '5': '文件 4', '6': '补充说明 4'}; 

        this._rowData['5'] = {'1': '主题 5','2': '备注 5', '3': '分配 5', '4': '日志 5',
        '5': '文件 5', '6': '补充说明 5'}; 

        this._rowData['6'] = {'1': '主题 6','2': '备注 6', '3': '分配 6', '4': '日志 6',
        '5': '文件 6', '6': '补充说明 6'}; 

        this._rowData['7'] = {'1': '主题 7','2': '备注 7', '3': '分配 7', '4': '日志 7',
        '5': '文件 7', '6': '补充说明 7'};

        this._rowData['8'] = {'1': '主题 8','2': '备注 8', '3': '分配 8', '4': '日志 8',
        '5': '文件 8', '6': '补充说明 8'};

        this._rowData['9'] = {'1': '主题 9','2': '备注 9', '3': '分配 9', '4': '日志 9',
        '5': '文件 9', '6': '补充说明 9'};

        this._rowData['10'] = {'1': '主题 10','2': '备注 10', '3': '分配 10', '4': '日志 10',
        '5': '文件 10', '6': '补充说明 10'};

        this._rowData['11'] = {'1': '子题 1', '11': '分配 6', '12': '日志 1'};
        this._rowData['12'] = {'1': '子题 2', '11': '分配 6', '12': '日志 2'};

        this._sizeRows = 12;

        this._subRows['2'] = {rows:['11', '12'], isExpanded:false};
    }

    getSize() {
        return this._rowData.length;
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

    getSubRows(rowKey) {
        if (this._subRows[rowKey])
            return this._subRows[rowKey].rows || [];
        return [];
    }

    isSubRowExpanded(rowKey) {
        if (this._subRows[rowKey])
            return this._subRows[rowKey].isExpanded;
        return false;
    }

    toggleExpandSubRows(rowKey) {
        this._subRows[rowKey].isExpanded = !this.isSubRowExpanded(rowKey);
        //refresh
        this.runCallbacks();
    }

    addNewGroup(groupName, groupKey) {
        this._sizeGroups ++;
        let id = this._sizeGroups.toString();
        if (groupKey) {
          // groupKey有值
          let index = this._groups.findIndex(group => group.groupKey === groupKey);
          if (index < 0) {
              return null;
          }
          const group = this._groups[index]
          this._groups.splice(index, 1, {groupKey: id, name: groupName + id, rows:[], color: COLOR.SECTION_DEFAULT})
          this._groups.splice(index + 1, 0, group)
        }
        else {
          this._groups.push({groupKey: id, name: groupName + id, rows:[], color: COLOR.SECTION_DEFAULT});
        }

        //refresh
        this.runCallbacks();
        return id;
    }

    undoRemoveGroup(groupIndex, group) {
      this._groups.splice(groupIndex, 0, group);

      //refresh
      this.runCallbacks();
    }

    removeGroup(groupKey) {
        let index = this._groups.findIndex(column => column.groupKey === groupKey);
        if (index < 0) {
            return;
        }
        this._groups.splice(index, 1);

        //refresh
        this.runCallbacks();

        return index
    }

    getGroupAt(groupKey) {
        let index = this._groups.findIndex(column => column.groupKey === groupKey);
        if (index < 0) {
            return null;
        }
        return this._groups[index];
    }

    getColumns() {
        return this._columns;
    }

    addNewRow(groupKey, newItem) {
        let index = this._groups.findIndex(group => group.groupKey === groupKey);
        if (index < 0) {
            return;
        }
        this._sizeRows ++;
        let id = this._sizeRows.toString();
        this._rowData[id] = {'1':newItem};
        for(var i=0;i<this._columns.length;i++){
            const columnKey = this._columns[i]['columnKey'];
            if(i>2){
                this._rowData[id][columnKey]='';
            }
        }
        let rows = this._groups[index].rows;
        rows.push(id);

        //refresh
        this.runCallbacks();

        return id;
    }

    moveRow(sourceGroupKey, targetGroupKey, rowKey, rowIndex) {
      let sourceGroupIndex = this._groups.findIndex(group => group.groupKey === sourceGroupKey);
      let targetGroupIndex = this._groups.findIndex(group => group.groupKey === targetGroupKey);
      if (sourceGroupIndex < 0 || targetGroupIndex < 0) {
          return;
      }
      
      let sourceGroupRows = this._groups[sourceGroupIndex].rows;
      let targetGroupRows = this._groups[targetGroupIndex].rows;
      
      let sourceRowIndex = sourceGroupRows.findIndex(row => row === rowKey);
      sourceGroupRows.splice(sourceRowIndex, 1)
      
      // rowIndex 小于0 则为移动，否则为撤销移动
      if (rowIndex < 0) {
        targetGroupRows.push(rowKey);
      }
      else {
        targetGroupRows.splice(rowIndex, 0, rowKey)
      }
      
      //refresh
      this.runCallbacks();

      return sourceRowIndex;
    }

    addNewSubRow(rowKey, newItem) {
        let rows = this._subRows[rowKey].rows;
        if (!rows) {
            rows = [];
            this._subRows[rowKey].rows = rows;
        }
        this._sizeRows ++;
        let id = this._sizeRows.toString();
        rows.push(id);
        this._rowData[id] = {'1':newItem};

        //refresh
        this.runCallbacks();

        return id;
    }

    addNewColumn(newItem, level, columnComponentType) {
        this._sizeColumns ++; 
        let id = this._sizeColumns.toString();
        this._columns.push({columnKey: id, name:newItem, width: 200, type: ColumnType.EDITBOX, columnComponentType: columnComponentType, collpse:false, level: level});
        for(let key in this._rowData){
            let row = this._rowData[key];
            row[id] = "";
        }
        //refresh
        this.runCallbacks();

        return id;
    }

    addNewSubcolumn(newItem, columnComponentType) {
        this._sizeSubcolumns ++; 
        let id = this._sizeSubcolumns.toString();
        this._subColumns.push({columnKey: id, name:newItem, width: 200, type: ColumnType.EDITBOX, columnComponentType: columnComponentType});

        //refresh
        this.runCallbacks();

        return id;
    }

    removeColumn(columnKey) {
        let index = this._columns.findIndex(column => column.columnKey === columnKey);
        if (index < 0) {
            return;
        }
        this._columns.splice(index, 1);
        // push undo stack
        //refresh
        this.runCallbacks(); 
    }

    removeSubColumn(columnKey) {
        let index = this._subColumns.findIndex(column => column.columnKey === columnKey);
        if (index < 0) {
            return;
        }
        this._subColumns.splice(index, 1);
        // push undo stack
        //refresh
        this.runCallbacks(); 
    }

    removeRow(groupKey, rowKey) {
      let groupIndex = this._groups.findIndex(group => group.groupKey === groupKey);
      if (groupIndex < 0) {
          return;
      }

      let groupRows = this._groups[groupIndex].rows;

      let rowIndex = groupRows.findIndex(row => row === rowKey);
      groupRows.splice(rowIndex, 1)

      delete this._rowData[rowKey];
      this._sizeRows--

      //refresh
      this.runCallbacks(); 
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
        let index = this._columns.findIndex(column => column.columnKey === columnKey);
        if (index < 0) {
            return;
        }
        let columnToReorder = this._columns[index];

        if (columnAfter) {
            var iindex = this._columns.findIndex(column => column.columnKey === columnAfter);
            if (iindex <= 0) { 
                return;
            }
            this._columns.splice(index, 1);
            this._columns.splice(iindex, 0, columnToReorder);
        } else if (index !== this._columns.length - 1) {
            this._columns.splice(index, 1);
            this._columns.push(columnToReorder);
        }
        //refresh
        this.runCallbacks();
    }

    reorderRow(oldGroupKey, rowKey, newGroupKey, rowAfter) {
        let oldgroup = this._groups.find(group => group.groupKey === oldGroupKey);
        if (!oldgroup) {
            return;
        }
        let index = oldgroup.rows.findIndex(row => row === rowKey);
        if (index >= 0) {
            oldgroup.rows.splice(index, 1);
        }
        let newgroup = this._groups.find(group => group.groupKey === newGroupKey);
        if (!newgroup) {
            return;
        }
        index = newgroup.rows.findIndex(row => row === rowAfter);
        if (index === -1)
            index = 0;
        else 
            index ++;

        if (index >= 0) {
            newgroup.rows.splice(index, 0, rowKey);
        }
        
        //refresh
        this.runCallbacks();
    }

    setGroupData(groupData) {
      let group = this._groups.find(group => group.groupKey === groupData.groupKey)

      if (group) {
        group.name = groupData.name ? groupData.name : group.name
        group.color = groupData.color ? groupData.color : group.color
      }

      //refresh
      this.runCallbacks();
    }

    changeGroupCollapseState(groupKey, isGroupCollapsed) {
      // 都有值
      if (groupKey && (null !== isGroupCollapsed && undefined !== isGroupCollapsed)) {
        let group = this._groups.find(group => group.groupKey == groupKey);
        group.isCollapsed = isGroupCollapsed
      }
      // key无值，折叠状态有值
      else if (!groupKey && (null !== isGroupCollapsed && undefined !== isGroupCollapsed)) {
        for (let i = 0; i < this._groups.length; i++) {
          this._groups[i].isCollapsed = isGroupCollapsed
        }
      }
      // key有值，折叠状态无值
      else if (groupKey && (null === isGroupCollapsed || undefined === isGroupCollapsed)) {
        let group = this._groups.find(group => group.groupKey == groupKey);
        group.isCollapsed = !group.isCollapsed
      }

      //refresh
      this.runCallbacks();
    }
    
    setColumnData(columnKey, columnData) {
      let column = this._columns.find(column => column.columnKey === columnKey)
      if (column) {
        for (let key in columnData) {
          column[key] = columnData[key]
        }
      }

      //refresh
      this.runCallbacks();
    }

    /**
    * The callbacks are used to trigger events as new data arrives.
    *
    * In most cases the callback is a method that updates the state, e.g.
    * updates a version number without direct impact on the component but that
    * will trigger an component refresh/update.
    *
    * @param callback {function} The fallback function to be called
    * @param id       {string}   The string that identifies the given callback.
    *   This allows a callback to be overwritten when creating new objects that
    *   use this data as reference.
    * @return void
    */
    setCallback(callback, id = 'base') {
        const newCallback = { id, fun: callback };

        let found = false;
        const newCallbacks = [];
        for (const cb of this._callbacks) {
            if (cb.id === id) {
                found = true;
                newCallbacks.push(newCallback);
            } else {
                newCallbacks.push(cb);
            }
        }

        if (!found) {
            newCallbacks.push(newCallback);
        }

        this._callbacks = newCallbacks;
    }

    /**
     * Runs callbacks in the order that they've been added.
     *
     * The function is triggered when the fetchRange() Promise resolves.
     *
     * @return {void}
     */
    runCallbacks() {
        for (const cb of this._callbacks) {
            cb.fun();
        }
    }
}export default MainTableDataStore;