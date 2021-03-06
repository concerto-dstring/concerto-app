'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import except from 'except';
import DataPropTypes from './DataPropTypes';
import {DataViewWrapper} from './DataViewWrapper';
import {RowType} from './MainTableType';
import FixedDataTable from '../FixedDataTable';

const TableContext = React.createContext();
const MainPageContext = React.createContext();
const DataVersionContext = React.createContext({
  data: null,
  version: 0,
  filterInputValue: null,
});

function DataContext(Wrapped) {
  class ContextClass extends React.Component {
    constructor(props) {
      super(props);

      this.refresh = this.refresh.bind(this);
      const data = this.props.data;
      data.setCallback(this.refresh, 'data');

      this.state = {
        data: props.data,
        version: 0,
        filterInputValue: props.filterInputValue,
      };
    }

    componentWillReceiveProps(nextProps) {
      // data比较时需要去除apolloClient否则报错
      if (
        JSON.stringify(this.getData(nextProps.data)) !== JSON.stringify(this.getData(this.state.data)) ||
        this.state.filterInputValue !== nextProps.filterInputValue
      ) {
        this.setState({
          data: nextProps.data,
          filterInputValue: nextProps.filterInputValue,
        });
      }
    }

    getData(data) {
      let newData = {};
      for (let key in data) {
        if (key === '_dataset') {
          let dataset = Object.assign({}, data[key]);
          dataset._apolloClient = null;
          newData[key] = dataset;
        } else {
          newData[key] = data[key];
        }
      }
      return newData;
    }

    // Force a refresh or the page doesn't re-render
    //
    // The name of the state variable is irrelevant, it will simply trigger
    // an update event that is propagated into the cells
    refresh() {
      this.setState({
        version: this.state.version + 1,
      });
    }

    render() {
      return (
        <DataVersionContext.Provider value={this.state}>
          <Wrapped
            rowsCount={this.state.data.getSize()}
            rowHeightGetter={this.state.data.getRowHeight}
            subRowHeightGetter={this.state.data.getSubRowHeight}
            rowTypeGetter={this.state.data.getRowType}
            rowKeyGetter={this.state.data.getRowKey}
            subRowTotalHeightGetter={this.state.data.getSubRowTotalHeight}
            subRowsGetter={this.state.data.getSubRows}
            {...this.props}
          />
        </DataVersionContext.Provider>
      );
    }
  }

  ContextClass.propTypes = {
    data: DataPropTypes.ContextDataListStore,
  };

  return ContextClass;
}

function AddFilter(TableComponent) {
  class FilterTable extends React.Component {
    constructor(props) {
      super(props);
      this.refresh = this.refresh.bind(this);
      this.state = {
        version: 0,
      };
    }

    refresh() {
      this.setState({
        version: this.state.version + 1,
      });
    }

    _getDataWrapper(indexMap = null, subRowKeys) {
      const filteredData = new DataViewWrapper(this.props.data, indexMap, subRowKeys);
      filteredData.setCallback(this.refresh, 'filter');
      return filteredData;
    }

    filter() {
      // Get and prep filters
      // todo add filter here
      const filters = {};
      Object.keys(this.props.filters)
        .filter((key) => this.props.filters[key].length > 0)
        .forEach((key) => {
          filters[key] = this.props.filters[key].toLowerCase();
          return null;
        });

      const match = (haystack, needle) => haystack.toLowerCase().indexOf(needle) !== -1;

      const dataset = this.props.data;

      let filteredIndexes = [];
      filteredIndexes.push({rowType: RowType.TITLE, groupKey: '', rowKey: ''});

      if (Object.keys(filters).length > 0) {
        for (let i = 0; i < dataset.getGroups().length; i++) {
          let group = dataset.getGroups()[i];
          let addgroup = false;
          for (let j = 0; j < group.rows.length; j++) {
            const row = this.props.data.getObjectAt(j);
            if (row === null) {
              filteredIndexes.push(j);
              if (!addgroup) {
                addgroup = true;
                filteredIndexes.push({rowType: RowType.HEADER, groupKey: group.groupKey, rowKey: ''});
              }
              continue;
            }
            let found = true;
            // Loop through all the filters and check if there's a match
            const keys = Object.keys(filters);
            for (const key of keys) {
              const value = row[key];
              if (!match(value, filters[key])) {
                found = false;
                break;
              }
            }
            if (found) {
              if (!addgroup) {
                addgroup = true;
                filteredIndexes.push({rowType: RowType.HEADER, groupKey: group.groupKey, rowKey: ''});
              }
            }
          }
          if (addgroup) {
            filteredIndexes.push({rowType: RowType.ADDROW, groupKey: group.groupKey, rowKey: ''});
            filteredIndexes.push({rowType: RowType.FOOTER, groupKey: group.groupKey, rowKey: ''});
          }
        }
      } else {
        for (let i = dataset.getGroups().length - 1; i >= 0; i--) {
          let group = dataset.getGroups()[i];
          filteredIndexes.push({rowType: RowType.HEADER, groupKey: group.groupKey, rowKey: ''});
          for (let j = 0; j < group.rows.length; j++) {
            filteredIndexes.push({rowType: RowType.ROW, groupKey: group.groupKey, rowKey: group.rows[j].id});
          }
          filteredIndexes.push({rowType: RowType.ADDROW, groupKey: group.groupKey, rowKey: ''});
          filteredIndexes.push({rowType: RowType.FOOTER, groupKey: group.groupKey, rowKey: ''});
        }
      }

      let filteredIndexesMap = [];
      let subRowKeys = [];
      if (this.props.filterInputValue) {
        let filterData = this.filterTableData(dataset, this.props.filterInputValue.toLowerCase());
        subRowKeys = filterData.subRowKeys;
        // 过滤后无数据
        if (filterData.rowKeys) {
          for (let i = 0; i < filteredIndexes.length; i++) {
            // 不显示分区中不包含该Index并且如果rowKey不为空需要在rowKeys中
            if (filterData.notGroupKeys.indexOf(filteredIndexes[i].groupKey) === -1) {
              if (filteredIndexes[i].rowKey === '') {
                filteredIndexesMap.push(filteredIndexes[i]);
              } else if (filterData.rowKeys.indexOf(filteredIndexes[i].rowKey) !== -1) {
                filteredIndexesMap.push(filteredIndexes[i]);
              }
            }
          }
        }
      } else {
        filteredIndexesMap = filteredIndexes;
      }

      return this._getDataWrapper(filteredIndexesMap, subRowKeys);
    }

    /**
     * 过滤数据（包含子项）
     * @param {*} value
     */
    filterTableData(dataset, value) {
      let filterData = {};
      // 过滤后的行
      filterData.rowKeys = [];

      // 过滤后的子项行
      filterData.subRowKeys = [];

      // 不需要显示的分区
      filterData.notGroupKeys = [];

      if (value) {
        let filterColumns = [];
        // 检查过滤类型是否有值
        if (this.props.filterType) {
          filterColumns = dataset.getColumns().filter((column) => column.columnComponentType === this.props.filterType);
        } else {
          // 先过滤非日期的columnKey(日期列加入到过滤)
          filterColumns = dataset
            .getColumns()
            .filter((column) => column.columnComponentType !== '');
        }

        let filterColumnKeys = [];
        if (filterColumns) {
          filterColumns.map((column) => {
            if (filterColumnKeys.indexOf(column.columnKey) === -1) {
              filterColumnKeys.push(column.columnKey);
            }
          });

          // 遍历行数据
          for (let key in dataset.getRowData()) {
            let row = dataset.getRowData()[key];
            for (let subKey in row) {
              // 如果此列的值在过滤范围内再判断是否包含值
              if (!row[subKey]) continue;

              // 单元格数据为数组--人员
              if (row[subKey] instanceof Array) {
                let users = row[subKey];
                users.map((user) => {
                  if (
                    user.username &&
                    user.username.toLowerCase().indexOf(value) !== -1 &&
                    filterData.rowKeys.indexOf(key) === -1
                  ) {
                    filterData.rowKeys.push(key);
                    return;
                  }
                });
              }
              // 单元格数据为对象
              else if (row[subKey] instanceof Object) {
              } else {
                if (
                  filterColumnKeys.indexOf(subKey) !== -1 &&
                  String(row[subKey]).toLowerCase().indexOf(value) !== -1 &&
                  filterData.rowKeys.indexOf(key) === -1
                ) {
                  filterData.rowKeys.push(key);
                  break;
                }
              }
            }
          }

          // 判断行数据是否为子项数据,若为子项行数据则需要带出父数据
          for (let rowKey in dataset.getSubRowData()) {
            let rows = dataset.getSubRowData()[rowKey].rows;
            if (rows) {
              rows.map((row) => {
                if (filterData.rowKeys.indexOf(row.id) !== -1) {
                  filterData.subRowKeys.push(row.id);
                  if (filterData.rowKeys.indexOf(rowKey) === -1) {
                    filterData.rowKeys.push(rowKey);
                  }
                }
              });
            }
          }

          dataset.getGroups().map((group) => {
            if (group.rows) {
              let count = 0; // 计算分区里面的行有多少可以显示
              for (let i = 0; i < group.rows.length; i++) {
                // 如果分区的行都不在过滤后的行里面则该分区不显示
                if (filterData.rowKeys.indexOf(group.rows[i].id) !== -1) {
                  count++;
                }
              }
              if (count === 0) {
                filterData.notGroupKeys.push(group.groupKey);
              }
            } else {
              filterData.notGroupKeys.push(group.groupKey);
            }
          });
        }
      }

      return filterData;
    }

    render() {
      const propTypes = {
        data: DataPropTypes.ContextDataListStore,
        children: PropTypes.node,
        filters: DataPropTypes.FilterObject,
      };
      const other = except(this.props, Object.keys(propTypes));
      const filteredData = this.filter();
      return (
        <TableComponent
          data={filteredData}
          onRowReorderEndCallback={filteredData.reorderRow}
          onNewRowAddCallback={filteredData.addNewRow}
          onNewGroupAddCallback={filteredData.addNewGroup}
          {...other}
        >
          {this.props.children}
        </TableComponent>
      );
    }
  }
  return FilterTable;
}

// Export both HOC and the PropType for the data if required
export {DataVersionContext, DataContext, AddFilter, TableContext, MainPageContext};
