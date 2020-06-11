/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule FixedDataTableBufferedRows
 * @typechecks
 */
import FixedDataTableRow from './FixedDataTableRow';
import PropTypes from 'prop-types';
import React from 'react';
import cx from './vendor_upstream/stubs/cx';
import emptyFunction from './vendor_upstream/core/emptyFunction';
import joinClasses from './vendor_upstream/core/joinClasses';
import inRange from 'lodash/inRange';
import MainTableAddRow from './MainTableAddRow';
import MainTableTitleRow from './MainTableTitleRow';
import { RowType, getSubLevel } from './data/MainTableType';

//import FixedDataTableTranslateDOMPosition from './FixedDataTableTranslateDOMPosition';

import './css/layout/fixedDataTableLayout.css';
import './css/style/fixedDataTable.css';


class FixedDataTableBufferedRows extends React.Component {
  
  componentWillMount() {
    this._staticRowArray = [];
    this._initialRender = true;
  }

  componentDidMount() {
    this._initialRender = false;
  }

  shouldComponentUpdate() /*boolean*/ {
    // Don't add PureRenderMixin to this component please.
    return true;
  }

  componentWillUnmount() {
    this._staticRowArray.length = 0;
  }

  render() /*object*/ {
    let { scrollTop, isScrolling, rowsToRender, isRowReordering, rowReorderingData } = this.props;
    let baseOffsetTop =  - scrollTop;
    rowsToRender = rowsToRender || [];

    if (isScrolling) {
      // allow static array to grow while scrolling
      this._staticRowArray.length = Math.max(this._staticRowArray.length, rowsToRender.length);
    } else {
      // when scrolling is done, static array can shrink to fit the buffer
      this._staticRowArray.length = rowsToRender.length;
    }

    // render each row from the buffer into the static row array
    let found = true;
    if (isRowReordering) {
      found = false;
    }
    let i = 0;
    for (i = 0; i < this._staticRowArray.length; i++) {
      let rowIndex = rowsToRender[i];
      // if the row doesn't exist in the buffer set, then take the previous one
      if (rowIndex === undefined) {
        rowIndex = this._staticRowArray[i] && this._staticRowArray[i].props.index;
      }
      if (isRowReordering && rowReorderingData.oldRowIndex === rowIndex ) {
        found = true;
      }
      this._staticRowArray[i] = this.renderRow({
        rowIndex,
        key: i,
        baseOffsetTop,
      });
    }

    if (!found) {
      if (getSubLevel(rowReorderingData.oldRowIndex) === 0) {
        this._staticRowArray[i] = this.renderRow({
          rowIndex: rowReorderingData.oldRowIndex,
          key: i,
          baseOffsetTop,
        });
      }
    }

    let layerStyle = {
      top: -this.props.scrollTop,
      left: -this.props.scrollLeft,
      position: 'absolute',
      width: this.props.contentWidth,
      height: this.props.contentHeight, 
      // zIndex: this.props.isCellEditing ? 2: -1,
      zIndex: 2,
      overflow: 'hidden',
      pointerEvents: 'none',
    };
    
    return <div><div>{this._staticRowArray}</div><div style={layerStyle} ref={this._onRef}/></div>;
  }

  _onRef = (div) => {
    this._divRef = div;
  }


  /**
   * type header, footer, row 
   */

  /**
   * @param {number} rowIndex
   * @param {number} key
   * @param {number} baseOffsetTop
   * @return {!Object}
   */
  renderRow({ rowIndex, key, baseOffsetTop }) /*object*/ {

    const props = this.props;

    const {
      ariaHeaderIndex,
      ariaFooterIndex,
      ariaAddRowIndex,
      elementHeights,
      isRowReordering,
      rowReorderingData,
      columnReorderingData,
      isColumnReordering,
      onColumnReorder,
      onColumnReorderMove,
      onColumnReorderEnd,
      onColumnResize,
      onCellEdit,
      onCellEditEnd,
      touchScrollEnabled,
      fixedColumns,
      fixedRightColumns,
      scrollableColumns,
      scrollEnabledY,
      onNewRowAdd,
      siderWidth,
    } = props;

    const { titleHeight, footerHeight,  headerHeight, addRowHeight } = elementHeights;

    const rowClassNameGetter = props.rowClassNameGetter || emptyFunction;
    const fake = rowIndex === undefined;
    let rowProps = {};

    // row data
    const type = props.rowSettings.rowTypeGetter(rowIndex); // header or footer or addrow or row or header group
    
    if (!type) {
      return;
    }
    // if row exists, then calculate row specific props
    if (!fake) {
      rowProps.height = props.rowSettings.rowHeightGetter(rowIndex);
      rowProps.subRowHeight = props.rowSettings.subRowTotalHeightGetter(rowIndex);
      rowProps.offsetTop = Math.round(baseOffsetTop + props.rowOffsets[rowIndex]);
      rowProps.rowKey = props.rowKeyGetter ? props.rowKeyGetter(rowIndex) : key;
      rowProps.attributes = props.rowSettings.rowAttributesGetter && props.rowSettings.rowAttributesGetter(rowIndex);

      const hasBottomBorder = (type === RowType.FOOTER);
      rowProps.className = joinClasses(
        rowClassNameGetter(rowIndex),
        cx('public/fixedDataTable/bodyRow'),
        cx({
          'fixedDataTableLayout/hasBottomBorder': hasBottomBorder,
          'public/fixedDataTable/hasBottomBorder': hasBottomBorder,
        })
      );
    }

    const visible = inRange(rowIndex, props.firstViewportRowIndex, props.endViewportRowIndex) 
                    || (isRowReordering && rowReorderingData.oldRowIndex === rowIndex);

    let row;

    if (rowProps.height > 0) {
      switch(type) {
          case RowType.TITLE:
            row = 
            <MainTableTitleRow
              key={key}
              title={props.title}
              index={rowIndex}
              zIndex={1}
              isHeaderOrFooter={true}
              ariaRowIndex={ariaAddRowIndex}
              isScrolling={props.isScrolling}
              height={titleHeight}
              width={props.width}
              offsetTop={rowProps.offsetTop}
              isRTL={props.isRTL}
              container={this._divRef}
              visible={visible} 
              onFilter={props.onFilterChange}
              onGetListUsers={props.onGetListUsers}
              onAddNewGroup={props.onAddNewGroup}            
            />;
            break;
          case RowType.HEADER:
            row = 
              <FixedDataTableRow
                key={key}
                index={rowIndex}
                ariaRowIndex={ariaHeaderIndex}
                isHeaderOrFooter={true}
                isScrolling={props.isScrolling}
                isRowReordering={props.isRowReordering}
                rowReorderingData={props.rowReorderingData}
                className={joinClasses(
                  cx('fixedDataTableLayout/header'),
                  cx('public/fixedDataTable/header'),
                )}
                width={props.width}
                height={headerHeight}
                offsetTop={rowProps.offsetTop}
                scrollLeft={Math.round(props.scrollLeft)}
                visible={visible}
                fixedColumns={fixedColumns.header}
                fixedRightColumns={fixedRightColumns.header}
                scrollableColumns={scrollableColumns.header}
                touchEnabled={touchScrollEnabled}
                onColumnResize={onColumnResize}
                onColumnReorder={onColumnReorder}
                onColumnReorderMove={onColumnReorderMove}
                onColumnReorderEnd={onColumnReorderEnd}
                isColumnReordering={!!isColumnReordering}
                columnReorderingData={columnReorderingData}
                showScrollbarY={scrollEnabledY}
                container={this._divRef}
                data={props.data}
                isRTL={props.isRTL}
                siderWidth={siderWidth}
              >
              </FixedDataTableRow>
            break;
          case RowType.ADDROW:
            row = 
            <MainTableAddRow
              key={key}
              index={rowIndex}
              zIndex={1}
              ariaRowIndex={ariaAddRowIndex}
              isScrolling={props.isScrolling}
              isRowReordering={props.isRowReordering}
              rowReorderingData={props.rowReorderingData}
              height={addRowHeight}
              width={props.width}
              isRowReordering={props.isRowReordering}
              rowReorderingData={props.rowReorderingData}
              offsetTop={rowProps.offsetTop}
              scrollLeft={Math.round(props.scrollLeft)}
              fixedColumns={fixedColumns.cell}
              fixedRightColumns={fixedRightColumns.cell}
              scrollableColumns={scrollableColumns.cell}
              showScrollbarY={scrollEnabledY}
              isRTL={props.isRTL}
              container={this._divRef}
              data={props.data}
              visible={visible} 
              onNewRowAdd={onNewRowAdd}
            />;
          break;
        
          case RowType.FOOTER:
            row =
              <FixedDataTableRow
                key={key}
                index={rowIndex}
                zIndex={0}
                ariaRowIndex={ariaFooterIndex}
                isHeaderOrFooter={false}
                isTableFooter={true}
                isScrolling={props.isScrolling}
                isRowReordering={props.isRowReordering}
                rowReorderingData={props.rowReorderingData}
                className={joinClasses(
                  cx('fixedDataTableLayout/footer'),
                  cx('public/fixedDataTable/footer'),
                )}
                width={props.width}
                height={footerHeight}
                offsetTop={rowProps.offsetTop}
                visible={visible}
                fixedColumns={fixedColumns.footer}
                fixedRightColumns={fixedRightColumns.footer}
                scrollableColumns={scrollableColumns.footer}
                scrollLeft={Math.round(props.scrollLeft)}
                showScrollbarY={scrollEnabledY}
                container={this._divRef}
                data={props.data}
                isRTL={props.isRTL}
              />;
          break;

        default:
          row = 
            <FixedDataTableRow
                index={rowIndex}
                key={key}
                isHeaderOrFooter={false}
                zIndex={2}
                ariaRowIndex={rowIndex + props.ariaRowIndexOffset}
                isScrolling={props.isScrolling}
                width={props.width}
                rowExpanded={props.rowExpanded}
                scrollLeft={Math.round(props.scrollLeft)}
                scrollTop={Math.round(props.scrollTop)}
                fixedColumns={props.fixedColumns.cell}
                fixedRightColumns={props.fixedRightColumns.cell}
                scrollableColumns={props.scrollableColumns.cell}
                onClick={props.onRowClick}
                isRowReordering={props.isRowReordering}                
                rowReorderingData={props.rowReorderingData}
                onCellEdit={onCellEdit}
                onCellEditEnd={onCellEditEnd}
                onContextMenu={props.onRowContextMenu}
                onDoubleClick={props.onRowDoubleClick}
                onMouseDown={props.onRowMouseDown}
                onMouseUp={props.onRowMouseUp}
                onMouseEnter={props.onRowMouseEnter}
                onMouseLeave={props.onRowMouseLeave}
                onTouchStart={props.onRowTouchStart}
                onTouchEnd={props.onRowTouchEnd}
                onTouchMove={props.onRowTouchMove}
                showScrollbarY={props.showScrollbarY}
                isRTL={props.isRTL}
                visible={visible}
                fake={fake}
                container={this._divRef}
                data={props.data}
                {...rowProps} 
              />
        }
    }

    return (
      row
    );
  }
}
export default FixedDataTableBufferedRows;
