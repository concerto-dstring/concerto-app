"use strict";

import React from 'react';
import PropTypes from 'prop-types';
import except from 'except';
import DataPropTypes from './DataPropTypes';
import { DataViewWrapper } from './DataViewWrapper';
import { RowType } from './MainTableType';

const TableContext = React.createContext();

const DataVersionContext = React.createContext({
  data: null,
  version: 0,
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
      };
    }

    componentWillReceiveProps(nextProps) {
      if (JSON.stringify(nextProps.data) !== JSON.stringify(this.state.data)) {
        this.setState({
          data: nextProps.data,
        });
      }
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
          rowTypeGetter={this.state.data.getRowType}
          rowKeyGetter={this.state.data.getRowKey}
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

    _getDataWrapper(indexMap = null) {
      const filteredData = new DataViewWrapper(this.props.dataset, indexMap);
      filteredData.setCallback(this.refresh, 'filter');
      return filteredData;
    }

    filter() {
      // Get and prep filters
      const filters = {};
      Object
        .keys(this.props.filters)
        .filter(key => this.props.filters[key].length > 0)
        .forEach((key) => {
          filters[key] = this.props.filters[key].toLowerCase();
          return (null);
        });

      const match = (haystack, needle) =>
        haystack.toLowerCase().indexOf(needle) !== -1;

      const dataset = this.props.dataset;

      let filteredIndexes = [];
      if (Object.keys(filters).length > 0) {
        for(let i = 0; i < dataset.getGroups().length; i ++) {
          let group = dataset.getGroups()[i];
          let addgroup = false;
          for (let j = 0; j < group.rows.length; j ++) {
            const row = this.props.data.getObjectAt(j);
            if (row === null) {
              filteredIndexes.push(j);
              if (!addgroup) {
                addgroup = true;
                filteredIndexes.push({rowType:RowType.HEADER, groupKey:group.groupKey, rowKey:''});
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
                filteredIndexes.push({rowType:RowType.HEADER, groupKey:group.groupKey, rowKey:''});
              }
            }
          }
          if (addgroup) {
            filteredIndexes.push({rowType:RowType.ADDROW, groupKey:group.groupKey, rowKey:''});
            filteredIndexes.push({rowType:RowType.FOOTER, groupKey:group.groupKey, rowKey:''});
          }
        }
      } else {
        for(let i = dataset.getGroups().length - 1; i >=0;  i --) {
            let group = dataset.getGroups()[i];
            filteredIndexes.push({rowType:RowType.HEADER, groupKey:group.groupKey, rowKey:''});
            for (let j = 0; j < group.rows.length; j ++) {
                filteredIndexes.push({rowType:RowType.ROW, groupKey:group.groupKey, rowKey:group.rows[j]});
            }
            filteredIndexes.push({rowType:RowType.ADDROW, groupKey:group.groupKey, rowKey:''});
            filteredIndexes.push({rowType:RowType.FOOTER, groupKey:group.groupKey, rowKey:''});
        }
      }
      return (this._getDataWrapper(filteredIndexes));
    }

    render() {
      const propTypes = {
        data: DataPropTypes.ContextDataListStore,
        children: PropTypes.node,
        filters: DataPropTypes.FilterObject
      };
      const other = except(this.props, Object.keys(propTypes));
      const filteredData = this.filter();
      return (
        <TableComponent
          data={filteredData}
          onRowReorderEndCallback={filteredData.reorderRow}
          onNewRowAddCallback={filteredData.addNewRow}
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
export {
  DataVersionContext,
  DataContext,
  AddFilter,
  TableContext
};
