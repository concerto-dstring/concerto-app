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

import FixedDataTableCellDefault from '../FixedDataTableCellDefault';
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
    const props = this.props;
    const { rowIndex, columns } = props;

    if (columns.length === 0) {
      return;
    }

    let cells = new Array(columns.length);

    for(let i = 0; i < columns.length; i++){
      cells[i] = this._renderCell(
        i,
        rowIndex,
        columns[i].template,
        columns[i].key,
        i === 0 ? "名称" : columns[i].name,
      );
    }
    return (
      <div>
        {cells}
      </div>
    );
  }

  _renderCell = (
    /*number*/ i, 
    /*number*/ rowIndex,
    /*object*/ cellTemplate,
    /*key*/ columnKey,
    /*string*/ name = null,
  ) /*object*/ => {

    let cellProps = {
        columnKey,
        onCellEdit: null,
        onCellEditEnd: null,
        container: this.props.container,
        rowIndex
    };

    let content;
    if (React.isValidElement(cellTemplate)) {
      content = React.cloneElement(cellTemplate, cellProps);
    } else if (typeof cellTemplate === 'function') {
      content = new cellTemplate(cellProps);
    } else {
      content = (
        <FixedDataTableCellDefault
          {...cellProps}>
          {cellTemplate}
        </FixedDataTableCellDefault>
      );
    } 
    return (
        <div className="column_wrapper" key={i} >
            {name && (<div className="column_label">{name}</div>)}
            <div className="column_cell_component_wrapper">{content}</div>
        </div>
    );
  }
}

export default MainTableRowEditor;
