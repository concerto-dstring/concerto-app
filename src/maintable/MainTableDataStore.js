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
import { getPeople } from '../helpers/section/modal/PeopleName';
import { ListAllBoards, GetBoardbyId } from '../helpers/data/fetchBoards'
import gql from "graphql-tag";
import { listBoards, getBoard, getGroup, getRow, getData, getUser } from "../graphql/queries"
import { 
  createGroup, updateGroup, 
  createColumn, updateColumn, 
  createColumnBoard, updateColumnBoard,
  createData, updateData,
  createRow, updateRow 
} from "../graphql/mutations"

const rankBlock = 32768

class MainTableDataStore {

    // rows is array, rowkey -> {key value hashmap}
    // columnkey

    constructor() {
        this._apolloClient = null
        this._sizeRows = 0;
        this._sizeSubrows = 0;
        this._columns= [];
        this._sizeColumns = 0;
        this._rowData = {};
        this._subRowKeys = []
        this._rowColumnData = {}
        this._groups = [];
        this._sizeGroups = 0;
        this._subRows = {};
        this._boardMenus = []
        this._dashboardMenus = []
        this._currentBoardId = ''
        this._currentUser = {}
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
      this._apolloClient = apolloClient
      switch (type) {
        case 'board':
          apolloClient
            .query({
              query: gql(listBoards),
              fetchPolicy: "no-cache"
            })
            .then(result => {
              this._boardMenus = result.data.listBoards.items
              if (this._boardMenus.length > 0) {
                let defaultBoard = this._boardMenus[0]
                this._currentBoardId =  defaultBoard.id
                this.fetchBackendBoardData(apolloClient, defaultBoard.id, setMenus)
              }
            });
          break;
      
        default:
          break;
      }
    }

    /**
     * replaces the createFakeObjectData() with backend data
     */
    fetchBackendBoardData(apolloClient, boardId, setMenus, setBusy){
      this._currentBoardId = boardId
      apolloClient
        .query({
          query: gql(getBoard),
          variables: {
            id: boardId
          },
          fetchPolicy: "no-cache"
        })
        .then(result => {
          let board = result.data.getBoard
          
          this._columns = []
          this._rowData = {}
          this._groups = []
          this._subRows = {}
          this._subRowKeys = []

          let groups = this.sortDataByRank(board.groups.items)
          groups.map(group => {
            if (!group.deleteFlag) {
              group.groupKey = group.id
              let groupRows = this.sortDataByRank(group.rows.items)
              let rows = []
              groupRows.map(row => {
                if (!row.deleteFlag) {
                  if (row.parentId) {
                    if (Object.keys(this._subRows).indexOf(row.parentId) !== -1) {
                      let subRows = this._subRows[row.parentId].rows
                      subRows.push(row)
                    }
                    else {
                      this._subRows[row.parentId] = {}
                      let subRows = []
                      subRows.push(row)
                      this._subRows[row.parentId].rows = subRows
                      this._subRows[row.parentId].isExpanded = false
                    }
                    this._subRowKeys.push(row.id)
                  }
                  else {
                    rows.push(row)
                  }
                  this._rowData[row.id] = {}
                  this._rowColumnData[row.id] = {}
                  let dataItems = row.datas.items
                  dataItems.map(item => {
                    this._rowData[item.rowID][item.columnID] = item.value
                    this._rowColumnData[item.rowID][item.columnID] = item.id
                  })
                }
              })

              group.rows = rows
              this._groups.push(group)
            }
          })

          for (let key in this._subRows) {
            let subRows = this.sortDataByRank(this._subRows[key].rows)
            this._subRows[key].rows = subRows
          }

          let columns = this.sortDataByRank(board.columns.items)
          columns.map(column => {
            if(!column.deleteFlag) {
              column.type = column.column.columntype
              column.columnKey = column.column.id
              column.columnComponentType = column.column.columnComponentType
              column.isTitle = column.column.isTitle
              let name = column.column.name
              column.name = name
              if (name === ColumnType.ROWACTION || name === ColumnType.ROWSELECT) {
                column.width = 36
              }
              else if (column.isTitle) {
                column.width = 360
              }
              else {
                column.width = 200
              }
              this._columns.push(column)
            }
          })
          if (setMenus) {
            setMenus(this._boardMenus, true)
          }
          else {
            setBusy(false)
          }
        })
        .catch(error => {
          console.log(error)
        })

      // return ret;
    }

    sortDataByRank(arr) {
      if (arr && arr.length > 0) {
        arr.sort(function(a, b){
          let m = Number(a.rank);
          let n = Number(b.rank);
          if (m < n) return -1;
          if (m > n) return 1;
          return 0;
         })
      }

       return arr
    }

    getCreateColumnRank(level) {
      let columns = this.sortDataByRank(this._columns.filter(column => column.level === level))
      let rank
      if (columns.length > 0) {
        rank = Number(columns[columns.length - 1].rank) + rankBlock
      }
      else {
        rank = rankBlock
      }

      return String(rank)
    }

    getCreateRowRank(parentRowKey, groupKey) {
      let rows = []
      if (parentRowKey) {
        let subRow = this._subRows[parentRowKey]
        if (subRow) {
          rows = subRow.rows
        }
      }
      else {
        let group = this._groups.find(group => group.groupKey === groupKey)
        if (group) {
          rows = group.rows
        }
      }
      let rank
      if (rows.length > 0) {
        rank = Number(rows[rows.length - 1].rank) + rankBlock
      }
      else {
        rank = rankBlock
      }

      return String(rank)
    }

    getCurrentUser(apolloClient, userId) {
      apolloClient
        .query({
          query: gql(getUser),
          variables: {
            id: userId
          },
          fetchPolicy: "no-cache"
        })
        .then(result => this._currentUser = result.data.getUser);
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

        let column = this._columns.find(column => column.columnKey === columnKey)

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
          let newValue = value === "" ? null : value
          let dataId = this._rowColumnData[rowKey][columnKey]
          if (dataId) {
            this.updateCellData(rowKey, columnKey, dataId, newValue)
          }
          else {
            this.createCellData(rowKey, columnKey, newValue)
          }
        }
    }

    updateCellData(rowKey, columnKey, dataId, value) {
      this._apolloClient
        .mutate({
          mutation: gql(updateData),
          variables: {
            input: {
              id: dataId,
              value: value
            }
          }
        })
        .then(result => {
          this._rowData[rowKey][columnKey] = value;
          this.runCallbacks();
        })
        .catch(error => {
          console.log(error)
        })
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
                if (subRowKeys.indexOf(row.id) !== -1) {
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

    addNewSubSection(groupKey, parentRowKey, newItem) {
      let rank = this.getCreateRowRank(parentRowKey, groupKey)
      // 添加空白行
      this._apolloClient
        .mutate({
          mutation: gql(createRow),
          variables: {
            input: {
              parentId: parentRowKey,
              rank: rank,
              createdAt: new Date().toISOString(),
              groupID: groupKey,
              creatorID: this._currentUser.id,
              deleteFlag: false
            }
          }
        })
        .then(result => {
          let row = result.data.createRow
          this._rowData[row.id] = {}
          this._rowColumnData[row.id] = {}
          let subColumns = this._columns.filter(column => column.level !== 0)
          if (subColumns.length > 0) {
            for(var i=0; i<this._columns.length; i++){
              const column = this._columns[i]
              if (column.level === 0|| column.name === ColumnType.ROWACTION || column.name === ColumnType.ROWSELECT) continue
              if (column.isTitle) {
                this.createCellData(row.id, column.columnKey, newItem)
              }
              else {
                this.createCellData(row.id, column.columnKey, null)
              }
            }
            // 添加子项
            this._subRows[parentRowKey] = {rows:[row], isExpanded: true}
          }
          else {
            let name = "子项描述"
            this.createColumn(false, ColumnType.ROWACTION, true, 1, ColumnType.ROWACTION, null, true, String(rankBlock))
            this.createColumn(false, ColumnType.ROWSELECT, true, 1, ColumnType.ROWACTION, null, true, String(rankBlock * 2))
            this.createColumn(true, name, true, 1, ColumnType.EDITBOX, "TEXT", true, String(rankBlock * 3))
            // 添加子项
            this._subRows[parentRowKey] = {rows:[row], isExpanded: true}
            this.runCallbacks()
          }
        })
        .catch(error => {
          console.log(error)
        })
    }

    createColumn(isTitle, name, fixed, level, columntype, columnComponentType, isSubColumn, rank) {
      this._apolloClient
        .mutate({
          mutation: gql(createColumn),
          variables: {
            input: {
              isTitle: isTitle,
              name: name,
              columntype: columntype,
              columnComponentType: columnComponentType,
              createdAt: new Date().toISOString(),
              creatorID: this._currentUser.id,
              deleteFlag: false
            }
          }
        })
        .then(result => {
          let column = result.data.createColumn
          this.createColumnBoard(column.id, name, fixed, level, columntype, columnComponentType, isSubColumn, rank)
        })
        .catch(error => {
          console.log(error)
        })
    }

    toggleExpandSubRows(rowKey) {
        this._subRows[rowKey].isExpanded = !this.isSubRowExpanded(rowKey);
        //refresh
        this.runCallbacks();
    }

    getCreateGroupRank(groupKey, currentGroup, currentIndex) {
      let rank
      if (this._groups.length > 0) {
        if (groupKey) {
          // 中间插入
          let currentRank = Number(currentGroup.rank)
          let preRank
          if (currentIndex === 0) {
            preRank = 0
          }
          else {
            preRank = Number(this._groups[currentIndex - 1].rank)
          }

          rank = preRank + ((currentRank - preRank) / 2)
        }
        else {
          // 插入最上面
          rank = Number(this._groups[this._groups.length - 1].rank) + rankBlock
        }
      }
      else {
        rank = rankBlock
      }
      
      return String(rank)
    }

    addNewGroup(groupName, groupKey) {
      let currentGroup
      let rank
      let index
      if (groupKey) {
        index = this._groups.findIndex(group => group.groupKey === groupKey);
        if (index < 0) {
            return null;
        }
        currentGroup = this._groups[index]
        // 中间插入分区的rank计算暂时没有完美方案
        rank = this.getCreateGroupRank(groupKey, currentGroup, index)
      }
      else {
        rank = this.getCreateGroupRank(groupKey)
      }
      this._apolloClient
        .mutate({
          mutation: gql(createGroup),
          variables: {
            input: {
              name: groupName,
              rank: rank,
              createdAt: new Date().toISOString(),
              boardID: this._currentBoardId,
              creatorID: this._currentUser.id,
              isCollapsed: false,
              deleteFlag: false,
              color: COLOR.DEFAULT
            }
          }
        })
        .then(result => {
          let group = result.data.createGroup
          group.rows = []
          if (groupKey) {
            this._groups.splice(index, 1, group)
            this._groups.splice(index + 1, 0, currentGroup)
          }
          else {
            this._groups.push(group)
          }

          this.runCallbacks();
        })
        .catch(error => {
          console.log(error)
        })
    }

    undoRemoveGroup(groupIndex, group) {
      this._apolloClient
        .mutate({
          mutation: gql(updateGroup),
          variables: {
            input: {
              id: group.id,
              deleteFlag: false
            }
          }
        })
        .then(result => {
          this._groups.splice(groupIndex, 0, group);

          //refresh
          this.runCallbacks();
        })
        .catch(error => {
          console.log(error)
        })
    }

    removeGroup(groupKey) {
        let index = this._groups.findIndex(column => column.groupKey === groupKey);
        if (index < 0) {
            return;
        }
        let group = this._groups[index]
        this._apolloClient
          .mutate({
            mutation: gql(updateGroup),
            variables: {
              input: {
                id: group.id,
                deleteFlag: true
              }
            }
          })
          .then(result => {
            this._groups.splice(index, 1);

            this.runCallbacks();
          })
          .catch(error => {
            console.log(error)
          })

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
      let group = this._groups[index]
      let rank = this.getCreateRowRank(null, groupKey)
      this._apolloClient
        .mutate({
          mutation: gql(createRow),
          variables: {
            input: {
              rank: rank,
              createdAt: new Date().toISOString(),
              groupID: group.id,
              creatorID: this._currentUser.id,
              deleteFlag: false
            }
          }
        })
        .then(result => {
          let row = result.data.createRow
          this._rowData[row.id] = {}
          this._rowColumnData[row.id] = {}
          for(var i=0; i<this._columns.length; i++){
            const column = this._columns[i]
            if (column.level !== 0  || column.name === ColumnType.ROWACTION || column.name === ColumnType.ROWSELECT) continue
            if (column.isTitle) {
              this.createCellData(row.id, column.columnKey, newItem)
            }
            else {
              this.createCellData(row.id, column.columnKey, null)
            }
          }
          let rows = this._groups[index].rows;
          rows.push(row);
        })
        .catch(error => {
          console.log(error)
        })
    }

    moveRow(sourceGroupKey, targetGroupKey, rowKey, oldSourceRow) {
      let sourceGroupIndex = this._groups.findIndex(group => group.groupKey === sourceGroupKey);
      let targetGroupIndex = this._groups.findIndex(group => group.groupKey === targetGroupKey);
      if (sourceGroupIndex < 0 || targetGroupIndex < 0) {
          return;
      }

      let sourceGroupRows = this._groups[sourceGroupIndex].rows;
      let targetGroupRows = this._groups[targetGroupIndex].rows;
      let sourceRowIndex = sourceGroupRows.findIndex(row => row.id === rowKey);
      let sourceRow = sourceGroupRows[sourceRowIndex]
      let data = {}
      data.sourceRowIndex = sourceRowIndex
      data.rank = sourceRow.rank
      data.row = sourceRow
      let rank = this.getCreateRowRank(null, targetGroupKey)
      this._apolloClient
        .mutate({
          mutation: gql(updateRow),
          variables: {
            input: {
              id: rowKey,
              groupID: targetGroupKey,
              rank: oldSourceRow ? oldSourceRow.rank : rank
            }
          }
        })
        .then(result => {
          sourceGroupRows.splice(sourceRowIndex, 1)
          
          // rowIndex 小于0 则为移动，否则为撤销移动
          if (!oldSourceRow) {
            targetGroupRows.push(sourceRow);
          }
          else {
            targetGroupRows.splice(oldSourceRow.sourceRowIndex, 0, oldSourceRow.row)
          }
          //refresh
          this.runCallbacks();
        })
        .catch(error => {
          console.log(error)
        })

      return data;
    }

    addNewSubRow(groupID, rowKey, newItem) {
        let rows = this._subRows[rowKey].rows;
        if (!rows) {
            rows = [];
            this._subRows[rowKey].rows = rows;
        }
        let rank = this.getCreateRowRank(rowKey, groupID)
        this._apolloClient
          .mutate({
            mutation: gql(createRow),
            variables: {
              input: {
                parentId: rowKey,
                rank: rank,
                createdAt: new Date().toISOString(),
                groupID: groupID,
                creatorID: this._currentUser.id,
                deleteFlag: false
              }
            }
          })
          .then(result => {
            let row = result.data.createRow
            this._rowData[row.id] = {}
            this._rowColumnData[row.id] = {}
            for(var i=0; i<this._columns.length; i++){
              const column = this._columns[i]
              if (column.level === 0 || column.name === ColumnType.ROWACTION || column.name === ColumnType.ROWSELECT) continue
              if (column.isTitle) {
                this.createCellData(row.id, column.columnKey, newItem)
              }
              else {
                this.createCellData(row.id, column.columnKey, null)
              }
            }
            rows.push(row);
          })
          .catch(error => {
            console.log(error)
          })
    }

    addNewColumn(newItem, level, columnComponentType) {
      this._apolloClient
        .mutate({
          mutation: gql(createColumn),
          variables: {
            input: {
              name: newItem,
              columntype: ColumnType.EDITBOX,
              columnComponentType: columnComponentType,
              createdAt: new Date().toISOString(),
              creatorID: this._currentUser.id,
              deleteFlag: false
            }
          }
        })
        .then(result => {
          let column = result.data.createColumn
          this.createColumnBoard(column.id, newItem, false, level, ColumnType.EDITBOX, columnComponentType, false, null)
        })
        .catch(error => {
          console.log(error)
        })
    }

    createColumnBoard(columnId, columnName, fixed, level, columnType, columnComponentType, isSubColumn, rank) {
      let rankValue = rank ? rank : this.getCreateColumnRank(level)
      this._apolloClient
        .mutate({
          mutation: gql(createColumnBoard),
          variables: {
            input: {
              boardID: this._currentBoardId,
              columnID: columnId,
              fixed: fixed,
              level: level,
              collpse: false,
              rank: rankValue,
              deleteFlag: false
            }
          }
        })
        .then(result => {
          let column = result.data.createColumnBoard
          column.width = 200
          column.type = columnType
          column.columnKey = columnId
          column.name = columnName
          column.columnComponentType = columnComponentType
          this._columns.push(column)
          if (isSubColumn) {
            for(let key in this._rowData) {
              if (this._subRowKeys.indexOf(key) !== -1) {
                this.createCellData(key, columnId, null)
              }
            }
          }
          else {
            for(let key in this._rowData) {
              if (this._subRowKeys.indexOf(key) === -1) {
                this.createCellData(key, columnId, null)
              }
            }
          }
        })
        .catch(error => {
          console.log(error)
        })
    }

    createCellData(rowId, columnId, value) {
      this._apolloClient
        .mutate({
          mutation: gql(createData),
          variables: {
            input: {
              value: value,
              columnID: columnId,
              rowID: rowId
            }
          }
        })
        .then(result => {
          let row = this._rowData[rowId];
          let rowColumn = this._rowColumnData[rowId]
          row[columnId] = value;
          rowColumn[columnId] = result.data.createData.id
          this.runCallbacks();
        })
        .catch(error => {
          console.log(error)
        })
    }

    removeColumn(columnKey) {
      let index = this._columns.findIndex(column => column.columnKey === columnKey);
      if (index < 0) {
          return;
      }
      let column = this._columns[index]
      this._apolloClient
        .mutate({
          mutation: gql(updateColumn),
          variables: {
            input: {
              id: columnKey,
              deleteFlag: true
            }
          }
        })
        .then(result => {
          this.removeColumnBoard(column.id, index)
        })
        .catch(error => {
          console.log(error)
        })
    }

    removeColumnBoard(id, index) {
      this._apolloClient
        .mutate({
          mutation: gql(updateColumnBoard),
          variables: {
            input: {
              id: id,
              deleteFlag: true
            }
          }
        })
        .then(result => {
          this._columns.splice(index, 1);
          // push undo stack
          //refresh
          this.runCallbacks(); 
        })
        .catch(error => {
          console.log(error)
        })
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

      this._apolloClient
        .mutate({
          mutation: gql(updateRow),
          variables: {
            input: {
              id: rowKey,
              deleteFlag: true
            }
          }
        })
        .then(result => {
          let groupRows = this._groups[groupIndex].rows;
          let rowIndex = groupRows.findIndex(row => row.id === rowKey);
          groupRows.splice(rowIndex, 1)
          this.runCallbacks(); 
        })
        .catch(error => {
          console.log(error)
        })
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
      let rank
      let insertIndex
      if (columnAfter) {
        let insertIndex = this._columns.findIndex(column => column.columnKey === columnAfter);
        if (insertIndex <= 0) { 
            return;
        }
        
        let preColumn = this._columns[insertIndex]
        let nextColumn = this._columns[insertIndex + 1]
        if (nextColumn) {
          rank = Number(preColumn.rank) + ((Number(nextColumn.rank) - Number(preColumn.rank)) / 2)
        }
        else {
          rank = Number(preColumn.rank) + rankBlock
        }
      } else if (index !== this._columns.length - 1) {
        rank = Number(columnToReorder.rank) + rankBlock
      }

      this._apolloClient
        .mutate({
          mutation: gql(updateColumnBoard),
          variables: {
            input: {
              id: columnToReorder.id,
              rank: String(rank)
            }
          }
        })
        .then(result => {
          let column = result.data.updateColumnBoard
          columnToReorder.rank = column.rank
          if (columnAfter) {
            this._columns.splice(index, 1);
            this._columns.splice(insertIndex, 0, columnToReorder);
          }
          else if (index !== this._columns.length - 1) {
            this._columns.splice(index, 1);
            this._columns.push(columnToReorder);
          }
        
          //refresh
          this.runCallbacks();
        })
        .catch(error => {
          console.log(error)
        })
    }

    reorderRow(oldGroupKey, rowKey, newGroupKey, rowAfter) {
      let oldGroup = this._groups.find(group => group.groupKey === oldGroupKey);
      if (!oldGroup) {
          return;
      }

      let newGroup = this._groups.find(group => group.groupKey === newGroupKey);
      if (!newGroup) {
          return;
      }

      let newIndex = newGroup.rows.findIndex(row => row.id === rowAfter);
      let rank
      if (newIndex === -1) {
        // 分区无数据
        newIndex = 0
        rank = rankBlock
      }
      else {
        // 分区有数据
        let preRow = newGroup.rows[newIndex]
        let nextRow = newGroup.rows[newIndex + 1]
        if (nextRow) {
          rank = Number(preRow.rank) + ((Number(nextRow.rank) - Number(preRow.rank)) / 2)
        }
        else {
          rank = Number(preRow.rank) + rankBlock
        }
      }

      this._apolloClient
        .mutate({
          mutation: gql(updateRow),
          variables: {
            input: {
              id: rowKey,
              groupID: newGroupKey,
              rank: String(rank)
            }
          }
        })
        .then(result => {
          // 去除原行数据
          let oldIndex = oldGroup.rows.findIndex(row => row.id === rowKey);
          let row = oldGroup.rows[oldIndex]
          oldGroup.rows.splice(oldIndex, 1);

          newGroup.rows.splice(newIndex, 0, result.data.updateRow)

          //refresh
          this.runCallbacks();
        })
        .catch(error => {
          console.log(error)
        })
    }

    setGroupData(groupData) {
      let group = this._groups.find(group => group.groupKey === groupData.groupKey)

      if (group) {
        let name = groupData.name ? groupData.name : group.name
        let color = groupData.color ? groupData.color : group.color
        this._apolloClient
        .mutate({
          mutation: gql(updateGroup),
          variables: {
            input: {
              id: group.groupKey,
              name: name,
              color: color
            }
          }
        })
        .then(result => {
          group.name = name
          group.color = color
          this.runCallbacks(); 
        })
        .catch(error => {
          console.log(error)
        })
      }
    }

    changeGroupCollapseState(groupKey, isGroupCollapsed) {
      // 都有值
      if (groupKey && (null !== isGroupCollapsed && undefined !== isGroupCollapsed)) {
        let group = this._groups.find(group => group.groupKey == groupKey);
        this.updateGroupCollapsed(groupKey, isGroupCollapsed, group)
      }
      // key无值，折叠状态有值
      else if (!groupKey && (null !== isGroupCollapsed && undefined !== isGroupCollapsed)) {
        for (let i = 0; i < this._groups.length; i++) {
          this.updateGroupCollapsed(this._groups[i].groupKey, isGroupCollapsed, this._groups[i])
        }
      }
      // key有值，折叠状态无值
      else if (groupKey && (null === isGroupCollapsed || undefined === isGroupCollapsed)) {
        let group = this._groups.find(group => group.groupKey == groupKey);
        this.updateGroupCollapsed(groupKey, !group.isCollapsed, group)
      }

      //refresh
      this.runCallbacks();
    }

    updateGroupCollapsed(groupKey, isCollapsed, group) {
      this._apolloClient
        .mutate({
          mutation: gql(updateGroup),
          variables: {
            input: {
              id: groupKey,
              isCollapsed: isCollapsed,
            }
          }
        })
        .then(result => {
          group.isCollapsed = isCollapsed
          this.runCallbacks(); 
        })
        .catch(error => {
          console.log(error)
        })
    }
    
    setColumnData(columnKey, columnData) {
      let column = this._columns.find(column => column.columnKey === columnKey)
      if (column) {
        let updateInput = {}
        for (let key in columnData) {
          updateInput[key] = columnData[key]
        }
        updateInput.id = columnKey
        this._apolloClient
        .mutate({
          mutation: gql(updateColumn),
          variables: {
            input: updateInput
          }
        })
        .then(result => {
          for (let key in columnData) {
            column[key] = columnData[key]
          }
          this.runCallbacks(); 
        })
        .catch(error => {
          console.log(error)
        })
      }
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