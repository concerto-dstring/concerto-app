/**
 * Data store the close to persistent data layer
 * Column array [{ColumnKey, Name, Width, Type}]
 * Rows Data {(RowKey, ColumnKey) -> Data }]
 * Group array [GroupKey, Group Name, [Rows]]
 * all data will go to api
 */

'use strict';

import $ from 'jquery';
import { ColumnType } from './data/MainTableType';
import { COLOR } from '../helpers/section/header/StyleValues'
import { getPeople, getPeopleById } from '../helpers/section/modal/PeopleName';
import { ListAllBoards, GetBoardbyId } from '../helpers/data/fetchBoards'
import gql from "graphql-tag";
import { listBoards, getBoard } from "../graphql/queries"
import { createGroup } from "../graphql/mutations" 

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
        this._boardMenus = []
        this._dashboardMenus = []
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
    
    createFakeObjectData(url) {
      const self = this;
      $.ajax({
        url : url,
        data:{},
        cache : false, 
        async : false,
        type : "GET",
        dataType : 'json',
        success : function(data){
          self._columns = data.columns;
          self._groups  = data.groups;
          self._rowData = data.rowData;
          self._subRows = data.subRows;
          self._sizeColumns = self._columns.length;
          self._sizeGroups  = self._groups.length;
          self._sizeRows    = Object.keys(self._rowData).length;   
        }
      });
    }

    fetchSideMenus(apolloClient, type, setMenus) {
      switch (type) {
        case 'board':
          apolloClient
            .query({
              query: gql(listBoards)
            })
            .then(result => {
              this._boardMenus = result.data.listBoards.items
              this._currentBoardId = this._boardMenus.length > 0 ? this._boardMenus[0].id : ''
              setMenus(result.data.listBoards.items, true)
            });
          break;
      
        default:
          break;
      }
    }

    /**
     * replaces the createFakeObjectData() with backend data
     */
    fetchBackendBoardData(apolloClient, boardId){
      this._currentBoardId = boardId
      apolloClient
        .query({
          query: gql(getBoard),
          variables: {
            id: boardId
          }
        })
        .then(result => console.log(result));

      // return ret;
    }

    getCurrentUser() {
      return getPeople('Jiang Guangzhou')[0]
    }

    getSize() {
        return this._rowData.length;
    }

    getObjectAt(rowKey) {
        return this._rowData[rowKey];
    }

    getRowData() {
      return this._rowData
    }

    setObjectAt(rowKey, columnKey, value, type) {
        // skip the group row 
        if (!rowKey || !columnKey) 
            return;

        if (columnKey === 'updateInfo') {
          if (type === 'update') {
            // 更新
            let updateInfo = this._rowData[rowKey][columnKey]
            let infoIndex = updateInfo.findIndex(info => info.id === value.id)
            updateInfo[infoIndex] = value
          }
          else if (type === 'add') {
            // 新增
            let updateInfo = this._rowData[rowKey][columnKey]
            if (updateInfo && updateInfo.length > 0) {
              updateInfo.unshift(value)
            }
            else {
              updateInfo = []
              updateInfo.push(value)
            }

            this._rowData[rowKey][columnKey] = updateInfo
          }
          else {

          }
        }
        else {
          this._rowData[rowKey][columnKey] = value;
        }

        this.runCallbacks();
    }

    getGroups() {
        return this._groups;
    }

    getSubRows(rowKey, subRowKeys) {
        if (this._subRows[rowKey]) {
          if (subRowKeys && subRowKeys.length > 0) {
            if (this._subRows[rowKey].rows) {
              let rows = []
              this._subRows[rowKey].rows.map(row => {
                if (subRowKeys.indexOf(row) !== -1) {
                  rows.push(row)
                }
              })
              return rows
            }
            else {
              return []
            }
          }
          else {
            return this._subRows[rowKey].rows || [];
          }
        }

        return [];
    }

    getSubRowData() {
      return this._subRows
    }

    isSubRowExpanded(rowKey) {
        if (this._subRows[rowKey])
            return this._subRows[rowKey].isExpanded;
        return false;
    }

    addNewSubSection(parentRowKey, newItem) {
      // 添加空白行
      this._sizeRows ++;
      let id = this._sizeRows.toString();
      this._rowData[id] = newItem;

      // 添加子项
      this._subRows[parentRowKey] = {rows:[id], isExpanded: true}

      // 刷新
      this.runCallbacks();
    }

    toggleExpandSubRows(rowKey) {
        this._subRows[rowKey].isExpanded = !this.isSubRowExpanded(rowKey);
        //refresh
        this.runCallbacks();
    }

    addNewGroup(groupName, groupKey, apolloClient) {
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
          // this._groups.push({groupKey: id, name: groupName + id, rows:[], color: COLOR.SECTION_DEFAULT});
          apolloClient
            .mutate({
              mutation: gql(createGroup),
              variables: {
                input: {
                  name: groupName,
                  rank: '1',
                  createdAt: new Date().toISOString(),
                  groupBoardId: this._currentBoardId,
                  groupCreatorId: '100001'
                }
              }
            })
            .then(result => console.log(result))
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
            const column = this._columns[i];
            const columnKey = column.columnKey;
            const level = column.level;
            if(i>2&&level<1){
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