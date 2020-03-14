/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule FixedDataTableCell
 * @typechecks
 */

import FixedDataTableCellDefault from './FixedDataTableCellDefault';
import FixedDataTableColumnReorderHandle from './FixedDataTableColumnReorderHandle';
import React from 'react';
import PropTypes from 'prop-types';
import cx from './vendor_upstream/stubs/cx';
import joinClasses from './vendor_upstream/core/joinClasses';
import shallowEqual from './vendor_upstream/core/shallowEqual';
import TableColumnSort from './TableColumnSort'
import TableColumnMenu from './TableColumnMenu'
import './css/layout/fixedDataTableCellLayout.css';
import './css/style/fixedDataTableCell.css';

class FixedDataTableCell extends React.Component {
  /**
   * PropTypes are disabled in this component, because having them on slows
   * down the FixedDataTable hugely in DEV mode. You can enable them back for
   * development, but please don't commit this component with enabled propTypes.
   */
  static propTypes_DISABLED_FOR_PERFORMANCE = {
    isScrolling: PropTypes.bool,
    align: PropTypes.oneOf(['left', 'center', 'right']),
    className: PropTypes.string,
    highlighted: PropTypes.bool,
    width: PropTypes.number.isRequired,
    minWidth: PropTypes.number,
    maxWidth: PropTypes.number,
    height: PropTypes.number.isRequired,

    cell: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.func,
    ]),

    columnKey: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),

    /**
     * The row index that will be passed to `cellRenderer` to render.
     */
    rowIndex: PropTypes.number.isRequired,

    /**
     * Callback for when resizer knob (in FixedDataTableCell) is clicked
     * to initialize resizing. Please note this is only on the cells
     * in the header.
     * @param number combinedWidth
     * @param number left
     * @param number width
     * @param number minWidth
     * @param number maxWidth
     * @param number|string columnKey
     * @param object event
     */
    onColumnResize: PropTypes.func,
    onColumnReorder: PropTypes.func,

    /**
     * The left offset in pixels of the cell.
     */
    left: PropTypes.number,

    /**
     * Flag for enhanced performance check
     */
    pureRendering: PropTypes.bool,

    /**
     * Whether touch is enabled or not.
     */
    touchEnabled: PropTypes.bool,

    /**
     * Whether the cell group is part of the header or footer
     */
    isHeaderOrFooter: PropTypes.bool,

    /**
     * If the component should render for RTL direction
     */
    isRTL: PropTypes.bool,
  }

  state = {
    isReorderingThisColumn: false,
    isReplacingThisColumn: false,
    displacementX: 0,
    displacementY: 0,
    // displacement: 0,
    // reorderingDisplacement: 0
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.isScrolling && this.props.rowIndex === nextProps.rowIndex) {
      return false;
    }

    //Performance check not enabled
    if (!nextProps.pureRendering) {
      return true;
    }

    const { cell: oldCell, isScrolling: oldIsScrolling, ...oldProps } = this.props;
    const { cell: newCell, isScrolling: newIsScrolling, ...newProps } = nextProps;

    if (!shallowEqual(oldProps, newProps)) {
      return true;
    }

    if (!oldCell || !newCell || oldCell.type !== newCell.type) {
      return true;
    }

    if (!shallowEqual(oldCell.props, newCell.props)) {
      return true;
    }

    return false;
  }

  // componentWillReceiveProps(prevProps) {
  //   if (prevProps === this.props) {
  //     return;
  //   }

  //   const props = this.props;
  //   //var left = props.left + this.state.displacement;

  //   var newState = {
  //     isReplaceingThisColumn: false,
  //   };

  //   if (props.isColumnReordering) {

  //     //var originalLeft = props.columnReorderingData.originalLeft;
  //     //var reorderCellLeft = originalLeft + props.columnReorderingData.dragDistanceX;
  //     //var farthestPossiblePoint = props.columnGroupWidth;
  
  //       // ensure the cell isn't being dragged out of the column group
  //     //reorderCellLeft = Math.max(reorderCellLeft, 0);
  //     //reorderCellLeft = Math.min(reorderCellLeft, farthestPossiblePoint);

  //     if (props.columnKey !== props.columnReorderingData.columnKey) {

  //       var originalLeft = props.columnReorderingData.originalLeft;
  //       var reorderCellLeft = originalLeft + props.columnReorderingData.dragDistanceX;
  //       var farthestPossiblePoint = props.columnGroupWidth;

  //       // ensure the cell isn't being dragged out of the column group
  //       reorderCellLeft = Math.max(reorderCellLeft, 0);
  //       reorderCellLeft = Math.min(reorderCellLeft, farthestPossiblePoint);
  //       //var reorderCellRight = reorderCellLeft + props.columnReorderingData.columnWidth;
  
  //       reorderCellLeft += props.columnReorderingData.locationInElement;
  //       console.log(reorderCellLeft);
  //       // reorderCellRight += reorderCellLeft + props.columnReorderingData.columnWidth;
  //       // if (reorderCellLeft >= props.left && reorderCellLeft <= props.left + props.width) {
  //       //   isReplacingThisColumn = true;
  //       //   props.columnReorderingData.columnAfter = props.columnKey;
  //       // }
  //       // let displacement = reorderCellLeft - props.left;

  //       // var reorderCellRight = reorderCellLeft + props.columnReorderingData.columnWidth;
  //       // var reorderCellCenter = reorderCellLeft + (props.columnReorderingData.columnWidth / 2);
  //       // var centerOfThisColumn = left + (props.width / 2);
  //       if (reorderCellLeft > props.left &&  reorderCellLeft < props.left + props.width) {
  //         if (!props.columnReorderingData.columnAfter) {
  //           props.columnReorderingData.columnAfter = props.columnKey;
  //           newState.isReplaceingThisColumn = true;
  //         }
  //       } 

  //       // var cellIsBeforeOneBeingDragged = reorderCellLeft > props.left + props.width;
  //       // //var cellWasOriginallyBeforeOneBeingDragged = originalLeft > props.left;
  //       // var changedPosition = false;

  //       // if (cellIsBeforeOneBeingDragged) {
  //       //   if (reorderCellLeft < props.left) {
  //       //     changedPosition = true;
  //       //     // if (cellWasOriginallyBeforeOneBeingDragged) {
  //       //     //   newState.displacement = props.columnReorderingData.columnWidth;
  //       //     // } else {
  //       //     //   newState.displacement = 0;
  //       //     // }
  //       //   }
  //       // } else {
  //       //   if (reorderCellLeft > props.left + props.width) {
  //       //     changedPosition = true;
  //       //     // if (cellWasOriginallyBeforeOneBeingDragged) {
  //       //     //   newState.displacement = 0;
  //       //     // } else {
  //       //     //   newState.displacement = props.columnReorderingData.columnWidth * -1;
  //       //     // }
  //       //   }
  //       // }

  //       // if (changedPosition) {
  //       //   if (cellIsBeforeOneBeingDragged) {
  //       //     if (!props.columnReorderingData.columnAfter) {
  //       //       props.columnReorderingData.columnAfter = props.columnKey;
  //       //     }
  //       //   } else {
  //       //     props.columnReorderingData.columnBefore = props.columnKey;
  //       //   }
  //       // } else if (cellIsBeforeOneBeingDragged) {
  //       //   props.columnReorderingData.columnBefore = props.columnKey;
  //       // } else if (!props.columnReorderingData.columnAfter) {
  //       //   props.columnReorderingData.columnAfter = props.columnKey;
  //       // }

  //     }
  //   } 
  //   // else {
  //   //   newState.displacement = 0;
  //   // }

  //   this.setState(newState);
  // }

  static defaultProps = /*object*/ {
    align: 'left',
    highlighted: false,
  }

  handleRef = component => (this.ref = component);

  render() /*object*/ {

    var { height, width, columnKey, isHeaderOrFooter, ...props } = this.props;

    var style = {
      height,
      width,
    };
    
    if (this.props.isRTL) {
      style.right = props.left;
    } else {
      style.left = props.left;
    }

    let replacingColumn = false;
    if (props.isColumnReordering && isHeaderOrFooter && props.columnReorderingData.columnAfter === columnKey) { 
      replacingColumn = true;
    } 

    var className = joinClasses(
      cx({
        'fixedDataTableCellLayout/main': true,
        'fixedDataTableCellLayout/lastChild': props.lastChild,
        'fixedDataTableCellLayout/alignRight': props.align === 'right',
        'fixedDataTableCellLayout/alignCenter': props.align === 'center',
        'public/fixedDataTableCell/alignRight': props.align === 'right',
        'public/fixedDataTableCell/highlighted': props.highlighted ,
        'fixedDataTableCellLayout/focusDropHeader': replacingColumn,
        'public/fixedDataTableCell/main': !replacingColumn,
        'public/fixedDataTableCell/hasReorderHandle': !!props.onColumnReorder,
        'public/fixedDataTableCell/reordering': this.state.isReorderingThisColumn,
      }),
      props.className,
    );

    var columnResizerComponent;
    var tableColumnSort;
    if (props.onColumnResize) {
      var columnResizerStyle = {
        height
      };
      columnResizerComponent = (
        <div
          className={cx('fixedDataTableCellLayout/columnResizerContainer')}
          style={columnResizerStyle}
          onMouseDown={this._onColumnResizerMouseDown}
          onTouchStart={this.props.touchEnabled ? this._onColumnResizerMouseDown : null}
          onTouchEnd={this.props.touchEnabled ? this._suppressEvent : null}
          onTouchMove={this.props.touchEnabled ? this._suppressEvent : null}>
          <div
            className={joinClasses(
              cx('fixedDataTableCellLayout/columnResizerKnob'),
              cx('public/fixedDataTableCell/columnResizerKnob'),
            )}
            style={columnResizerStyle}
          />
        </div>
      );
      tableColumnSort = (
        <TableColumnSort/>
      );
      
    }

    var columnReorderComponent;
    var tableColumnMenu;
    if (props.onColumnReorder && columnKey !== "") { //header row
      columnReorderComponent = (
        <FixedDataTableColumnReorderHandle
          rowIndex={this.props.rowIndex}
          columnKey={this.columnKey}
          touchEnabled={this.props.touchEnabled}
          onMouseDown={this._onColumnReorderMouseDown}
          onTouchStart={this._onColumnReorderMouseDown}
          height={height}
          {...this.props}
        />
      );
      tableColumnMenu = (
        <TableColumnMenu/>
      )
    }

    var cellProps = {
      columnKey,
      height,
      width,
      container: this,
    };

    if (props.rowIndex >= 0) {
      cellProps.rowIndex = props.rowIndex;
    }

    let content;
    if (React.isValidElement(props.cell)) {
      content = React.cloneElement(props.cell, cellProps);
    } else if (typeof props.cell === 'function') {
      content = props.cell(cellProps);
    } else {
      content = (
        <FixedDataTableCellDefault ref={this.handleRef}
          {...cellProps}>
          {props.cell}
        </FixedDataTableCellDefault>
      );
    } 

    
    const role = isHeaderOrFooter ? 'columnheader' : 'gridcell';
 
    return (
      <div className={className} style={style} role={role}>
        {!replacingColumn && columnResizerComponent}
        {!replacingColumn && columnReorderComponent}
        {!replacingColumn && tableColumnMenu}
        {content}
      </div>
    );
  }

  _onColumnResizerMouseDown = (/*object*/ event) => {
    this.props.onColumnResize(
      this.props.left,
      this.props.width,
      this.props.minWidth,
      this.props.maxWidth,
      this.props.columnKey,
      event
    );
    /**
     * This prevents the rows from moving around when we resize the
     * headers on touch devices.
     */
    if (this.props.touchEnabled) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  _onColumnReorderMouseDown = (/*object*/ event) => {
    this.props.onColumnReorder(
      this.props.rowIndex,
      this.props.columnKey,
      this.props.width,
      event
    );
  }

  _suppressEvent = (/*object*/ event) => {
    event.preventDefault();
    event.stopPropagation();
  }
}
export default FixedDataTableCell;
