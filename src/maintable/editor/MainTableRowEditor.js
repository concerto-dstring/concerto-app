/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule FixedDataTableCellGroup
 * @typechecks
 */

'use strict';

import FixedDataTableCellDefault from './FixedDataTableCellDefault'
import React from 'react';

import './MainTableRowEditor.less';

class MainTableRowEditor extends React.Component {
 
  componentWillMount() {
    this._initialRender = true;
  }

  componentDidMount() {
    this._initialRender = false;
  }

  render() /*object*/ {
    var props = this.props;
    var columns = props.columns;
    var cells = new Array(columns.length);

    var columnProps = columns[0].props;
    var cellTemplate = columns[0].template;
    var key = columnProps.columnKey || 'cell_' + i;
    cells[0] = <div className="column_header">
          {this._renderCell(
            props.rowIndex,
            columnProps,
            cellTemplate,
            key,
            false
          )}
        </div>; 

    for (var i = 1, j = columns.length; i < j; i++) {
        var columnProps = columns[i].props;
        var cellTemplate = columns[i].template;
        var key = columnProps.columnKey || 'cell_' + i;
        cells[i] = this._renderCell(
            props.rowIndex,
            columnProps,
            cellTemplate,
            key
        ); 
    }

    return (
      <div>
        {cells}
      </div>
    );
  }

  _renderCell = (
    /*number*/ rowIndex,
    /*number*/ height,
    /*object*/ cellTemplate,
    /*string*/ columnKey,
    /*bool*/ showLabel = true,
  ) /*object*/ => {

    let column = this.props.data.getColumn(columnKey);

    var cellProps = {
        columnKey,
        height,
        width,
        onCellEdit: null,
        onCellEditEnd: null,
        container: this.props.container,
    };

    if (rowIndex >= 0) {
        cellProps.rowIndex = rowIndex;
    }

    let content;
    if (React.isValidElement(cellTemplate)) {
      content = React.cloneElement(cellTemplate, cellProps);
    } else if (typeof cellTemplate === 'function') {
      content = cellTemplate(cellProps);
    } else {
      content = (
        <FixedDataTableCellDefault>
          {...cellProps}>
          {cellTemplate}
        </FixedDataTableCellDefault>
      );
    } 

    return (
      <div className="cell_wrapper" >
          {showLabel && <div className="column_title">{column.name}</div>}
          <div className="column_cell_component_wrapper">{content}</div>
      </div>      
    );
  }
}

export default MainTableRowEditor;
