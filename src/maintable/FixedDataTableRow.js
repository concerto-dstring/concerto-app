/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule FixedDataTableRow
 * @typechecks
 */

'use strict';

import FixedDataTableCellGroup from './FixedDataTableCellGroup';
import FixedDataTableTranslateDOMPosition from './FixedDataTableTranslateDOMPosition';
import PropTypes from 'prop-types';
import React from 'react';
import Scrollbar from './Scrollbar';
import cx from './vendor_upstream/stubs/cx';
import joinClasses from './vendor_upstream/core/joinClasses';
import { sumPropWidths } from './helper/widthHelper';
<<<<<<< HEAD
import { getLeafRowIndex, getSubLevel } from './data/MainTableType';
=======
import { compareSubLevel, getLeafRowIndex, getSubLevel ,RowType} from './data/MainTableType';
>>>>>>> master

import './css/layout/fixedDataTableRowLayout.css';
import './css/style/fixedDataTableRow.css';
import './css/style/fixedDataTable.css';

// .fixedDataTableLayout/header border-bottom-width
var HEADER_BORDER_BOTTOM_WIDTH = 1;

/**
 * Component that renders the row for <FixedDataTable />.
 * This component should not be used directly by developer. Instead,
 * only <FixedDataTable /> should use the component internally.
 */
class FixedDataTableRowImpl extends React.Component {

  /**
   * The index of a row for which to fire the onMouseLeave event.
   */
  mouseLeaveIndex = null;

  // static propTypes = {

  //   isScrolling: PropTypes.bool,

  //   /**
  //    * Array of data for the fixed columns.
  //    */
  //   fixedColumns: PropTypes.array.isRequired,

  //   /**
  //    * Array of <FixedDataTableColumn /> for the fixed columns positioned at end of the table.
  //    */
  //   fixedRightColumns: PropTypes.array.isRequired,

  //   /**
  //    * Height of the row.
  //    */
  //   height: PropTypes.number.isRequired,

  //   /**
  //    * Height of fixedDataTableCellGroupLayout/cellGroupWrapper.
  //    */
  //   cellGroupWrapperHeight: PropTypes.number,

  //   /**
  //    * Height of the content to be displayed below the row.
  //    */
  //   subRowHeight: PropTypes.number,

  //   /**
  //    * the row expanded.
  //    */
  //   rowExpanded: PropTypes.oneOfType([
  //     PropTypes.element,
  //     PropTypes.func,
  //   ]),

  //   /**
  //    * The row index.
  //    */
  //   index: PropTypes.oneOfType([
  //     PropTypes.string,
  //     PropTypes.number,
  //   ]),

  //   /**
  //    * Array of data for the scrollable columns.
  //    */
  //   scrollableColumns: PropTypes.array.isRequired,

  //   /**
  //    * The distance between the left edge of the table and the leftmost portion
  //    * of the row currently visible in the table.
  //    */
  //   scrollLeft: PropTypes.number.isRequired,

  //   /**
  //    * Pass true to not render the row. This is used internally for buffering rows.
  //    */
  //   fake: PropTypes.bool,

  //   /**
  //    * Width of the row.
  //    */
  //   width: PropTypes.number.isRequired,

  //   /**
  //    * Fire when a row is clicked.
  //    */
  //   onClick: PropTypes.func,

  //   /**
  //    * Fire when a contextual-menu is requested above a row.
  //    */
  //   onContextMenu: PropTypes.func,

  //   /**
  //    * Fire when a row is double clicked.
  //    */
  //   onDoubleClick: PropTypes.func,

  //   /**
  //    * Callback for when resizer knob (in FixedDataTableCell) is clicked
  //    * to initialize resizing. Please note this is only on the cells
  //    * in the header.
  //    * @param number combinedWidth
  //    * @param number leftOffset
  //    * @param number cellWidth
  //    * @param number|string columnKey
  //    * @param object event
  //    */
  //   onColumnResize: PropTypes.func,

  //   isColumnReordering: PropTypes.bool,
  //   /**
  //    * Callback for when reorder handle (in FixedDataTableCell) is clicked
  //    * to initialize reordering. Please note this is only on the cells
  //    * in the header.
  //    * @param number|string columnKey
  //    * @param number cellWidth
  //    * @param number leftOffset
  //    * @param object event
  //    */
  //   onColumnReorder: PropTypes.func,

  //   /**
  //    * Callback for when a cell is moved while reordering.
  //    * @param number distance
  //    */
  //   onColumnReorderMove: PropTypes.func,

  //   /**
  //    * Callback for when the mouse is released to complete reordering.
  //    * @param number distance
  //    */
  //   onColumnReorderEnd: PropTypes.func,

  //   touchEnabled: PropTypes.bool,

  //   /**
  //    * Whether the row is part of the header or footer.
  //    */
  //   isHeaderOrFooter: PropTypes.bool,

  //   /**
  //    * The value of the aria-rowindex attribute.
  //    */
  //   ariaRowIndex: PropTypes.number,

  //   /**
  //    * Whether the grid should be in RTL mode
  //    */
  //   isRTL: PropTypes.bool,

  //   /**
  //    * DOM attributes to be applied to the row.
  //    */
  //   attributes: PropTypes.object,
  // };

  render() /*object*/ {
    if (this.props.fake) {
      return null;
    }

    const { isRowReordering, rowReorderingData } = this.props;

    var subRowHeight = this.props.subRowHeight || 0;
    var style = {
      width: this.props.width,
      height: this.props.height + subRowHeight,
    };

    if (isRowReordering && rowReorderingData) {
      if (rowReorderingData.oldRowIndex === this.props.index) {
        let x = rowReorderingData.left - rowReorderingData.dragDistanceX - rowReorderingData.oldScrollLeft;
        style.width = '2000px';
        style.transform = `translate(${x}px) rotate(1deg)`;
      }
      if (rowReorderingData.newRowIndex < rowReorderingData.oldRowIndex) {
        if (this.props.index >= rowReorderingData.newRowIndex && this.props.index < rowReorderingData.oldRowIndex) {
          let height = rowReorderingData.height;
          style.transform = `translate(0, ${height}px)`;
        }
      } else if (rowReorderingData.newRowIndex > rowReorderingData.oldRowIndex) {
        if (this.props.index > rowReorderingData.oldRowIndex && this.props.index <= rowReorderingData.newRowIndex) {
          let height = rowReorderingData.height * -1;
          style.transform = `translate(0, ${height}px)`;
        }
      }
    }
    
    var className = cx({
      'fixedDataTableRowLayout/main': true,
      'public/fixedDataTableRow/main': true,
      'public/fixedDataTableRow/highlighted': (getLeafRowIndex(this.props.index) % 2 === 1),
      'public/fixedDataTableRow/odd': (getLeafRowIndex(this.props.index) % 2 === 1),
      'public/fixedDataTableRow/even': (getLeafRowIndex(this.props.index) % 2 === 0),
    });
    var fixedColumnsWidth = sumPropWidths(this.props.fixedColumns);
    var fixedRightColumnsWidth = sumPropWidths(this.props.fixedRightColumns);
    const groupCollapsed = this.props.data.getGroupByRowIndex(this.props.index).isCollapsed
    let extraWidth
    if (groupCollapsed) {
      // 如果分区折叠，设置滚动长度
      fixedColumnsWidth = (window.innerWidth - this.props.siderWidth - 16) * 0.88
      extraWidth = (window.innerWidth - this.props.siderWidth - 16) * 0.12
    }
    
    var fixedColumns =
      <FixedDataTableCellGroup
        key="fixed_cells"
        isScrolling={this.props.isScrolling}
        height={this.props.height}
        cellGroupWrapperHeight={this.props.cellGroupWrapperHeight}
        left={0}
        zIndex={1}
        width={extraWidth ? extraWidth : fixedColumnsWidth}
        columns={this.props.fixedColumns}
        touchEnabled={this.props.touchEnabled}
        onColumnResize={this.props.onColumnResize}
        //onColumnReorder={this.props.onColumnReorder}
        onColumnReorderMove={this.props.onColumnReorderMove}
        onColumnReorderEnd={this.props.onColumnReorderEnd}
        isColumnReordering={this.props.isColumnReordering}        
        columnReorderingData={this.props.columnReorderingData}
        onCellEdit={this.props.onCellEdit}
        onCellEditEnd={this.props.onCellEditEnd}
        rowHeight={this.props.height}
        rowIndex={this.props.index}
        isHeaderOrFooter={this.props.isHeaderOrFooter}
        isTableFooter={this.props.isTableFooter}
        container={this.props.container}
        data={this.props.data}
        isRTL={this.props.isRTL}
      />;
    var columnsLeftShadow = this._renderColumnsLeftShadow(fixedColumnsWidth);
    var scrollbarOffset = this.props.showScrollbarY ? Scrollbar.SIZE : 0;

    var fixedRightColumns = 
      <FixedDataTableCellGroup
        key={'fixed_right_cells'}
        isScrolling={this.props.isScrolling}
        zIndex={1}
        height={this.props.height}
        cellGroupWrapperHeight={this.props.cellGroupWrapperHeight}
        offsetLeft={this.props.width - fixedRightColumnsWidth - scrollbarOffset}
        width={fixedRightColumnsWidth}
        columns={this.props.fixedRightColumns}
        touchEnabled={this.props.touchEnabled}
        onColumnResize={this.props.onColumnResize}
        onColumnReorder={this.props.onColumnReorder}
        onColumnReorderMove={this.props.onColumnReorderMove}
        onColumnReorderEnd={this.props.onColumnReorderEnd}
        isColumnReordering={this.props.isColumnReordering}
        columnReorderingData={this.props.columnReorderingData}
        onCellEdit={this.props.onCellEdit}
        onCellEditEnd={this.props.onCellEditEnd}
        rowHeight={this.props.height}
        rowIndex={this.props.index}
        isHeaderOrFooter={this.props.isHeaderOrFooter}
        isTableFooter={this.props.isTableFooter}
        container={this.props.container}
        data={this.props.data}
        isRTL={this.props.isRTL}
      />;

    var fixedRightColumnsShadow = fixedRightColumnsWidth ?
      this._renderFixedRightColumnsShadow(this.props.width - fixedRightColumnsWidth - scrollbarOffset - 5) : null;
    var scrollableColumns =
      <FixedDataTableCellGroup
        key="scrollable_cells"
        isScrolling={this.props.isScrolling}
        height={this.props.height}
        cellGroupWrapperHeight={this.props.cellGroupWrapperHeight}
        align="right"
        left={this.props.scrollLeft}
        offsetLeft={fixedColumnsWidth}
        width={this.props.width - fixedColumnsWidth - fixedRightColumnsWidth - scrollbarOffset}
        columns={this.props.scrollableColumns}
        touchEnabled={this.props.touchEnabled}
        onColumnResize={this.props.onColumnResize}
        onColumnReorder={this.props.onColumnReorder}
        onColumnReorderMove={this.props.onColumnReorderMove}
        onColumnReorderEnd={this.props.onColumnReorderEnd}
        isColumnReordering={this.props.isColumnReordering}
        columnReorderingData={this.props.columnReorderingData}
        onCellEdit={this.props.onCellEdit}
        onCellEditEnd={this.props.onCellEditEnd}
        rowHeight={this.props.height}
        rowIndex={this.props.index}
        isHeaderOrFooter={this.props.isHeaderOrFooter}
        isTableFooter={this.props.isTableFooter}
        container={this.props.container}
        data={this.props.data}
        isRTL={this.props.isRTL}
      />;
    var scrollableColumnsWidth = sumPropWidths(this.props.scrollableColumns);
    var columnsRightShadow = this._renderColumnsRightShadow(fixedColumnsWidth + scrollableColumnsWidth);
    var rowExpanded = this._getRowExpanded(subRowHeight);
    var rowExpandedStyle = {
      height: subRowHeight,
      top: this.props.height,
      width: this.props.width,
    };

    let scrollbarSpacer = null;
    if (this.props.showScrollbarY) {
      var spacerStyles = {
        width: scrollbarOffset,
        height: this.props.height,
        // Since the box-sizing = border-box the border on the table is included in the width
        // so we need to account for the left and right border
        left: this.props.isRTL ? 2 : this.props.width - scrollbarOffset - 2,
      };
      scrollbarSpacer =
        <div 
          style={spacerStyles} 
          className={cx('public/fixedDataTable/scrollbarSpacer')}
        />;
    }
    
    return (
      <div
        className={joinClasses(className, this.props.className)}
        role={'row'}
        aria-rowindex={this.props.ariaRowIndex}
        {...this.props.attributes}
        onClick={this.props.onClick ? this._onClick : null}
        onContextMenu={this.props.onContextMenu ? this._onContextMenu : null}
        onDoubleClick={this.props.onDoubleClick ? this._onDoubleClick : null}
        onMouseDown={this.props.onMouseDown ? this._onMouseDown : null}
        onMouseUp={this.props.onMouseUp ? this._onMouseUp : null}
        onMouseEnter={this.props.onMouseEnter || this.props.onMouseLeave ? this._onMouseEnter : null}
        onMouseLeave={this.props.onMouseLeave ? this._onMouseLeave : null}
        onTouchStart={this.props.onTouchStart ? this._onTouchStart : null}
        onTouchEnd={this.props.onTouchEnd ? this._onTouchEnd : null}
        onTouchMove={this.props.onTouchMove ? this._onTouchMove : null}
        style={style}
        >
        <div className={cx('fixedDataTableRowLayout/body')}>
          {fixedColumns}
          { scrollableColumns }
          { columnsLeftShadow }
          { fixedRightColumns }
          { fixedRightColumnsShadow }
          { scrollbarSpacer }
        </div>
        {rowExpanded && <div
          className={cx('fixedDataTableRowLayout/rowExpanded')}
          style={rowExpandedStyle}>
          {rowExpanded}
        </div>}
        {columnsRightShadow}
      </div>
    );
  }

  _getRowExpanded = (/*number*/ subRowHeight) => /*?object*/ {
    if (this.props.rowExpanded) {
      var rowExpandedProps = {
        rowIndex: this.props.index,
        height: subRowHeight,
        width: this.props.width,
      };

      var rowExpanded;
      if (React.isValidElement(this.props.rowExpanded)) {
        rowExpanded = React.cloneElement(this.props.rowExpanded, rowExpandedProps);
      } else if (typeof this.props.rowExpanded === 'function') {
        rowExpanded = this.props.rowExpanded(rowExpandedProps);
      }

      return rowExpanded;
    }
  };

  _renderColumnsLeftShadow = (/*number*/ left) => /*?object*/ {
    var className = cx({
      'fixedDataTableRowLayout/fixedColumnsDivider': left > 0,
      'fixedDataTableRowLayout/columnsShadow': this.props.scrollLeft > 0,
      'public/fixedDataTableRow/fixedColumnsDivider': left > 0,
      'public/fixedDataTableRow/columnsShadow': this.props.scrollLeft > 0,
     });
     var dividerHeight = this.props.cellGroupWrapperHeight ?
       this.props.cellGroupWrapperHeight - HEADER_BORDER_BOTTOM_WIDTH : this.props.height;
     var style = {
       left: left,
       height: dividerHeight
     };
     if (this.props.isRTL) {
       style.right = left;
       style.left = 'auto';
     }
     return <div className={className} style={style} />;
  };

  _renderFixedRightColumnsShadow = (/*number*/ left) => /*?object*/ {
    var className = cx(
      'fixedDataTableRowLayout/columnsShadow',
      'fixedDataTableRowLayout/columnsRightShadow',
      'fixedDataTableRowLayout/fixedColumnsDivider',
      'public/fixedDataTableRow/columnsShadow',
      'public/fixedDataTableRow/columnsRightShadow',
      'public/fixedDataTableRow/fixedColumnsDivider'
    );
    var style = {
      height: this.props.height,
      left: left
    };
    if (this.props.isRTL) {
      style.right = left;
      style.left = 'auto';
    }
    return <div className={className} style={style} />;
  };

  _renderColumnsRightShadow = (/*number*/ totalWidth) => /*?object*/ {
    if (Math.ceil(this.props.scrollLeft + this.props.width) < Math.floor(totalWidth)) {
      var className = cx(
        'fixedDataTableRowLayout/columnsShadow',
        'fixedDataTableRowLayout/columnsRightShadow',
        'public/fixedDataTableRow/columnsShadow',
        'public/fixedDataTableRow/columnsRightShadow'
      );
      var style = {
        height: this.props.height
      };
      return <div className={className} style={style} />;
    }
  };

  _isDragDropItem = () => {

  };

  _onClick = (/*object*/ event) => {
    this.props.onClick(event, this.props.index);
    event.stopPropagation();
  };

  _onContextMenu = (/*object*/ event) => {
    this.props.onContextMenu(event, this.props.index);
    event.stopPropagation();
  };

  _onDoubleClick = (/*object*/ event) => {
    this.props.onDoubleClick(event, this.props.index);
    event.stopPropagation();
  };

  _onMouseUp = (/*object*/ event) => {
    this.props.onMouseUp(event, this.props.index);
    event.stopPropagation();
  };

  _onMouseDown = (/*object*/ event) => {
    this.props.onMouseDown(event, this.props.index);
  };

  _onMouseEnter = (/*object*/ event) => {
    /**
     * This is necessary so that onMouseLeave is fired with the initial
     * row index since this row could be updated with a different index
     * when scrolling.
     */
    this.mouseLeaveIndex = this.props.index;
    if (this.props.onMouseEnter) {
      this.props.onMouseEnter(event, this.props.index);
    }
    event.stopPropagation();
  };

  _onMouseLeave = (/*object*/ event) => {
    if(this.mouseLeaveIndex === null) {
      this.mouseLeaveIndex = this.props.index;
    }
    this.props.onMouseLeave(event, this.mouseLeaveIndex);
    this.mouseLeaveIndex = null;
    event.stopPropagation();
  };

  _onTouchStart = (/*object*/ event) => {
    this.props.onTouchStart(event, this.props.index);
  };

  _onTouchEnd = (/*object*/ event) => {
    this.props.onTouchEnd(event, this.props.index);
  };

  _onTouchMove = (/*object*/ event) => {
    this.props.onTouchMove(event, this.props.index);
  };
}

class FixedDataTableRow extends React.Component {
  static propTypes = {

    type:PropTypes.string,

    isScrolling: PropTypes.bool,

    /**
     * Height of the row.
     */
    height: PropTypes.number.isRequired,

    /**
     * Z-index on which the row will be displayed. Used e.g. for keeping
     * header and footer in front of other rows.
     */
    zIndex: PropTypes.number,

    /**
     * The vertical position where the row should render itself
     */
    offsetTop: PropTypes.number.isRequired,

    /**
     * Pass false to hide the row via CSS
     */
    visible: PropTypes.bool.isRequired,

    /**
     * Width of the row.
     */
    width: PropTypes.number.isRequired,
  };

  componentWillMount() {
    this._initialRender = true;
  }

  componentDidMount() {
    this._initialRender = false;
  }

  render() /*object*/ {
    const { offsetTop, scrollTop, zIndex, visible, type, ...rowProps } = this.props;
    const isMovingRow = this.props.isRowReordering && this.props.rowReorderingData 
                        && this.props.rowReorderingData.oldRowIndex === rowProps.index;
    var style = {
      width: this.props.width,
      height: this.props.height,
      zIndex:  isMovingRow ? 3 : (this.props.zIndex ? this.props.zIndex : 0),
      display: (this.props.visible ? 'block' : 'none'),
      top:type==RowType.HEADER?'-30px':'0'
    };
    let top = offsetTop;
    if (isMovingRow) {
      if (getSubLevel(rowProps.index) === 0) {
        top = this.props.rowReorderingData.top - this.props.rowReorderingData.dragDistanceY - this.props.rowReorderingData.oldScrollTop; 
      } else {
        //todo add subitem top calculation
      }
    }

    let dropPlace;
    if (this.props.isRowReordering 
      && this.props.rowReorderingData 
      && rowProps.index === this.props.rowReorderingData.newRowIndex) {
 
      let placeStyle = {
        height: this.props.rowReorderingData.height,
        width: this.props.width,
        marginBottom: '-3px',
        border: '1px dashed gray',
      }
      let height = 0;
      if (rowProps.index > this.props.rowReorderingData.oldRowIndex ) {
        height = this.props.rowReorderingData.height - this.props.height;
      }

      FixedDataTableTranslateDOMPosition(placeStyle, 0, offsetTop - height, this._initialRender, this.props.isRTL);
      dropPlace = <div style={placeStyle}></div>;
    }  

    FixedDataTableTranslateDOMPosition(style, 0, top, this._initialRender, this.props.isRTL);

    return (
      <div>
        {dropPlace}
        <div
          style={style}
          className={cx('fixedDataTableRowLayout/rowWrapper')}
          >
          <FixedDataTableRowImpl {...rowProps} />
        </div>
      </div>
    );
  }
}

export default FixedDataTableRow;
