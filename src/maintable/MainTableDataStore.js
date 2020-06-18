/**
 * Data store the close to persistent data layer
 * Column array [{ColumnKey, Name, Width, Type}]
 * Rows Data {(RowKey, ColumnKey) -> Data }]
 * Group array [GroupKey, Group Name, [Rows]]
 * all data will go to api
 */

'use strict';

import $ from 'jquery';
import {ColumnType} from './data/MainTableType';
import {COLOR} from '../helpers/section/header/StyleValues';
import {ListAllBoards, GetBoardbyId} from '../helpers/data/fetchBoards';
import gql from 'graphql-tag';
import {
  listBoards,
  getBoard,
  getGroup,
  getRow,
  getData,
  listUsers,
  getUser,
  getTeam,
  listThreadOnRows,
  getThreadOnRow,
  listNotifications,
} from '../graphql/queries';

import {
  createBoard,
  updateBoard,
  createGroup,
  updateGroup,
  createColumn,
  updateColumn,
  createColumnBoard,
  updateColumnBoard,
  createData,
  updateData,
  createRow,
  updateRow,
  createThreadOnRow,
  updateThreadOnRow,
  createReplyOnThread,
  updateReplyOnThread,
  createNotification,
  updateNotification,
} from '../graphql/mutations';
import {notification} from 'antd';
import {getRandomColor} from '../helpers/section/header/SectionColor';
import { getCellWidth } from '../helpers/columnlib/cell/CellProperties';

const rankBlock = 32768;
const PEOPLE = 'PEOPLE';

class MainTableDataStore {
  // rows is array, rowkey -> {key value hashmap}
  // columnkey

  constructor() {
    this._apolloClient = null;

    // global
    this._boardMenus = [];
    this._boards = {};
    this._currentBoardId = '';
    this._currentUser = {};
    this._cacheUsers = {};
    this._teamUsers = [];
    this._columnsComponentType = {};

    // per boardid
    this._columns = {};
    this._groups = {};
    this._rowData = {};
    this._rowColumnData = {};
    this._rowThreadData = {};
    this._rowThreadSize = {};
    this._boardNotifications = {};
    this._subRows = {};
    this._subRowKeys = {};
    this._rowNotification = {};
    this._searchUsers = {};

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
    this.getRowThreadData = this.getRowThreadData.bind(this);
    this.updateRowReadMessageStatus = this.updateRowReadMessageStatus.bind(this);
    this.getNotificationsByRowId = this.getNotificationsByRowId.bind(this);
    this._callbacks = [];
    this._mainPageCallBack = null;
    this.runCallbacks = this.runCallbacks.bind(this);
  }

  /**
   * 创建工作板
   * @param {*} boardName
   */
  createBoard(boardName, setMenus) {
    this._apolloClient
      .mutate({
        mutation: gql(createBoard),
        variables: {
          input: {
            name: boardName,
            color: getRandomColor(),
            creatorID: this._currentUser.id,
            createdAt: new Date().toISOString(),
          },
        },
      })
      .then((result) => {
        let board = result.data.createBoard;

        this._currentBoardId = board.id;

        // 创建默认列(三列：菜单列、复选框列、名称列)
        this.createColumn(false, ColumnType.ROWACTION, true, 0, ColumnType.ROWACTION, null, false, String(rankBlock));
        this.createColumn(
          false,
          ColumnType.ROWSELECT,
          true,
          0,
          ColumnType.ROWSELECT,
          null,
          false,
          String(rankBlock * 2)
        );
        this.createColumn(
          true,
          ColumnType.GROUPTITLE,
          true,
          0,
          ColumnType.EDITBOX,
          'TEXT',
          false,
          String(rankBlock * 3)
        );

        // 更新工作板
        this.reFetchSideMenus(board.id, setMenus);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /**
   * 更新工作板名称
   * @param {*} boardId
   * @param {*} boardName
   * @param {*} updateMenus
   */
  updateBoard(boardId, boardName, boardNewName, updateMenus) {
    this._apolloClient
      .mutate({
        mutation: gql(updateBoard),
        variables: {
          input: {
            id: boardId,
            name: boardNewName,
          },
        },
      })
      .then((result) => {})
      .catch((error) => {
        updateMenus(boardId, boardName);
      });

    updateMenus(boardId, boardNewName);
  }

  /**
   * 删除工作版(更新标识)
   * @param {*} boardName
   * @param {*} setMenus
   */
  deleteBoard(boardId, deleteFlag, setMenus) {
    this._apolloClient
      .mutate({
        mutation: gql(updateBoard),
        variables: {
          input: {
            id: boardId,
            deleteFlag: deleteFlag,
          },
        },
      })
      .then((result) => {
        let board = result.data.updateBoard;

        // 更新工作板
        if (deleteFlag) {
          this.reFetchSideMenus(null, setMenus);
        } else {
          this.reFetchSideMenus(board.id, setMenus);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  fetchSideMenus(apolloClient, type, currentUserId, setMenus, defaultBoardId, dealErrorBoardId, mainPageCallBack) {
    this._apolloClient = apolloClient;
    this._mainPageCallBack = mainPageCallBack;
    switch (type) {
      case 'board':
        apolloClient
          .query({
            query: gql(listBoards),
            variables: {
              limit: 1000,
              filter: {
                deleteFlag: {
                  ne: true,
                },
              },
            },
            fetchPolicy: 'no-cache',
          })
          .then((result) => {
            this._boardMenus = this.sortDataByCreatedAt(result.data.listBoards.items);
            if (this._boardMenus.length > 0) {
              if (!defaultBoardId) {
                defaultBoardId = this._boardMenus[0].id;
                this.fetchBackendBoardData(defaultBoardId, setMenus, null, currentUserId);
              } else {
                // 防止Id有问题
                let boardIndex = this._boardMenus.findIndex((board) => board.id === defaultBoardId);
                if (boardIndex < 0) {
                  dealErrorBoardId();
                } else {
                  this.fetchBackendBoardData(defaultBoardId, setMenus, null, currentUserId);
                }
              }

              // 设置每个Board的通知
              this.setBoardRowNotReadNotifications(this._boardMenus, currentUserId)

              // for (let key in this._boardMenus) {
              //   let board = this._boardMenus[key];
              //   let notifinum = this.getNotificationsByBoardId(board.id, currentUserId);
              //   console.log('bardid ' + board.id + ' has notification ' + notifinum);
              // }
            } else {
              setMenus([], true, null);
            }
          });
        break;

      default:
        break;
    }
  }

  reFetchSideMenus(boardId, setMenus) {
    this._apolloClient
      .query({
        query: gql(listBoards),
        variables: {
          limit: 1000,
          filter: {
            deleteFlag: {
              ne: true,
            },
          },
        },
        fetchPolicy: 'no-cache',
      })
      .then((result) => {
        this._boardMenus = this.sortDataByCreatedAt(result.data.listBoards.items);
        if (this._boardMenus.length > 0) {
          let defaultBoard;
          if (boardId) {
            defaultBoard = this._boardMenus.find((board) => board.id === boardId);
          } else {
            defaultBoard = this._boardMenus[0];
          }
          this._currentBoardId = defaultBoard.id;
          this.fetchBoardData(defaultBoard.id, setMenus);
        }
      });
  }

  /**
   * 查询每个Board未读的通知条目数
   * @param {*} boardId
   */
  getNotificationsByBoardId(boardId) {
    if (!boardId || !this._boardNotifications.hasOwnProperty(boardId)) {
      return 0
    }
    let notReadCount = 0

    for (let key in this._boardNotifications[boardId]) {
      notReadCount = notReadCount + this._boardNotifications[boardId][key]
    }

    return notReadCount
  }

  /**
   * 设置the current Board未读的通知条目数
   * @param {*} boards
   */
  setBoardRowNotReadNotifications(boards, currentUserId) {
    boards.map((board) => {
      let groups = board.groups.items.filter((item) => !item.deleteFlag);
      this._boardNotifications[board.id] = {};
      groups.map((group) => {
        if (group.rows.items) {
          let rows = group.rows.items.filter((item) => !item.deleteFlag);
          rows.map((row) => {
            let notifications = row.notification.items.filter(
              (item) => item.receiverID === currentUserId && !item.seenflag
            );
            this._boardNotifications[board.id][row.id] = notifications.length;
          });
        }
      });
    });
  }

  /**
   * replaces the createFakeObjectData() with backend data
   */
  fetchBackendBoardData(boardId, setMenus, setLoading, currentUserId) {
    this._currentBoardId = boardId;
    this.getAllUsers(boardId, setMenus, setLoading, currentUserId);
    // this.fetchBoardData(boardId, setMenus, setLoading);
    // return ret;
  }

  fetchBoardData(boardId, setMenus, setLoading) {
    var board;
    if (boardId in this._boards) {
      if (setMenus) {
        setMenus(this._boardMenus, true, this._boards[boardId]);
      } else {
        setLoading(false);
      }
    } else {
      this._apolloClient
        .query({
          query: gql(getBoard),
          variables: {
            id: boardId,
          },
          fetchPolicy: 'no-cache',
        })
        .then((result) => {
          board = result.data.getBoard;
          this._boards[boardId] = board;
          this.cacheBoardDataInternal(setMenus, setLoading, board);
        })
        .catch((error) => {
          console.log('fetchBoardData ' + boardId + ':' + error);
        });
    }
  }

  cacheBoardDataInternal(setMenus, setLoading, board) {
    var boardId = board.id;

    this._columnsComponentType = [];
    this._columns[boardId] = [];
    this._groups[boardId] = [];
    this._rowData[boardId] = {};
    this._rowThreadData[boardId] = {};
    this._rowThreadSize[boardId] = {};
    this._rowColumnData[boardId] = {};
    this._subRows[boardId] = {};
    this._subRowKeys[boardId] = [];
    this._rowNotification[boardId] = {};
    this._searchUsers[boardId] = {};

    let columns = this.sortDataByRank(board.columns.items);
    this.setColumns(boardId, columns);

    let groups = this.sortDataByRank(board.groups.items);
    this.setGroupAndRowData(boardId, groups);
    for (let key in this._subRows[boardId]) {
      let subRows = this.sortDataByRank(this._subRows[boardId][key].rows);
      this._subRows[boardId][key].rows = subRows;
    }

    if (setMenus) {
      setMenus(this._boardMenus, true, board);
    } else {
      setLoading(false);
    }
  }

  setColumns(boardId, columns) {
    columns.map((column) => {
      if (!column.deleteFlag) {
        this._columnsComponentType[column.column.id] = column.column.columnComponentType;
        column.type = column.column.columntype;
        column.columnKey = column.column.id;
        column.columnComponentType = column.column.columnComponentType;
        column.isTitle = column.column.isTitle;
        let name = column.column.name;
        column.name = name;
        if (name === ColumnType.ROWSELECT) {
          column.width = 36;
        } else if(name === ColumnType.ROWACTION){
          column.width = 22;
        } else if (column.isTitle) {
          column.width = 360;
        } else {
          column.width = getCellWidth(column.column.columnComponentType);
        }
        this._columns[boardId].push(column);
      }
    });
  }

  setGroupAndRowData(boardId, groups) {
    groups.map((group) => {
      if (!group.deleteFlag) {
        group.groupKey = group.id;
        let groupRows = this.sortDataByRank(group.rows.items);
        let rows = [];
        groupRows.map((row) => {
          if (!row.deleteFlag) {
            if (row.parentId) {
              if (Object.keys(this._subRows[boardId]).indexOf(row.parentId) !== -1) {
                let subRows = this._subRows[boardId][row.parentId].rows;
                subRows.push(row);
              } else {
                this._subRows[boardId][row.parentId] = {};
                let subRows = [];
                subRows.push(row);
                this._subRows[boardId][row.parentId].rows = subRows;
                this._subRows[boardId][row.parentId].isExpanded = false;
              }
              this._subRowKeys[boardId].push(row.id);
            } else {
              rows.push(row);
            }

            this._rowData[boardId][row.id] = {};
            this._rowColumnData[boardId][row.id] = {};

            if (row.notification && row.notification.items.length) {
              this._rowNotification[boardId][row.id] = row.notification.items;
            }

            let dataItems = row.datas.items;
            dataItems.map((item) => {
              if (this._columnsComponentType[item.columnID] === PEOPLE) {
                let userIds = item.value;
                if (userIds) {
                  let userIdArr = userIds.split(',');
                  let users = [];
                  userIdArr.map((userId) => {
                    if (userId in this._cacheUsers) {
                      users.push(this._cacheUsers[userId]);
                    }
                    this._searchUsers[boardId][userId] = this._cacheUsers[userId]
                  });
                  this._rowData[boardId][item.rowID][item.columnID] = users;
                } else {
                  this._rowData[boardId][item.rowID][item.columnID] = [];
                }
              } else {
                this._rowData[boardId][item.rowID][item.columnID] = item.value;
              }

              this._rowColumnData[boardId][item.rowID][item.columnID] = item.id;
            });

            this._rowThreadSize[boardId][row.id] = row.threadOnRow.items.length;
          }
        });

        group.rows = rows;
        this._groups[boardId].push(group);
      }
    });
  }

  sortDataByRank(arr) {
    if (arr && arr.length > 0) {
      arr.sort(function (a, b) {
        let m = Number(a.rank);
        let n = Number(b.rank);
        if (m < n) return -1;
        if (m > n) return 1;
        return 0;
      });
    }

    return arr;
  }

  getCreateColumnRank(level) {
    let columns = this.sortDataByRank(this._columns[this._currentBoardId].filter((column) => column.level === level));
    let rank;
    if (columns.length > 0) {
      rank = Number(columns[columns.length - 1].rank) + rankBlock;
    } else {
      rank = rankBlock;
    }

    return String(rank);
  }

  getCreateRowRank(parentRowKey, groupKey) {
    let rows = [];
    if (parentRowKey) {
      let subRow = this._subRows[this._currentBoardId][parentRowKey];
      if (subRow) {
        rows = subRow.rows;
      }
    } else {
      let group = this._groups[this._currentBoardId].find((group) => group.groupKey === groupKey);
      if (group) {
        rows = group.rows;
      }
    }
    let rank;
    if (rows.length > 0) {
      rank = Number(rows[rows.length - 1].rank) + rankBlock;
    } else {
      rank = rankBlock;
    }

    return String(rank);
  }

  getCurrentUser(apolloClient, userId) {
    apolloClient
      .query({
        query: gql(getUser),
        variables: {
          id: userId,
        },
        fetchPolicy: 'no-cache',
      })
      .then((result) => {
        let user = result.data.getUser;
        if (user.avatar.startsWith('#')) {
          user.faceColor = user.avatar;
        } else {
          user.faceColor = '';
        }
        this._currentUser = user;
      });
  }

  getAllUsers(boardId, setMenus, setLoading, currentUserId) {
    // TODO: for user signup, we should use the subscribe@graphql
    if (this._teamUsers.length != 0) {
      this.fetchBoardData(boardId, setMenus, setLoading);
      return
    };
    this._apolloClient
      .query({
        query: gql(listUsers),
        variables: {
          limit: 10000,
        },
        fetchPolicy: 'no-cache', // "cache-and-network"
      })
      .then((result) => {
        let teamUsers = result.data.listUsers.items;
        this._teamUsers = []
        teamUsers.map((user) => {
          if (user.avatar.startsWith('#')) {
            user.faceColor = user.avatar;
          } else {
            user.faceColor = '';
          }

          if (currentUserId === user.id) {
            this._currentUser = user;
          }
          this._teamUsers.push(user);
          this._cacheUsers[user.id] = user;
        });

        this.fetchBoardData(boardId, setMenus, setLoading);
      });
  }

  getListUsers() {
    return this._teamUsers.slice();
  }

  getSearchUserList() {
    let users = this._searchUsers[this._currentBoardId];
    let searchList = []
    for (let key in users) {
      searchList.push(users[key])
    }

    return searchList
  }

  filterTeamUsers(filterValue) {
    let users = this._teamUsers.slice();
    if (filterValue) {
      let userNameLow = filterValue.toLowerCase();
      let filterUsers = users.filter((user) => {
        if (
          (user.fname && user.fname.toLowerCase().indexOf(userNameLow) !== -1) ||
          (user.lname && user.lname.toLowerCase().indexOf(userNameLow)) !== -1
        ) {
          return user;
        }
      });

      return filterUsers;
    } else {
      return users;
    }
  }

  getSize() {
    return this._rowData[this._currentBoardId].length;
  }

  getObjectAt(rowKey) {
    return this._rowData[this._currentBoardId][rowKey];
  }

  getColumn(columnKey) {
    return this._columns[this._currentBoardId].find((column) => column.columnKey === columnKey);
  }

  getRowData() {
    return this._rowData[this._currentBoardId];
  }

  setObjectAt(rowKey, columnKey, value, type) {
    // skip the group row
    if (!rowKey || !columnKey) return;

    let column = this._columns[this._currentBoardId].find((column) => column.columnKey === columnKey);

    let newValue;
    if (column.columnComponentType === PEOPLE) {
      if (value && value.length > 0) {
        value.map((user, i) => {
          if (i === 0) {
            newValue = user.id;
          } else {
            newValue = newValue + ',' + user.id;
          }
        });
      } else {
        newValue = null;
      }
    } else {
      if (value) {
        if (value instanceof String) newValue = value.trim() === '' ? null : value.trim();
        else newValue = value;
      } else {
        newValue = null;
      }
    }

    let dataId = this._rowColumnData[this._currentBoardId][rowKey][columnKey];
    if (dataId) {
      this.updateCellData(rowKey, columnKey, dataId, newValue, column.columnComponentType, value);
    } else {
      this.createCellData(rowKey, columnKey, newValue, column.columnComponentType, value);
    }
  }

  updateCellData(rowKey, columnKey, dataId, value, columnComponentType, specialValue) {
    let origValue = this._rowData[this._currentBoardId][rowKey][columnKey];
    this._apolloClient
      .mutate({
        mutation: gql(updateData),
        variables: {
          input: {
            id: dataId,
            columnID: columnKey,
            rowID: rowKey,
            value: value,
          },
        },
        optimisticResponse: {
          __typename: 'Mutation',
          updateData: {
            id: dataId,
            __typename: 'Data',
            columnID: columnKey,
            rowID: rowKey,
            value: value,
          },
        },
      })
      .then((result) => {})
      .catch((error) => {
        this._rowData[this._currentBoardId][rowKey][columnKey] = origValue;
        this.runCallbacks();
        console.log(error);
      });

    if (columnComponentType === PEOPLE) {
      this._rowData[this._currentBoardId][rowKey][columnKey] = specialValue;
    } else {
      this._rowData[this._currentBoardId][rowKey][columnKey] = value;
    }

    this.runCallbacks();
  }

  getGroups() {
    return this._groups[this._currentBoardId];
  }

  getSubRows(rowKey, subRowKeys) {
    if (this._subRows[this._currentBoardId][rowKey]) {
      if (subRowKeys && subRowKeys.length > 0) {
        if (this._subRows[this._currentBoardId][rowKey].rows) {
          let rows = [];
          this._subRows[this._currentBoardId][rowKey].rows.map((row) => {
            if (subRowKeys.indexOf(row.id) !== -1) {
              rows.push(row);
            }
          });
          return rows;
        } else {
          return [];
        }
      } else {
        return this._subRows[this._currentBoardId][rowKey].rows || [];
      }
    }

    return [];
  }

  getSubRowData() {
    return this._subRows[this._currentBoardId];
  }

  isSubRowExpanded(rowKey) {
    if (this._subRows[this._currentBoardId][rowKey]) return this._subRows[this._currentBoardId][rowKey].isExpanded;
    return false;
  }

  addNewSubSection(groupKey, parentRowKey, newItem) {
    // 检查是否已有子项
    if (this._subRows[this._currentBoardId][parentRowKey]) {
      this._subRows[this._currentBoardId][parentRowKey].isExpanded = true
      this.runCallbacks()
      return
    }

    let rank = this.getCreateRowRank(parentRowKey, groupKey);
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
            deleteFlag: false,
          },
        },
      })
      .then((result) => {
        let row = result.data.createRow;
        this._rowData[this._currentBoardId][row.id] = {};
        this._rowColumnData[this._currentBoardId][row.id] = {};
        let subColumns = this._columns[this._currentBoardId].filter((column) => column.level !== 0);
        if (subColumns.length > 0) {
          for (var i = 0; i < this._columns[this._currentBoardId].length; i++) {
            const column = this._columns[this._currentBoardId][i];
            if (column.level === 0 || column.name === ColumnType.ROWACTION || column.name === ColumnType.ROWSELECT)
              continue;
            if (column.isTitle) {
              this.createCellData(row.id, column.columnKey, newItem);
            } else {
              this.createCellData(row.id, column.columnKey, null);
            }
          }
          // 添加子项
          this._subRows[this._currentBoardId][parentRowKey] = {rows: [row], isExpanded: true};
        } else {
          let name = '子项描述';
          this.createColumn(false, ColumnType.ROWACTION, true, 1, ColumnType.ROWACTION, null, true, String(rankBlock));
          this.createColumn(
            false,
            ColumnType.ROWSELECT,
            true,
            1,
            ColumnType.ROWACTION,
            null,
            true,
            String(rankBlock * 2)
          );
          this.createColumn(true, name, true, 1, ColumnType.EDITBOX, 'TEXT', true, String(rankBlock * 3));
          // 添加子项
          this._subRows[this._currentBoardId][parentRowKey] = {rows: [row], isExpanded: true};
          this.runCallbacks();
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
            deleteFlag: false,
          },
        },
      })
      .then((result) => {
        let column = result.data.createColumn;
        this.createColumnBoard(
          column.id,
          name,
          fixed,
          level,
          columntype,
          columnComponentType,
          isSubColumn,
          rank,
          isTitle
        );
        //refresh
        // this.runCallbacks();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  toggleExpandSubRows(rowKey) {
    this._subRows[this._currentBoardId][rowKey].isExpanded = !this.isSubRowExpanded(rowKey);
    //refresh
    this.runCallbacks();
  }

  getCreateGroupRank(groupKey, currentGroup, currentIndex) {
    let rank;
    if (this._groups[this._currentBoardId].length > 0) {
      if (groupKey) {
        // 中间插入
        let currentRank = Number(currentGroup.rank);
        let preRank;
        if (currentIndex === 0) {
          preRank = 0;
        } else {
          preRank = Number(this._groups[this._currentBoardId][currentIndex - 1].rank);
        }

        rank = preRank + (currentRank - preRank) / 2;
      } else {
        // 插入最上面
        rank = Number(this._groups[this._currentBoardId][this._groups[this._currentBoardId].length - 1].rank) + rankBlock;
      }
    } else {
      rank = rankBlock;
    }

    return String(rank);
  }

  addNewGroup(groupName, groupKey) {
    let currentGroup;
    let rank;
    let index;
    if (groupKey) {
      index = this._groups[this._currentBoardId].findIndex((group) => group.groupKey === groupKey);
      if (index < 0) {
        return null;
      }
      currentGroup = this._groups[this._currentBoardId][index];
      // 中间插入分区的rank计算暂时没有完美方案
      rank = this.getCreateGroupRank(groupKey, currentGroup, index);
    } else {
      rank = this.getCreateGroupRank(groupKey);
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
            color: getRandomColor(),
          },
        },
      })
      .then((result) => {
        let group = result.data.createGroup;
        group.rows = [];
        if (groupKey) {
          this._groups[this._currentBoardId].splice(index, 1, group);
          this._groups[this._currentBoardId].splice(index + 1, 0, currentGroup);
        } else {
          this._groups[this._currentBoardId].push(group);
        }
        this.runCallbacks();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  undoRemoveGroup(groupIndex, group) {
    this._apolloClient
      .mutate({
        mutation: gql(updateGroup),
        variables: {
          input: {
            id: group.id,
            deleteFlag: false,
          },
        },
      })
      .then((result) => {
        this._groups[this._currentBoardId].splice(groupIndex, 0, group);

        //refresh
        this.runCallbacks();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  removeGroup(groupKey) {
    let index = this._groups[this._currentBoardId].findIndex((column) => column.groupKey === groupKey);
    if (index < 0) {
      return;
    }
    let group = this._groups[this._currentBoardId][index];
    this._apolloClient
      .mutate({
        mutation: gql(updateGroup),
        variables: {
          input: {
            id: group.id,
            deleteFlag: true,
          },
        },
      })
      .then((result) => {
        this._groups[this._currentBoardId].splice(index, 1);

        this.runCallbacks();
      })
      .catch((error) => {
        console.log(error);
      });

    return index;
  }

  getGroupAt(groupKey) {
    let index = this._groups[this._currentBoardId].findIndex((column) => column.groupKey === groupKey);
    if (index < 0) {
      return null;
    }
    return this._groups[this._currentBoardId][index];
  }

  getColumns() {
    if (!this._columns[this._currentBoardId]) {
      return null;
    }
    return this._columns[this._currentBoardId];
  }

  addNewRow(groupKey, newItem) {
    let index = this._groups[this._currentBoardId].findIndex((group) => group.groupKey === groupKey);
    if (index < 0) {
      return;
    }
    let group = this._groups[this._currentBoardId][index];
    let rank = this.getCreateRowRank(null, groupKey);
    this._apolloClient
      .mutate({
        mutation: gql(createRow),
        variables: {
          input: {
            rank: rank,
            createdAt: new Date().toISOString(),
            groupID: group.id,
            creatorID: this._currentUser.id,
            deleteFlag: false,
          },
        },
      })
      .then((result) => {
        let row = result.data.createRow;
        this._rowData[this._currentBoardId][row.id] = {};
        this._rowColumnData[this._currentBoardId][row.id] = {};
        for (var i = 0; i < this._columns[this._currentBoardId].length; i++) {
          const column = this._columns[this._currentBoardId][i];
          if (column.level !== 0 || column.name === ColumnType.ROWACTION || column.name === ColumnType.ROWSELECT)
            continue;
          if (column.isTitle) {
            this.createCellData(row.id, column.columnKey, newItem);
          } else {
            this.createCellData(row.id, column.columnKey, null);
          }
        }
        let rows = this._groups[this._currentBoardId][index].rows;
        rows.push(row);
        //refresh
        this.runCallbacks();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  moveRow(sourceGroupKey, targetGroupKey, rowKey, oldSourceRow) {
    let sourceGroupIndex = this._groups[this._currentBoardId].findIndex((group) => group.groupKey === sourceGroupKey);
    let targetGroupIndex = this._groups[this._currentBoardId].findIndex((group) => group.groupKey === targetGroupKey);
    if (sourceGroupIndex < 0 || targetGroupIndex < 0) {
      return;
    }

    let sourceGroupRows = this._groups[this._currentBoardId][sourceGroupIndex].rows;
    let targetGroupRows = this._groups[this._currentBoardId][targetGroupIndex].rows;
    let sourceRowIndex = sourceGroupRows.findIndex((row) => row.id === rowKey);
    let sourceRow = sourceGroupRows[sourceRowIndex];
    let data = {};
    data.sourceRowIndex = sourceRowIndex;
    data.rank = sourceRow.rank;
    data.row = sourceRow;
    let rank = this.getCreateRowRank(null, targetGroupKey);
    this._apolloClient
      .mutate({
        mutation: gql(updateRow),
        variables: {
          input: {
            id: rowKey,
            groupID: targetGroupKey,
            rank: oldSourceRow ? oldSourceRow.rank : rank,
          },
        },
      })
      .then((result) => {
        sourceGroupRows.splice(sourceRowIndex, 1);

        // rowIndex 小于0 则为移动，否则为撤销移动
        if (!oldSourceRow) {
          targetGroupRows.push(sourceRow);
        } else {
          targetGroupRows.splice(oldSourceRow.sourceRowIndex, 0, oldSourceRow.row);
        }
        //refresh
        this.runCallbacks();
      })
      .catch((error) => {
        console.log(error);
      });

    return data;
  }

  addNewSubRow(groupID, rowKey, newItem) {
    let rows = this._subRows[this._currentBoardId][rowKey].rows;
    if (!rows) {
      rows = [];
      this._subRows[this._currentBoardId][rowKey].rows = rows;
    }
    let rank = this.getCreateRowRank(rowKey, groupID);
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
            deleteFlag: false,
          },
        },
      })
      .then((result) => {
        let row = result.data.createRow;
        this._rowData[this._currentBoardId][row.id] = {};
        this._rowColumnData[this._currentBoardId][row.id] = {};
        for (var i = 0; i < this._columns[this._currentBoardId].length; i++) {
          const column = this._columns[this._currentBoardId][i];
          if (column.level === 0 || column.name === ColumnType.ROWACTION || column.name === ColumnType.ROWSELECT)
            continue;
          if (column.isTitle) {
            this.createCellData(row.id, column.columnKey, newItem);
          } else {
            this.createCellData(row.id, column.columnKey, null);
          }
        }
        rows.push(row);
        //refresh
        this.runCallbacks();
      })
      .catch((error) => {
        console.log(error);
      });
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
            deleteFlag: false,
          },
        },
      })
      .then((result) => {
        let column = result.data.createColumn;
        this.createColumnBoard(column.id, newItem, false, level, ColumnType.EDITBOX, columnComponentType, false, null);
        //refresh
        this.runCallbacks();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  createColumnBoard(columnId, columnName, fixed, level, columnType, columnComponentType, isSubColumn, rank, isTitle) {
    let rankValue = rank ? rank : this.getCreateColumnRank(level);
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
            deleteFlag: false,
          },
        },
      })
      .then((result) => {
        let column = result.data.createColumnBoard;
        column.width = isTitle ? 360 : fixed && !isTitle ? 36 : 200;
        column.type = columnType;
        column.columnKey = columnId;
        column.name = columnName;
        column.columnComponentType = columnComponentType;
        this._columns[this._currentBoardId].push(column);
        this._columns[this._currentBoardId] = this.sortDataByRank(this._columns[this._currentBoardId]);

        // 无行数据时需要刷新
        if (Object.keys(this._rowThreadData[this._currentBoardId]).length === 0) {
          this.runCallbacks();
        } else {
          if (isSubColumn) {
            for (let key in this._rowData[this._currentBoardId]) {
              if (this._subRowKeys[this._currentBoardId].indexOf(key) !== -1) {
                this.createCellData(key, columnId, null);
              }
            }
          } else {
            for (let key in this._rowData[this._currentBoardId]) {
              if (this._subRowKeys[this._currentBoardId].indexOf(key) === -1) {
                this.createCellData(key, columnId, null);
              }
            }
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  createCellData(rowId, columnId, value, columnComponentType, specialValue) {
    this._apolloClient
      .mutate({
        mutation: gql(createData),
        variables: {
          input: {
            value: value,
            columnID: columnId,
            rowID: rowId,
          },
        },
        optimisticResponse: {
          __typename: 'Mutation',
          createData: {
            columnID: columnId,
            rowID: rowId,
            __typename: 'Data',
            value: value,
          },
        },
      })
      .then((result) => {
        let rowColumn = this._rowColumnData[this._currentBoardId][rowId];
        rowColumn[columnId] = result.data.createData.id;
      })
      .catch((error) => {
        let row = this._rowData[this._currentBoardId][rowId];
        row[columnId] = '';
        this.runCallbacks();
        console.log(error);
      });

    let row = this._rowData[this._currentBoardId][rowId];
    if (columnComponentType === PEOPLE) {
      row[columnId] = specialValue;
    } else {
      row[columnId] = value;
    }
    this.runCallbacks();
  }

  removeColumn(columnKey) {
    let index = this._columns[this._currentBoardId].findIndex((column) => column.columnKey === columnKey);
    if (index < 0) {
      return;
    }
    let column = this._columns[this._currentBoardId][index];
    this._apolloClient
      .mutate({
        mutation: gql(updateColumn),
        variables: {
          input: {
            id: columnKey,
            deleteFlag: true,
          },
        },
      })
      .then((result) => {
        this.removeColumnBoard(column.id, index, column);
        // //refresh
        // this.runCallbacks();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  removeColumnBoard(id, index, column) {
    this._apolloClient
      .mutate({
        mutation: gql(updateColumnBoard),
        variables: {
          input: {
            id: id,
            deleteFlag: true,
          },
        },
      })
      .then((result) => {})
      .catch((error) => {
        console.log(error);
        this._columns[this._currentBoardId].splice(index, 0, column);
        //refresh
        this.runCallbacks();
      });

    this._columns[this._currentBoardId].splice(index, 1);
    //refresh
    // this.runCallbacks();
    this._mainPageCallBack()
  }

  removeSubColumn(columnKey) {
    let index = this._subColumns.findIndex((column) => column.columnKey === columnKey);
    if (index < 0) {
      return;
    }
    this._subColumns.splice(index, 1);
    // push undo stack
    //refresh
    this.runCallbacks();
  }

  removeRow(groupKey, rowKey) {
    let groupIndex = this._groups[this._currentBoardId].findIndex((group) => group.groupKey === groupKey);
    if (groupIndex < 0) {
      return;
    }

    this._apolloClient
      .mutate({
        mutation: gql(updateRow),
        variables: {
          input: {
            id: rowKey,
            deleteFlag: true,
          },
        },
      })
      .then((result) => {
        let groupRows = this._groups[this._currentBoardId][groupIndex].rows;
        let rowIndex = groupRows.findIndex((row) => row.id === rowKey);
        groupRows.splice(rowIndex, 1);
        this.runCallbacks();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  removeRows(rowKeys) {
    rowKeys.forEach((rowKey) => {
      delete this._rowData[this._currentBoardId][rowKey];
    });
  }

  reorderColumn(columnAfter, columnKey) {
    if (columnAfter === columnKey) {
      return;
    }
    let index = this._columns[this._currentBoardId].findIndex((column) => column.columnKey === columnKey);
    if (index < 0) {
      return;
    }
    let columnToReorder = this._columns[this._currentBoardId][index];
    let rank;
    let insertIndex;
    if (columnAfter) {
      let insertIndex = this._columns[this._currentBoardId].findIndex((column) => column.columnKey === columnAfter);
      if (insertIndex <= 0) {
        return;
      }

      let preColumn = this._columns[this._currentBoardId][insertIndex];
      let nextColumn = this._columns[this._currentBoardId][insertIndex + 1];
      if (nextColumn) {
        rank = Number(preColumn.rank) + (Number(nextColumn.rank) - Number(preColumn.rank)) / 2;
      } else {
        rank = Number(preColumn.rank) + rankBlock;
      }
    } else if (index !== this._columns[this._currentBoardId].length - 1) {
      rank = Number(columnToReorder.rank) + rankBlock;
    }

    this._apolloClient
      .mutate({
        mutation: gql(updateColumnBoard),
        variables: {
          input: {
            id: columnToReorder.id,
            rank: String(rank),
          },
        },
      })
      .then((result) => {
        let column = result.data.updateColumnBoard;
        columnToReorder.rank = column.rank;
        if (columnAfter) {
          this._columns[this._currentBoardId].splice(index, 1);
          this._columns[this._currentBoardId].splice(insertIndex, 0, columnToReorder);
        } else if (index !== this._columns[this._currentBoardId].length - 1) {
          this._columns[this._currentBoardId].splice(index, 1);
          this._columns[this._currentBoardId].push(columnToReorder);
        }

        //refresh
        this.runCallbacks();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  reorderRow(oldGroupKey, rowKey, newGroupKey, rowAfter) {
    let oldGroup = this._groups[this._currentBoardId].find((group) => group.groupKey === oldGroupKey);
    if (!oldGroup) {
      return;
    }

    let newGroup = this._groups[this._currentBoardId].find((group) => group.groupKey === newGroupKey);
    if (!newGroup) {
      return;
    }

    let newIndex = newGroup.rows.findIndex((row) => row.id === rowAfter);
    let rank;
    if (newIndex === -1) {
      // 分区无数据
      newIndex = 0;
      rank = rankBlock;
    } else {
      // 分区有数据
      let preRow = newGroup.rows[newIndex];
      let nextRow = newGroup.rows[newIndex + 1];
      if (nextRow) {
        rank = Number(preRow.rank) + (Number(nextRow.rank) - Number(preRow.rank)) / 2;
      } else {
        rank = Number(preRow.rank) + rankBlock;
      }
    }

    this._apolloClient
      .mutate({
        mutation: gql(updateRow),
        variables: {
          input: {
            id: rowKey,
            groupID: newGroupKey,
            rank: String(rank),
          },
        },
      })
      .then((result) => {
        // 去除原行数据
        let oldIndex = oldGroup.rows.findIndex((row) => row.id === rowKey);
        let row = oldGroup.rows[oldIndex];
        oldGroup.rows.splice(oldIndex, 1);

        newGroup.rows.splice(newIndex, 0, result.data.updateRow);

        //refresh
        this.runCallbacks();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  setGroupData(groupData) {
    let group = this._groups[this._currentBoardId].find((group) => group.groupKey === groupData.groupKey);

    if (group) {
      let name = groupData.name ? groupData.name : group.name;
      let color = groupData.color ? groupData.color : group.color;
      this._apolloClient
        .mutate({
          mutation: gql(updateGroup),
          variables: {
            input: {
              id: group.groupKey,
              name: name,
              color: color,
            },
          },
        })
        .then((result) => {
          group.name = name;
          group.color = color;
          this.runCallbacks();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  changeGroupCollapseState(groupKey, isGroupCollapsed) {
    // 都有值
    if (groupKey && null !== isGroupCollapsed && undefined !== isGroupCollapsed) {
      let group = this._groups[this._currentBoardId].find((group) => group.groupKey == groupKey);
      this.updateGroupCollapsed(groupKey, isGroupCollapsed, group);
    }
    // key无值，折叠状态有值
    else if (!groupKey && null !== isGroupCollapsed && undefined !== isGroupCollapsed) {
      for (let i = 0; i < this._groups[this._currentBoardId].length; i++) {
        this.updateGroupCollapsed(
          this._groups[this._currentBoardId][i].groupKey,
          isGroupCollapsed,
          this._groups[this._currentBoardId][i]
        );
      }
    }
    // key有值，折叠状态无值
    else if (groupKey && (null === isGroupCollapsed || undefined === isGroupCollapsed)) {
      let group = this._groups[this._currentBoardId].find((group) => group.groupKey == groupKey);
      this.updateGroupCollapsed(groupKey, !group.isCollapsed, group);
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
          },
        },
      })
      .then((result) => {
        group.isCollapsed = isCollapsed;
        this.runCallbacks();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  setColumnData(columnKey, columnData) {
    let column = this._columns[this._currentBoardId].find((column) => column.columnKey === columnKey);
    if (column) {
      let columnOldValue = {};
      let updateInput = {};
      for (let key in columnData) {
        columnOldValue[key] = column[key];
        updateInput[key] = columnData[key];
      }
      updateInput.id = columnKey;
      this._apolloClient
        .mutate({
          mutation: gql(updateColumn),
          variables: {
            input: updateInput,
          },
        })
        .then((result) => {})
        .catch((error) => {
          console.log(error, columnOldValue);
          for (let key in columnData) {
            column[key] = columnOldValue[key];
          }
          this.runCallbacks();
        });

      for (let key in columnData) {
        column[key] = columnData[key];
      }
      this.runCallbacks();
    }
  }

  sortDataByCreatedAt(arr) {
    if (arr && arr.length > 0) {
      arr.sort(function (a, b) {
        let m = a.createdAt;
        let n = b.createdAt;
        if (m < n) return 1;
        if (m > n) return -1;
        return 0;
      });
    }

    return arr;
  }

  getRowThreadData(rowId, setUpdateInfo) {
    let boardId = this._currentBoardId;
    if (Object.keys(this._rowThreadData[this._currentBoardId]).indexOf(rowId) !== -1) {
      setUpdateInfo(this._rowThreadData[this._currentBoardId][rowId]);
    } else {
      this._apolloClient
        .query({
          query: gql(listThreadOnRows),
          variables: {
            limit: 10000,
            filter: {
              rowID: {
                eq: rowId,
              },
            },
          },
          fetchPolicy: 'no-cache',
        })
        .then((result) => {
          const items = result.data.listThreadOnRows.items;
          let threads = this.sortDataByCreatedAt(items);
          this._rowThreadData[this._currentBoardId][rowId] = threads;
          this.dealNotReadNotifications(rowId, boardId, threads, setUpdateInfo);
        });
    }
  }

  createThreadData(createData, setUpdateInfo, notifications) {
    let boardId = this._currentBoardId;
    this._apolloClient
      .mutate({
        mutation: gql(createThreadOnRow),
        variables: {
          input: createData,
        },
      })
      .then((result) => {
        let threadData = result.data.createThreadOnRow;
        let threads = this._rowThreadData[this._currentBoardId][createData.rowID];
        let size;
        if (threads && threads.length > 0) {
          size = this._rowThreadSize[boardId][createData.rowID] + 1;
          threads.unshift(threadData);
        } else {
          size = 1;
          threads = [];
          threads.push(threadData);
        }

        this._rowThreadSize[boardId][createData.rowID] = size;
        setUpdateInfo(threads);

        if (notifications && notifications.length > 0) {
          notifications.map((notification) => {
            notification.boardID = boardId;
            notification.threadOnRowID = threadData.id;

            // 创建通知
            this.createNotification(notification);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateThreadData(updateData, setUpdateInfo) {
    this._apolloClient
      .mutate({
        mutation: gql(updateThreadOnRow),
        variables: {
          input: updateData,
        },
      })
      .then((result) => {
        let threadData = result.data.updateThreadOnRow;
        let threads = this._rowThreadData[this._currentBoardId][threadData.rowID];

        let threadIndex = threads.findIndex((thread) => thread.id === threadData.id);
        threads[threadIndex] = threadData;

        setUpdateInfo(threads);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getRowThreadSize(rowId) {
    return this._rowThreadSize[this._currentBoardId][rowId];
  }

  createReplyData(createData, rowId, setUpdateInfo) {
    this._apolloClient
      .mutate({
        mutation: gql(createReplyOnThread),
        variables: {
          input: createData,
        },
      })
      .then((result) => {
        let replyData = result.data.createReplyOnThread;
        let threads = this._rowThreadData[this._currentBoardId][rowId];
        let thread = threads.find((thread) => thread.id === replyData.threadID);
        let replyList = thread.repliesByDate.items;
        replyList.push(replyData);

        setUpdateInfo(threads);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateReplyData(updateData, rowId, setUpdateInfo) {
    this._apolloClient
      .mutate({
        mutation: gql(updateReplyOnThread),
        variables: {
          input: updateData,
        },
      })
      .then((result) => {
        let replyData = result.data.updateReplyOnThread;
        let threads = this._rowThreadData[this._currentBoardId][rowId];

        let thread = threads.find((thread) => thread.id === replyData.threadID);
        let replyList = thread.repliesByDate.items;
        let replyIndex = replyList.findIndex((reply) => reply.id === replyData.id);
        replyList[replyIndex] = replyData;

        setUpdateInfo(threads);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateThreadOrReplySeen(threadId, replyId, seenUserIds, rowId) {
    if (threadId) {
      this._apolloClient
        .mutate({
          mutation: gql(updateThreadOnRow),
          variables: {
            input: {
              id: threadId,
              seenByUsersID: seenUserIds,
            },
          },
        })
        .then((result) => {
          let threadData = result.data.updateThreadOnRow;
          let threads = this._rowThreadData[this._currentBoardId][rowId];

          let threadIndex = threads.findIndex((thread) => thread.id === threadData.id);
          threads[threadIndex] = threadData;
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      this._apolloClient
        .mutate({
          mutation: gql(updateReplyOnThread),
          variables: {
            input: {
              id: replyId,
              seenByUsersID: seenUserIds,
            },
          },
        })
        .then((result) => {
          let replyData = result.data.updateReplyOnThread;
          let threads = this._rowThreadData[this._currentBoardId][rowId];

          let thread = threads.find((thread) => thread.id === replyData.threadID);
          let replyList = thread.repliesByDate.items;
          let replyIndex = replyList.findIndex((reply) => reply.id === replyData.id);
          replyList[replyIndex] = replyData;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  getNotificationsByRowId(rowId) {
    let notReadNotifications = [];
    let notifications = this._rowNotification[this._currentBoardId][rowId];
    if (notifications && notifications.length > 0) {
      notifications.map((notification) => {
        if (notification.receiverID === this._currentUser.id && !notification.seenflag) {
          notReadNotifications.push(notification);
        }
      });
    }

    return notReadNotifications;
  }

  dealNotReadNotifications(rowId, boardId, threads, setUpdateInfo) {
    let notifications = this._rowNotification[this._currentBoardId][rowId];
    let notificationsSlice = [];
    let boardNotReadCount = this._boardNotifications[boardId][rowId];
    if (notifications && notifications.length > 0) {
      for (let i = 0; i < notifications.length; i++) {
        let notification = notifications[i];

        if (notification.receiverID === this._currentUser.id && !notification.seenflag) {
          boardNotReadCount--;
          notification.seenflag = true;
          notificationsSlice.push(notification);
          this.updateRowReadMessageStatus(notification.id);
        } else {
          notificationsSlice.push(notification);
        }
      }
    }
    this._boardNotifications[boardId][rowId] = boardNotReadCount;
    this._rowNotification[this._currentBoardId][rowId] = notificationsSlice;

    // 刷新工作板和行通知
    this._mainPageCallBack();
    // 刷新动态数据
    setUpdateInfo(threads);
  }

  createNotification(createData) {
    this._apolloClient
      .mutate({
        mutation: gql(createNotification),
        variables: {
          input: createData,
        },
      })
      .then((result) => {})
      .catch((error) => {
        console.log(error);
      });
  }

  //修改行对象的评论是否已读
  updateRowReadMessageStatus(id) {
    this._apolloClient
      .mutate({
        mutation: gql(updateNotification),
        variables: {
          input: {
            id: id,
            seenflag: true,
          },
        },
      })
      .then((result) => {})
      .catch((error) => {
        console.log(error);
      });
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
    const newCallback = {id, fun: callback};

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
}
export default MainTableDataStore;
