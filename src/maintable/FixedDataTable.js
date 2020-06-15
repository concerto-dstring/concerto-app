/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule FixedDataTable
 * @typechecks
 * @noflow
 */

/*eslint no-bitwise:1*/
import React from 'react';
import PropTypes from 'prop-types';
import FixedDataTableRow from './FixedDataTableRow';
import MainTableAddRow from './MainTableAddRow';
import { events, getPosition } from './helper/utils'
import FixedDataTableBufferedRows from './FixedDataTableBufferedRows';
import FixedDataTableEventHelper from './FixedDataTableEventHelper';
import ReactTouchHandler from './ReactTouchHandler';
import ReactWheelHandler from './vendor_upstream/dom/ReactWheelHandler';
import Scrollbar from './Scrollbar';
import ariaAttributesSelector from './selectors/ariaAttributes';
import columnTemplatesSelector from './selectors/columnTemplates';
import cx from './vendor_upstream/stubs/cx';
import debounceCore from './vendor_upstream/core/debounceCore';
import isNaN from 'lodash/isNaN';
import joinClasses from './vendor_upstream/core/joinClasses';
import scrollbarsVisible from './selectors/scrollbarsVisible';
import tableHeightsSelector from './selectors/tableHeights';
import { RowType, getSubLevel, getRootRowIndex } from './data/MainTableType';
import ColumnResizerLine from './ColumnResizerLine';

import './css/layout/fixedDataTableLayout.css';
import './css/style/fixedDataTable.css';

const ARROW_SCROLL_SPEED = 25;

const DRAG_SCROLL_SPEED  = 10;
const DRAG_SCROLL_BUFFER = 40;


/**
 * Data grid component with fixed or scrollable header and columns.
 *
 * The layout of the data table is as follows:
 *
 * ```
 * +---------------------------------------------------+
 * | Fixed Column Group    | Scrollable Column Group   |
 * | Header                | Header                    |
 * |                       |                           |
 * +---------------------------------------------------+
 * |                       |                           |
 * | Fixed Header Columns  | Scrollable Header Columns |
 * |                       |                           |
 * +-----------------------+---------------------------+
 * |                       |                           |
 * | Fixed Body Columns    | Scrollable Body Columns   |
 * |                       |                           |
 * +-----------------------+---------------------------+
 * |                       |                           |
 * | Fixed Footer Columns  | Scrollable Footer Columns |
 * |                       |                           |
 * +-----------------------+---------------------------+
 * ```
 *
 * - Fixed Column Group Header: These are the headers for a group
 *   of columns if included in the table that do not scroll
 *   vertically or horizontally.
 *
 * - Scrollable Column Group Header: The header for a group of columns
 *   that do not move while scrolling vertically, but move horizontally
 *   with the horizontal scrolling.
 *
 * - Fixed Header Columns: The header columns that do not move while scrolling
 *   vertically or horizontally.
 *
 * - Scrollable Header Columns: The header columns that do not move
 *   while scrolling vertically, but move horizontally with the horizontal
 *   scrolling.
 *
 * - Fixed Body Columns: The body columns that do not move while scrolling
 *   horizontally, but move vertically with the vertical scrolling.
 *
 * - Scrollable Body Columns: The body columns that move while scrolling
 *   vertically or horizontally.
 */class FixedDataTable extends React.Component {
  // static propTypes = {

  //   // TODO (jordan) Remove propType of width without losing documentation (moved to tableSize)
  //   /**
  //    * Pixel width of table. If all columns do not fit,
  //    * a horizontal scrollbar will appear.
  //    */
  //   width: PropTypes.number.isRequired,

  //   // TODO (jordan) Remove propType of height without losing documentation (moved to tableSize)
  //   /**
  //    * Pixel height of table. If all rows do not fit,
  //    * a vertical scrollbar will appear.
  //    *
  //    * Either `height` or `maxHeight` must be specified.
  //    */
  //   height: PropTypes.number,

  //   /**
  //    * Class name to be passed into parent container
  //    */
  //   className: PropTypes.string,

  //   // TODO (jordan) Remove propType of maxHeight without losing documentation (moved to tableSize)
  //   /**
  //    * Maximum pixel height of table. If all rows do not fit,
  //    * a vertical scrollbar will appear.
  //    *
  //    * Either `height` or `maxHeight` must be specified.
  //    */
  //   maxHeight: PropTypes.number,

  //   // TODO (jordan) Remove propType of ownerHeight without losing documentation (moved to tableSize)
  //   /**
  //    * Pixel height of table's owner, this is used in a managed scrolling
  //    * situation when you want to slide the table up from below the fold
  //    * without having to constantly update the height on every scroll tick.
  //    * Instead, vary this property on scroll. By using `ownerHeight`, we
  //    * over-render the table while making sure the footer and horizontal
  //    * scrollbar of the table are visible when the current space for the table
  //    * in view is smaller than the final, over-flowing height of table. It
  //    * allows us to avoid resizing and reflowing table when it is moving in the
  //    * view.
  //    *
  //    * This is used if `ownerHeight < height` (or `maxHeight`).
  //    */
  //   ownerHeight: PropTypes.number,

  //   // TODO (jordan) Remove propType of overflowX & overflowY without losing documentation (moved to scrollFlags)
  //   overflowX: PropTypes.oneOf(['hidden', 'auto']),
  //   overflowY: PropTypes.oneOf(['hidden', 'auto']),

  //   /**
  //    * Boolean flag indicating of touch scrolling should be enabled
  //    * This feature is current in beta and may have bugs
  //    */
  //   touchScrollEnabled: PropTypes.bool,

  //   /**
  //    * Boolean flags to control if scrolling with keys is enabled
  //    */
  //   keyboardScrollEnabled: PropTypes.bool,
  //   keyboardPageEnabled: PropTypes.bool,

  //   // TODO (jordan) Remove propType of showScrollbarX & showScrollbarY without losing documentation (moved to scrollFlags)
  //   /**
  //    * Hide the scrollbar but still enable scroll functionality
  //    */
  //   showScrollbarX: PropTypes.bool,
  //   showScrollbarY: PropTypes.bool,

  //   /**
  //    * Callback when horizontally scrolling the grid.
  //    *
  //    * Return false to stop propagation.
  //    */
  //   onHorizontalScroll: PropTypes.func,

  //   /**
  //    * Callback when vertically scrolling the grid.
  //    *
  //    * Return false to stop propagation.
  //    */
  //   onVerticalScroll: PropTypes.func,

  //   // TODO (jordan) Remove propType of rowsCount without losing documentation (moved to rowSettings)
  //   /**
  //    * Number of rows in the table.
  //    */
  //   rowsCount: PropTypes.number.isRequired,

  //   // TODO (jordan) Remove propType of rowHeight without losing documentation (moved to rowSettings)
  //   /**
  //    * Pixel height of rows unless `rowHeightGetter` is specified and returns
  //    * different value.
  //    */
  //   rowHeight: PropTypes.number.isRequired,

  //   // TODO (jordan) Remove propType of rowHeightGetter without losing documentation (moved to rowSettings)
  //   /**
  //    * If specified, `rowHeightGetter(index)` is called for each row and the
  //    * returned value overrides `rowHeight` for particular row.
  //    */
  //   rowHeightGetter: PropTypes.func,

  //   // TODO (jordan) Remove propType of subRowHeight without losing documentation (moved to rowSettings)
  //   /**
  //    * Pixel height of sub-row unless `subRowHeightGetter` is specified and returns
  //    * different value.  Defaults to 0 and no sub-row being displayed.
  //    */
  //   subRowHeight: PropTypes.number,

  //   /**
  //    * If specified, `subRowHeightGetter(index)` is called for each subrow.
  //    */
  //   subRowHeightGetter: PropTypes.func,

  //   /**
  //    * If specified, `subrowsGetter(index)` is called for each row and the
  //    * returned value all `subRow` for particular row.
  //    */
  //   subRowsGetter: PropTypes.func,

  //   /**
  //    * If specified, `subRowTotalHeightGetter(index)` is called for all sub rows.
  //    */
  //   subRowTotalHeightGetter: PropTypes.func,

  //   // TODO (jordan) Remove propType of subRowHeightGetter without losing documentation (moved to rowSettings)
  //   /**
  //    * If specified, `subRowHeightGetter(index)` is called for each row and the
  //    * returned value overrides `subRowHeight` for particular row.
  //    */
  //   subRowHeightGetter: PropTypes.func,
    

  //   /**
  //    * The row expanded for table row.
  //    * This can either be a React element, or a function that generates
  //    * a React Element. By default, the React element passed in can expect to
  //    * receive the following props:
  //    *
  //    * ```
  //    * props: {
  //    *   rowIndex; number // (the row index)
  //    *   height: number // (supplied from subRowHeight or subRowHeightGetter)
  //    *   width: number // (supplied from the Table)
  //    * }
  //    * ```
  //    *
  //    * Because you are passing in your own React element, you can feel free to
  //    * pass in whatever props you may want or need.
  //    *
  //    * If you pass in a function, you will receive the same props object as the
  //    * first argument.
  //    */
  //   rowExpanded: PropTypes.oneOfType([
  //     PropTypes.element,
  //     PropTypes.func,
  //   ]),

  //   /**
  //    * To get any additional CSS classes that should be added to a row,
  //    * `rowClassNameGetter(index)` is called.
  //    */
  //   rowClassNameGetter: PropTypes.func,

  //   /**
  //    * If specified, `rowKeyGetter(index)` is called for each row and the
  //    * returned value overrides `key` for the particular row.
  //    */
  //   rowKeyGetter: PropTypes.func,

  //   // TODO (jordan) Remove propType of groupHeaderHeight without losing documentation (moved to elementHeights)
  //   /**
  //    * Pixel height of the column group header.
  //    */
  //   groupHeaderHeight: PropTypes.number,

  //   // TODO (jordan) Remove propType of headerHeight without losing documentation (moved to elementHeights)
  //   /**
  //    * Pixel height of header.
  //    */
  //   headerHeight: PropTypes.number.isRequired,

  //   /**
  //    * Pixel height of fixedDataTableCellGroupLayout/cellGroupWrapper.
  //    * Default is headerHeight and groupHeaderHeight.
  //    *
  //    * This can be used with CSS to make a header cell span both the group & normal header row.
  //    * Setting this to a value larger than height will cause the content to
  //    * overflow the height. This is useful when adding a 2nd table as the group
  //    * header and vertically merging the 2 headers when a column is not part
  //    * of a group. Here are the necessary CSS changes:
  //    *
  //    * Both headers:
  //    *  - cellGroupWrapper needs overflow-x: hidden and pointer-events: none
  //    *  - cellGroup needs pointer-events: auto to reenable them on child els
  //    * Group header:
  //    *  - Layout/main needs overflow: visible and a higher z-index
  //    *  - CellLayout/main needs overflow-y: visible
  //    *  - cellGroup needs overflow: visible
  //    */
  //   cellGroupWrapperHeight: PropTypes.number,

  //   // TODO (jordan) Remove propType of footerHeight without losing documentation (moved to elementHeights)
  //   /**
  //    * Pixel height of footer.
  //    */
  //   footerHeight: PropTypes.number,

  //   /**
  //    * Value of horizontal scroll.
  //    */
  //   scrollLeft: PropTypes.number,

  //   // TODO (jordan) Remove propType of scrollToRow & scrollToColumn without losing documentation
  //   /**
  //    * Index of column to scroll to.
  //    */
  //   scrollToColumn: PropTypes.number,

  //   /**
  //    * Value of vertical scroll.
  //    */
  //   scrollTop: PropTypes.number,

  //   /**
  //    * Index of row to scroll to.
  //    */
  //   scrollToRow: PropTypes.number,

  //   /**
  //    * Callback that is called when scrolling starts. The current horizontal and vertical scroll values,
  //    * and the current first and last row indexes will be provided to the callback.
  //    */
  //   onScrollStart: PropTypes.func,

  //   /**
  //    * Callback that is called when scrolling ends. The new horizontal and vertical scroll values,
  //    * and the new first and last row indexes will be provided to the callback.
  //    */
  //   onScrollEnd: PropTypes.func,

  //   /**
  //    * If enabled scroll events will not be propagated outside of the table.
  //    */
  //   stopReactWheelPropagation: PropTypes.bool,

  //   /**
  //    * If enabled scroll events will never be bubbled to the browser default handler.
  //    * If disabled (default when unspecified), scroll events will be bubbled up if the scroll
  //    * doesn't lead to a change in scroll offsets, which is preferable if you like
  //    * the page/container to scroll up when the table is already scrolled up max.
  //    */
  //   stopScrollDefaultHandling: PropTypes.bool,

  //   /**
  //    * If enabled scroll events will not be propagated outside of the table.
  //    */
  //   stopScrollPropagation: PropTypes.bool,

  //   /**
  //    * Callback that is called when `rowHeightGetter` returns a different height
  //    * for a row than the `rowHeight` prop. This is necessary because initially
  //    * table estimates heights of some parts of the content.
  //    */
  //   onContentHeightChange: PropTypes.func,

  //   /**
  //    * Callback that is called when a row is clicked.
  //    */
  //   onRowClick: PropTypes.func,

  //   /**
  //    * Callback that is called when a contextual-menu event happens on a row.
  //    */
  //   onRowContextMenu: PropTypes.func,

  //   /**
  //    * Callback that is called when a row is double clicked.
  //    */
  //   onRowDoubleClick: PropTypes.func,

  //   /**
  //    * Callback that is called when a mouse-down event happens on a row.
  //    */
  //   onRowMouseDown: PropTypes.func,

  //   /**
  //    * Callback that is called when a mouse-up event happens on a row.
  //    */
  //   onRowMouseUp: PropTypes.func,

  //   /**
  //    * Callback that is called when a mouse-enter event happens on a row.
  //    */
  //   onRowMouseEnter: PropTypes.func,

  //   /**
  //    * Callback that is called when a mouse-leave event happens on a row.
  //    */
  //   onRowMouseLeave: PropTypes.func,

  //   /**
  //    * Callback that is called when a touch-start event happens on a row.
  //    */
  //   onRowTouchStart: PropTypes.func,

  //   /**
  //    * Callback that is called when a touch-end event happens on a row.
  //    */
  //   onRowTouchEnd: PropTypes.func,

  //   /**
  //    * Callback that is called when a touch-move event happens on a row.
  //    */
  //   onRowTouchMove: PropTypes.func,

  //    /**
  //    * Callback that is called when a touch-move event happens on a row.
  //    */
  //   onRowReorderEndCallback: PropTypes.func,

  //   /**
  //    * Callback that is called when resizer has been released
  //    * and column needs to be updated.
  //    *
  //    * Required if the isResizable property is true on any column.
  //    *
  //    * ```
  //    * function(
  //    *   newColumnWidth: number,
  //    *   columnKey: string,
  //    * )
  //    * ```
  //    */
  //   onColumnResizeEndCallback: PropTypes.func,

  //   /**
  //    * Add new row callback
  //    */    
  //   onNewRowAddCallback: PropTypes.func,

  //   /**
  //    * Add new group callback
  //    */ 
  //   onNewGroupAddCallback: PropTypes.func,


  //   /**
  //    * On filter change callback
  //    */ 
  //   onFilterChangeCallback: PropTypes.func,

  //   /**
  //    * user list
  //    */
  //   onGetListUsers: PropTypes.func,

  //   /**
  //    * Callback that is called when reordering has been completed
  //    * and columns need to be updated.
  //    *
  //    * ```
  //    * function(
  //    *   event {
  //    *     columnBefore: string|undefined, // the column before the new location of this one
  //    *     columnAfter: string|undefined,  // the column after the new location of this one
  //    *     reorderColumn: string,          // the column key that was just reordered
  //    *   }
  //    * )
  //    * ```
  //    */
  //   onColumnReorderEndCallback: PropTypes.func,

  //   /**
  //    * Whether a column is currently being resized.
  //    */
  //   isColumnResizing: PropTypes.bool,

  //   /**
  //    * Whether columns are currently being reordered.
  //    */
  //   isColumnReordering: PropTypes.bool,

  //   /**
  //    * Whether the grid should be in RTL mode
  //    */
  //   isRTL: PropTypes.bool,

  //   // TODO (jordan) Remove propType of bufferRowCount without losing documentation
  //   /**
  //    * The number of rows outside the viewport to prerender. Defaults to roughly
  //    * half of the number of visible rows.
  //    */
  //   bufferRowCount: PropTypes.number,

  //   // TODO (pradeep): Move elementHeights to a selector instead of passing it through redux as state variables
  //   /**
  //    * Row heights of the header, groupheader, footer, and cell group wrapper
  //    * grouped into a single object.
  //    *
  //    * @ignore
  //    */
  //   elementHeights: PropTypes.shape({
  //     titleHeight: PropTypes.number,
  //     cellGroupWrapperHeight: PropTypes.number,
  //     footerHeight: PropTypes.number,
  //     groupHeaderHeight: PropTypes.number,
  //     headerHeight: PropTypes.number,
  //     addRowHeight: PropTypes.number,
  //   }),

  //   /**
  //    * Callback that returns an object of html attributes to add to the grid element
  //    */
  //   gridAttributesGetter: PropTypes.func,

  //   /**
  //    * Callback to get column name
  //    */
  //   columnNameGetter: PropTypes.func,

  // }

  static defaultProps = /*object*/ {
    elementHeights: {
      cellGroupWrapperHeight: undefined,
      footerHeight: 40,
      groupHeaderHeight: 0,
      headerHeight: 40,
      addRowHeight: 35,
      titleHeight: 0,
    },
    keyboardScrollEnabled: false,
    keyboardPageEnabled: false,
    touchScrollEnabled: false,
    stopScrollPropagation: false,
  }

  componentWillMount() {
    this._didScrollStop = debounceCore(this._didScrollStopSync, 200, this);
    this._onKeyDown = this._onKeyDown.bind(this);
    this._onMouseMove = this._onMouseMove.bind(this);
    this._onMouseUp = this._onMouseUp.bind(this);
    this._wheelHandler = new ReactWheelHandler(
      this._onScroll,
      this._shouldHandleWheelX,
      this._shouldHandleWheelY,
      this.props.isRTL,
      this.props.stopScrollDefaultHandling,
      this.props.stopScrollPropagation
    );

    this._touchHandler = new ReactTouchHandler(
      this._onScroll,
      this._shouldHandleTouchX,
      this._shouldHandleTouchY,
      this.props.stopScrollDefaultHandling,
      this.props.stopScrollPropagation
    );
  }

  componentWillUnmount() {
    // TODO (pradeep): Remove these and pass to our table component directly after
    // React provides an API where event handlers can be specified to be non-passive (facebook/react#6436)
    this._divRef && this._divRef.removeEventListener(
      'wheel',
      this._wheelHandler.onWheel,
      { passive: false }
    );
    this._divRef && this._divRef.removeEventListener(
      'touchmove',
      this._touchHandler.onTouchMove,
      { passive: false }
    );
    this._wheelHandler = null;
    this._touchHandler = null;

    // Cancel any pending debounced scroll handling and handle immediately.
    this._didScrollStop.reset();
    this._didScrollStopSync();
  }

  _shouldHandleTouchX = (/*number*/ delta) /*boolean*/ =>
    this.props.touchScrollEnabled && this._shouldHandleWheelX(delta)

  _shouldHandleTouchY = (/*number*/ delta) /*boolean*/ =>
    this.props.touchScrollEnabled && this._shouldHandleWheelY(delta)

  _shouldHandleWheelX = (/*number*/ delta) /*boolean*/ => {
    const { maxScrollX, scrollFlags, scrollX } = this.props;
    const { overflowX } = scrollFlags;

    if (overflowX === 'hidden') {
      return false;
    }

    delta = Math.round(delta);
    if (delta === 0) {
      return false;
    }

    return (
      (delta < 0 && scrollX > 0) ||
      (delta >= 0 && scrollX < maxScrollX)
    );
  }

  _shouldHandleWheelY = (/*number*/ delta) /*boolean*/ => {
    const { maxScrollY, scrollFlags, scrollY } = this.props;
    const { overflowY } = scrollFlags;

    if (overflowY === 'hidden' || delta === 0) {
      return false;
    }

    delta = Math.round(delta);
    if (delta === 0) {
      return false;
    }

    return (
      (delta < 0 && scrollY > 0) ||
      (delta >= 0 && scrollY < maxScrollY)
    );
  }

  _onKeyDown(event) {
    const { scrollbarYHeight } = tableHeightsSelector(this.props);
    if (this.props.keyboardPageEnabled) {
      switch (event.key) {
        case 'PageDown':
          this._onScroll(0, scrollbarYHeight);
          event.preventDefault();
          break;

        case 'PageUp':
          this._onScroll(0, scrollbarYHeight * -1);
          event.preventDefault();
          break;

        default:
          break;
      }
    }
    if (this.props.keyboardScrollEnabled) {
      switch (event.key) {

        case 'ArrowDown':
          this._onScroll(0, ARROW_SCROLL_SPEED);
          event.preventDefault();
          break;

        case 'ArrowUp':
          this._onScroll(0, ARROW_SCROLL_SPEED * -1);
          event.preventDefault();
          break;

        case 'ArrowRight':
          this._onScroll(ARROW_SCROLL_SPEED, 0);
          event.preventDefault();
          break;

        case 'ArrowLeft':
          this._onScroll(ARROW_SCROLL_SPEED * -1, 0);
          event.preventDefault();
          break;

        default:
          break;
      }
    }
  }

  _reportContentHeight = () => {
    const { contentHeight } = tableHeightsSelector(this.props);
    const { onContentHeightChange } = this.props;

    if (contentHeight !== this._contentHeight && onContentHeightChange) {
      onContentHeightChange(contentHeight);
    }
    this._contentHeight = contentHeight;
  }

  componentDidMount() {
    this._divRef && this._divRef.addEventListener(
      'wheel',
      this._wheelHandler.onWheel,
      { passive: false }
    );
    if (this.props.touchScrollEnabled) {
      this._divRef && this._divRef.addEventListener(
        'touchmove',
        this._touchHandler.onTouchMove,
        { passive: false }
      );
    }

    this.events = {
      end: this._handleEnd,
      move: this._handleMove,
      start: this._handleStart,
    };

    document.addEventListener('mousemove', this._onMouseMove);
    document.addEventListener('mouseup', this._onMouseUp);

    // if (this._divRefRows) {
    //   Object.keys(this.events).forEach((key) =>
    //     events[key].forEach((eventName) =>
    //     this._divRefRows.addEventListener(eventName, this.events[key], false),
    //     ),
    //   );
    // }

    this._reportContentHeight();
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this._onMouseMove);
    document.removeEventListener('mouseup', this._onMouseUp);
  }

  componentWillReceiveProps(/*object*/ nextProps) {
    this._didScroll(nextProps);
  }

  componentDidUpdate() {
    this._reportContentHeight();
  }

  render() /*object*/ {
    const {
      ariaGroupHeaderIndex,
      ariaHeaderIndex,
      ariaFooterIndex,
      ariaRowCount,
      ariaRowIndexOffset,
    } = ariaAttributesSelector(this.props);

    const {
      bodyHeight,
      componentHeight,
      scrollbarXOffsetTop,
      visibleRowsHeight,
    } = tableHeightsSelector(this.props);

    const {
      className,
      gridAttributesGetter,
      maxScrollX,
      maxScrollY,
      scrollContentHeight,
      scrollX,
      scrollY,
      tableSize,
      touchScrollEnabled,
      isColumnResizing,
      columnResizingData,
      isColumnReordering,
      columnReorderingData,
      onColumnResizeEndCallback,
      elementHeights,
      scrollFlags,
      siderWidth,
    } = this.props;

    const { ownerHeight, width } = tableSize;
    const { headerHeight } = elementHeights;
    // const { cellGroupWrapperHeight, footerHeight, groupHeaderHeight, headerHeight, addRowHeight } = elementHeights;
    const { scrollEnabledX, scrollEnabledY } = scrollbarsVisible(this.props);
    const attributes = gridAttributesGetter && gridAttributesGetter();

    let dragRect;
    if (isColumnReordering) {
      const DIR_SIGN = this.props.isRTL ? -1 : 1;
      let style = {
        position: 'absolute',
        left: columnReorderingData.originalLeft,
        top: columnReorderingData.originalTop - scrollY,
        height: '100px',
        backgroundColor: 'rgba(250, 250, 250, 0.8)',
        width: columnReorderingData.columnWidth,
        padding: '5px',
        borderRadius: '3px',
        border: '1px solid lightgray',
        zIndex: 99,
      };
      let columnName;
      if (this.props.columnNameGetter) {
        columnName = this.props.columnNameGetter(columnReorderingData.columnKey);
      }
      style.transform = `translate(${columnReorderingData.dragDistanceX * DIR_SIGN}px, ${columnReorderingData.dragDistanceY * DIR_SIGN}px)`;
      dragRect = <div style={style}>{columnName}</div>;
    }

    let scrollbarY;
    if (scrollEnabledY) {
      scrollbarY =
        <Scrollbar
          size={visibleRowsHeight}
          contentSize={scrollContentHeight}
          onScroll={this._onVerticalScroll}
          verticalTop={0}
          position={scrollY}
          touchEnabled={touchScrollEnabled}
          isRTL={this.props.isRTL}
        />;
    }

    let scrollbarX;
    if (scrollEnabledX) {
      scrollbarX =
        <HorizontalScrollbar
          contentSize={width + maxScrollX}
          offset={scrollbarXOffsetTop}
          onScroll={this._onHorizontalScroll}
          position={scrollX}
          size={width - (scrollFlags.showScrollbarY === true ? Scrollbar.SIZE : 0)}
          touchEnabled={touchScrollEnabled}
          isRTL={this.props.isRTL}
        />;
    }

    const rows = this._renderRows(ariaGroupHeaderIndex, ariaHeaderIndex, ariaFooterIndex, 
      ariaRowIndexOffset, bodyHeight, componentHeight, siderWidth);

    var tabIndex = null;
    if (this.props.keyboardPageEnabled || this.props.keyboardScrollEnabled) {
      tabIndex = 0;
    }

    const dragKnob =
      <ColumnResizerLine
        height={componentHeight}
        initialWidth={columnResizingData.width || 0}
        minWidth={columnResizingData.minWidth || 0}
        maxWidth={columnResizingData.maxWidth || Number.MAX_VALUE}
        visible={!!isColumnResizing}
        leftOffset={columnResizingData.left || 0}
        knobHeight={headerHeight}
        initialEvent={columnResizingData.initialEvent}
        onColumnResizeEnd={onColumnResizeEndCallback}
        columnKey={columnResizingData.key}
        touchEnabled={touchScrollEnabled}
        isRTL={this.props.isRTL}
      />;

    let topShadow;
    if (scrollY) {
      topShadow =
        <div
          className={joinClasses(
            cx('fixedDataTableLayout/topShadow'),
            cx('public/fixedDataTable/topShadow'),
          )}
          style={{top: 0}}
        />;
    }

    // ownerScrollAvailable is true if the rows rendered will overflow the owner element
    // so we show a shadow in that case even if the FDT component can't scroll anymore
    const ownerScrollAvailable = ownerHeight && ownerHeight < componentHeight &&
      scrollContentHeight > visibleRowsHeight;
    let bottomShadow;
    if (ownerScrollAvailable || scrollY < maxScrollY) {
      bottomShadow =
        <div
          className={joinClasses(
            cx('fixedDataTableLayout/bottomShadow'),
            cx('public/fixedDataTable/bottomShadow'),
          )}
          style={{top: visibleRowsHeight}}
        />;
    }
    //var tabIndex = null;
    if (this.props.keyboardPageEnabled || this.props.keyboardScrollEnabled) {
      tabIndex = 0;
    }

    let tableClassName = className;
    if (this.props.isRTL) {
      tableClassName = joinClasses(tableClassName, 'fixedDataTable_isRTL');
    }

    return (
      <div
        className={joinClasses(
          tableClassName,
          cx('fixedDataTableLayout/main'),
          cx('public/fixedDataTable/main'),
        )}
        role="grid"
        aria-rowcount={ariaRowCount}
        {...attributes}
        tabIndex={tabIndex}
        onKeyDown={this._onKeyDown}
        onTouchStart={touchScrollEnabled ? this._touchHandler.onTouchStart : null}
        onTouchEnd={touchScrollEnabled ? this._touchHandler.onTouchEnd : null}
        onTouchCancel={touchScrollEnabled ? this._touchHandler.onTouchCancel : null}
        ref={this._onRef}
        style={{
          height: componentHeight,
          width
        }}> 
        <div
          className={cx('fixedDataTableLayout/rowsContainer')}
          style={{
            height: scrollbarXOffsetTop,
            width
          }}>
          {dragRect}   
          {dragKnob}
          {rows}
          {topShadow}
          {bottomShadow}
        </div>
        {scrollbarY}
        {scrollbarX}
      </div>
    );
  }

  _renderRows = (/*number*/ ariaGroupHeaderIndex, /*number*/ ariaHeaderIndex, /*number*/ ariaFooterIndex, 
    /*number*/ ariaRowIndexOffset, /*number*/ bodyHeight, /*number*/ componentHeight, siderWidth) /*object*/ => {

    const props = this.props;
    const { scrollEnabledY } = scrollbarsVisible(props);

    const {
      fixedColumnGroups,
      fixedColumns,
      fixedRightColumnGroups,
      fixedRightColumns,
      scrollableColumnGroups,
      scrollableColumns,
    } = columnTemplatesSelector({props:props, level:0});

    const onColumnReorder = props.onColumnReorderEndCallback ? this._onColumnReorder : null;
    
    return (
      <FixedDataTableBufferedRows
        title={props.title}
        ariaRowIndexOffset={ariaRowIndexOffset}
        ariaGroupHeaderIndex={ariaGroupHeaderIndex}
        ariaHeaderIndex={ariaHeaderIndex}
        ariaFooterIndex={ariaFooterIndex}
        isScrolling={props.scrolling}
        isCellEditing={props.isCellEditing}
        fixedColumnGroups={fixedColumnGroups}
        fixedColumns={fixedColumns}        
        fixedRightColumnGroups={fixedRightColumnGroups}
        fixedRightColumns={fixedRightColumns}
        firstViewportRowIndex={props.firstRowIndex}
        endViewportRowIndex={props.endRowIndex}
        elementHeights={props.elementHeights}
        contentHeight={props.scrollContentHeight}
        contentWidth={props.width + props.maxScrollX}
        height={bodyHeight}
        componentHeight={componentHeight}
        columnReorderingData={props.columnReorderingData}
        columnResizingData={props.columnResizingData}
        rowReorderingData={props.rowReorderingData}
        isColumnReordering={props.isColumnReordering}
        isColumnResizing={props.isColumnResizing}
        isRowReordering={props.isRowReordering}
        onNewRowAdd={props.onNewRowAddCallback}
        onFilterChange={props.onFilterChangeCallback}
        onGetListUsers={props.onGetListUsers}
        onAddNewGroup={props.onAddNewGroupCallback} 
        onColumnReorder={onColumnReorder}
        onColumnReorderMove={this._onColumnReorderMove}
        onColumnReorderEnd={this._onColumnReorderEnd}
        onColumnResize={this._onColumnResize}
        onCellEdit={this._onCellEdit}
        onCellEditEnd={this._onCellEditEnd}
        onRowClick={props.onRowClick}
        onRowContextMenu={props.onRowContextMenu}
        onRowDoubleClick={props.onRowDoubleClick}
        onRowMouseUp={this.props.onRowMouseUp}
        onRowMouseDown={this._onRowReorderStart}
        onRowMouseEnter={props.onRowMouseEnter}
        onRowMouseLeave={props.onRowMouseLeave}
        onRowTouchStart={props.touchScrollEnabled ? props.onRowTouchStart : null}
        onRowTouchEnd={props.touchScrollEnabled ? props.onRowTouchEnd : null}
        onRowTouchMove={props.touchScrollEnabled ? props.onRowTouchMove : null}
        rowClassNameGetter={props.rowClassNameGetter}
        rowExpanded={this._rowExpanded}
        rowKeyGetter={props.rowKeyGetter}
        rowSettings={props.rowSettings}
        scrollLeft={props.scrollX}
        scrollTop={props.scrollY}
        scrollableColumnGroups={scrollableColumnGroups}
        scrollableColumns={scrollableColumns}
        showLastRowBorder={true}
        width={props.tableSize.width}
        rowsToRender={props.rows}
        rowOffsets={props.rowOffsets}
        showScrollbarY={scrollEnabledY}
        container={this._divRef}
        data={props.data}
        isRTL={props.isRTL}
        siderWidth={siderWidth}
      />
    );
  }

  _onRef = (div) => {
    this._divRef = div;
    if (this.props.stopReactWheelPropagation) {
      this._wheelHandler.setRoot(div);
    }
  }

  // _onRefRows = (div) => {
  //   this._divRefRows = div;
  // }

  /**
   * This is called when a cell that is in the header of a column has its
   * resizer knob clicked on. It displays the resizer and puts in the correct
   * location on the table.
   */
  _onColumnResize = (
    /*number*/ combinedWidth,
    /*number*/ leftOffset,
    /*number*/ cellWidth,
    /*?number*/ cellMinWidth,
    /*?number*/ cellMaxWidth,
    /*number|string*/ columnKey,
    /*object*/ event
  ) => {
    const coordinates = FixedDataTableEventHelper.getCoordinatesFromEvent(event);
    const clientX = coordinates.x;
    const clientY = coordinates.y;
    this.props.columnActions.resizeColumn({
      cellMinWidth,
      cellMaxWidth,
      cellWidth,
      columnKey,
      combinedWidth,
      clientX,
      clientY,
      leftOffset,
    });
  }


  _getRowTopOffset = (rowIndex, y = 0) => {
    if (getSubLevel(rowIndex) === 0) {
      return this.props.rowOffsets[rowIndex];
    } else {
      let rootRowIndex = getRootRowIndex(rowIndex);
      let topOffset = 0;
      let subRows = this.props.subRowsGetter(rootRowIndex);
      let height = this.props.rowHeightGetter(rootRowIndex);          
      topOffset += height;
      for (let i = 0; i < subRows.length; i++) {
        const indexString = `${rootRowIndex}.${i}`;
        if (indexString === rowIndex) {
          return y ? 2 * topOffset - (y - (this.props.rowOffsets[rootRowIndex] - this.props.scrollY)) 
                    : topOffset + this.props.rowOffsets[rootRowIndex];
        }
        let height = this.props.rowHeightGetter(indexString);          
        topOffset += height;
      }
      return y ? 2 * topOffset - (y - (this.props.rowOffsets[rootRowIndex] - this.props.scrollY)) 
                : topOffset + this.props.rowOffsets[rootRowIndex];
    }
  }

  _getDropRowIndex = (y) => {
    let { firstRowIndex, rowOffsets, endRowIndex, storedHeights } = this.props;
    for (let rowIndex = firstRowIndex; rowIndex < endRowIndex; rowIndex++) {
      let offset = rowOffsets[rowIndex];
      if (y >= offset && y <= offset + storedHeights[rowIndex]) {
        let type = this.props.rowTypeGetter(rowIndex);
        let dropRowIndex = rowIndex;
        switch (type) {
          case RowType.TITLE:
            if (this._draggingRowIndex > rowIndex)
              dropRowIndex += 2;
            break;
          case RowType.HEADER:
            if (this._draggingRowIndex > rowIndex)
              dropRowIndex++;
            break;
          case RowType.ADDROW:
            if (this._draggingRowIndex < rowIndex)
              dropRowIndex --;
            break;
          case RowType.FOOTER:
            if (this._draggingRowIndex < rowIndex)
              dropRowIndex -= 2;
            else
              dropRowIndex--;
            break;
          case RowType.SUBROW: // drag subrow item
            // Todo will add sub row logic here
            break;
        }
        return dropRowIndex;
      }
    }
    return null;
  }

  _onColumnReorder = (
    /*number*/ rowIndex,
    /*string*/ columnKey,
    /*number*/ width,
    /*object*/ event,
  ) => {
    let topOffset = this._getRowTopOffset(rowIndex);
    this.props.columnActions.startColumnReorder({
      scrollStart: this.props.scrollX,
      rowIndex,
      columnKey,
      width,
      top: topOffset,
      event,
    });
  }


  _onColumnReorderMove = (/*number*/ deltaX, /*number*/ deltaY) => {
    this.props.columnActions.moveColumnReorder(deltaX, deltaY);
  }

  _onColumnReorderEnd = (/*object*/ props, /*object*/ event) => {
    const {
      columnActions,
      columnReorderingData: {
        cancelReorder,
        columnAfter,
        columnBefore,
        columnKey,
        scrollStart,
      },
      onColumnReorderEndCallback,
      onHorizontalScroll,
      scrollX,
    } = this.props;

    columnActions.stopColumnReorder();
    if (cancelReorder) {
      return;
    }

    onColumnReorderEndCallback({
      columnAfter,
      columnBefore,
      reorderColumn: columnKey,
    });

    if (scrollStart !== scrollX && onHorizontalScroll) {
      onHorizontalScroll(scrollX)
    };
  }

  _onCellEdit = (rowIndex, columnKey, popupHeight = 0) => {
    //add additional height
    if (popupHeight > 0) {
      const newHeight = this.props.rowOffsets[rowIndex] + 50 + popupHeight;
      if (newHeight > this._contentHeight) {
          this.props.displayActions.adjustHeight(newHeight - this._contentHeight);
      }
    }
    this.props.cellActions.startCellEdit({rowIndex, columnKey});
  }

  _onCellEditEnd = (rowIndex, columnKey) => {
    if (this.props.CellEditingData && this.props.CellEditingData.rowIndex === rowIndex 
      && this.props.CellEditingData.columnKey === columnKey) {
      this.props.cellActions.endCellEdit();
      this.props.displayActions.adjustHeight(0);
    }
  }

  _onRowReorderStart = (event, rowIndex) => {   
    if (this.props.isCellEditing) {
      return;
    } 
    let { rowOffsets, storedHeights, rowSettings } = this.props; 
    this._position = getPosition(event, this._divRef);
    let type = rowSettings.rowTypeGetter(rowIndex); 
    if (type === RowType.ROW) {
      this._draggingRowIndex = rowIndex;
      this._draggingHeight = storedHeights[rowIndex];
      this._originalTop = rowOffsets[rowIndex];
    } else if (type === RowType.SUBROW) {
      // Todo add subrow logic here
    }
  }

  _onMouseMove(event) {
    // not selected any row
    if (!this._draggingRowIndex) {
      return;
    }

    let { scrollX, scrollY } = this.props; 
    const position = getPosition(event, this._divRef);
    const delta = {
      x: this._position.x - position.x,
      y: this._position.y - position.y,
    };
    
   
    if (this._dragging) {
      ///here find a place to drop the dragging row
      if (position.x > this.props.width - DRAG_SCROLL_BUFFER) {
        this._onScroll(DRAG_SCROLL_SPEED, 0);
      } else if (position.x <= DRAG_SCROLL_BUFFER) {
        this._onScroll(DRAG_SCROLL_SPEED * -1, 0);
      }
  
      if (position.y > this.props.height - DRAG_SCROLL_BUFFER) {
        this._onScroll(0, DRAG_SCROLL_SPEED);
      } else if (position.y <= DRAG_SCROLL_BUFFER) {
        this._onScroll(0, DRAG_SCROLL_SPEED * -1);
      }

      const y = Math.min(position.y + scrollY, this.props.scrollContentHeight);
      const dropRowIndex = this._getDropRowIndex(y);

      if (dropRowIndex) { 
        this.props.rowActions.moveRowReorder({
          deltaX: delta.x,
          deltaY: delta.y,
          newRowIndex: dropRowIndex,
        });

        this._dropRowIndex = dropRowIndex;
        event.preventDefault();
      }
      return;
    }

    const combinedDelta = Math.abs(delta.x) + Math.abs(delta.y);

    if (combinedDelta > 20 && this._draggingRowIndex) {
      this._dragging = true;
      this.props.rowActions.startRowReorder({
        left: scrollX,
        top: this._originalTop,
        rowIndex: this._draggingRowIndex,
        height: this._draggingHeight,
        scrollLeft: Math.round(this.props.scrollX),
        scrollTop: Math.round(this.props.scrollY),
      });
      event.preventDefault();
      event.stopPropagation();
    }
 
  }

  _onMouseUp(event) {
    this._draggingRowIndex = undefined;
    this._dragging = false;
    if (this.props.isRowReordering) {
      this.props.rowActions.stopRowReorder();
      if (this.props.rowReorderingData.oldRowIndex !== this.props.rowReorderingData.newRowIndex
         && this.props.onRowReorderEndCallback) {
        this.props.onRowReorderEndCallback(
          this.props.rowReorderingData.oldRowIndex, 
          this.props.rowReorderingData.newRowIndex);
      };
      event.preventDefault();
      event.stopPropagation();
    }
  }

  _onScroll = (/*number*/ deltaX, /*number*/ deltaY) => {
    const {
      maxScrollX,
      maxScrollY,
      onHorizontalScroll,
      onVerticalScroll,
      scrollActions,
      scrollFlags,
      scrollX,
      scrollY,
    } = this.props;
    const { overflowX, overflowY } = scrollFlags;

    let x = scrollX;
    let y = scrollY;
    if (Math.abs(deltaY) > Math.abs(deltaX) && overflowY !== 'hidden') {
      y += deltaY;
      y = y < 0 ? 0 : y;
      y = y > maxScrollY ? maxScrollY : y;

      //NOTE (jordan) This is a hacky workaround to prevent FDT from setting its internal state
      if (onVerticalScroll ? onVerticalScroll(y) : true) {
        scrollActions.scrollToY(y);
      }
    } else if (deltaX && overflowX !== 'hidden') {
      x += deltaX;
      x = x < 0 ? 0 : x;
      x = x > maxScrollX ? maxScrollX : x;

      // This is a workaround to prevent content blurring. This happens when translate3d
      // is applied with non-rounded values to elements having text.
      var roundedX = Math.round(x);

      //NOTE (asif) This is a hacky workaround to prevent FDT from setting its internal state
      if (onHorizontalScroll ? onHorizontalScroll(roundedX) : true) {
        scrollActions.scrollToX(roundedX);
      }
    }
  }

  _onHorizontalScroll = (/*number*/ scrollPos) => {
    const {
      onHorizontalScroll,
      scrollActions,
      scrollX,
    } = this.props;

    if (scrollPos === scrollX) {
      return;
    }

    // This is a workaround to prevent content blurring. This happens when translate3d
    // is applied with non-rounded values to elements having text.
    var roundedScrollPos = Math.round(scrollPos);

    if (onHorizontalScroll ? onHorizontalScroll(roundedScrollPos) : true) {
      scrollActions.scrollToX(roundedScrollPos);
    }
  }

  _onVerticalScroll = (/*number*/ scrollPos) => {
    const {
      onVerticalScroll,
      scrollActions,
      scrollY,
    } = this.props;

    if (scrollPos === scrollY) {
      return;
    }

    if (onVerticalScroll ? onVerticalScroll(scrollPos) : true) {
      scrollActions.scrollToY(scrollPos);
    }
  }

  _rowExpanded = ({ rowIndex, height, width }) => {
    let props = this.props;
    let subRows = props.subRowsGetter(rowIndex);
    const onColumnReorder = props.onColumnReorderEndCallback ? this._onColumnReorder : null;
    if (subRows.length == 0) {
      return null;
    }
    const style = {
      paddingTop: '3px',
      height: height,
      width: width,
      overflow: 'hidden', 
    }
    const {
      fixedColumns,
      fixedRightColumns,
      scrollableColumns,
    } = columnTemplatesSelector({props:props, level:1});

    //sum up width of all columns
    let subwidth = 0;
    fixedColumns.cell.forEach(c=> subwidth += c.props.width);
    fixedRightColumns.cell.forEach(c=> subwidth += c.props.width);
    scrollableColumns.cell.forEach(c=> subwidth += c.props.width);
    let rows = [];
    let offset = 0;
    let subRowIndex = 0;
    for (let i = 0; i < subRows.length; i++) {
      let type = subRows[i].rowType;
      let rowHeight = props.subRowHeightGetter(type);
      let indexString = `${rowIndex}.${subRowIndex}`;
      let rowProps = {};
      rowProps.height = rowHeight;
      rowProps.offsetTop = offset;

      rowProps.rowKey = props.rowKeyGetter ? props.rowKeyGetter(indexString) : i;

      rowProps.attributes = props.rowSettings.rowAttributesGetter && props.rowSettings.rowAttributesGetter(rowIndex);
      let row;
      switch (type) {
        case RowType.SUBHEADER:
          row =
            <FixedDataTableRow
              key={i}
              index={indexString}
              isHeaderOrFooter={true}
              isScrolling={props.isScrolling}
              isRowReordering={props.isRowReordering}
              rowReorderingData={props.rowReorderingData}
              className={joinClasses(
                cx('fixedDataTableLayout/header'),
                cx('public/fixedDataTable/header'),
              )}
              width={subwidth}
              height={rowHeight}
              offsetTop={offset}
              scrollLeft={Math.round(props.scrollX)}
              visible={true}
              fixedColumns={fixedColumns.header}
              fixedRightColumns={fixedRightColumns.header}
              scrollableColumns={scrollableColumns.header}
              touchEnabled={props.touchScrollEnabled}
              onColumnResize={this._onColumnResize}
              onColumnReorderMove={this._onColumnReorderMove}
              onColumnReorderEnd={this._onColumnReorderEnd}
              onColumnReorder={onColumnReorder}
              isColumnReordering={!!props.isColumnReordering}
              columnReorderingData={props.columnReorderingData}
              showScrollbarY={props.scrollEnabledY}
              container={this._divRef}
              data={props.data}
              isRTL={props.isRTL}>
            </FixedDataTableRow>
          break;
        case RowType.SUBADDROW:
          row =
            <MainTableAddRow
              key={i}
              index={indexString}
              isScrolling={props.isScrolling}
              isRowReordering={props.isRowReordering}
              rowReorderingData={props.rowReorderingData}
              height={rowHeight}
              width={subwidth}
              rowReorderingData={props.rowReorderingData}
              offsetTop={offset}
              scrollLeft={Math.round(props.scrollX)}
              fixedColumns={fixedColumns.cell}
              fixedRightColumns={fixedRightColumns.cell}
              scrollableColumns={scrollableColumns.cell}
              showScrollbarY={props.scrollEnabledY}
              isRTL={props.isRTL}
              container={this._divRef}
              data={props.data}
              visible={true}
              onNewRowAdd={props.onNewRowAddCallback}
            />;
          break;

        case RowType.SUBFOOTER:
          row =
            <FixedDataTableRow
              key={i}
              index={indexString}
              isHeaderOrFooter={true}
              isTableFooter={true}
              isScrolling={props.isScrolling}
              isRowReordering={props.isRowReordering}
              rowReorderingData={props.rowReorderingData}
              className={joinClasses(
                cx('fixedDataTableLayout/footer'),
                cx('public/fixedDataTable/footer'),
              )}
              width={subwidth}
              height={rowHeight}
              offsetTop={offset}
              visible={true}
              fixedColumns={fixedColumns.footer}
              fixedRightColumns={fixedRightColumns.footer}
              scrollableColumns={scrollableColumns.footer}
              scrollLeft={Math.round(props.scrollX)}
              showScrollbarY={props.scrollEnabledY}
              container={this._divRef}
              data={props.data}
              isRTL={props.isRTL}
            />;
          break;

        default:
          row =
            <FixedDataTableRow
              index={indexString}
              key={i}
              isHeaderOrFooter={false}
              zIndex={2}
              isScrolling={props.isScrolling}
              width={subwidth}
              height={rowHeight}
              scrollLeft={Math.round(props.scrollX)}
              scrollTop={Math.round(props.scrollTop)}
              fixedColumns={fixedColumns.cell}
              fixedRightColumns={fixedRightColumns.cell}
              scrollableColumns={scrollableColumns.cell}
              onClick={props.onRowClick}
              isRowReordering={props.isRowReordering}
              rowReorderingData={props.rowReorderingData}
              onCellEdit={this._onCellEdit}
              onCellEditEnd={this._onCellEditEnd}
              onContextMenu={props.onRowContextMenu}
              onDoubleClick={props.onRowDoubleClick}
              onMouseDown={this._onRowReorderStart}
              onMouseUp={props.onRowMouseUp}
              onMouseEnter={props.onRowMouseEnter}
              onMouseLeave={props.onRowMouseLeave}
              onTouchStart={props.onRowTouchStart}
              onTouchEnd={props.onRowTouchEnd}
              onTouchMove={props.onRowTouchMove}
              showScrollbarY={props.showScrollbarY}
              isRTL={props.isRTL}
              visible={true}
              container={this._divRef}
              data={props.data}
              {...rowProps}
            />
      }
      rows.push(row);
      offset += rowHeight;
      subRowIndex ++;
    }
    return (
      <div style={style}>
        {rows}
      </div>
    );
  }

  /**
   * Calls the user specified scroll callbacks -- onScrollStart, onScrollEnd, onHorizontalScroll, and onVerticalScroll.
   */
  _didScroll = (/* !object */ nextProps) => {
    const {
      onScrollStart,
      scrollX,
      scrollY,
      onHorizontalScroll,
      onVerticalScroll,
      tableSize: { ownerHeight },
    } = nextProps;

    const {
      endRowIndex: oldEndRowIndex,
      firstRowIndex: oldFirstRowIndex,
      scrollX: oldScrollX,
      scrollY: oldScrollY,
      tableSize: { ownerHeight: oldOwnerHeight },
    } = this.props;

    // check if scroll values have changed - we have an extra check on NaN because (NaN !== NaN)
    const ownerHeightChanged = ownerHeight !== oldOwnerHeight && !(isNaN(ownerHeight) && isNaN(oldOwnerHeight));
    const scrollXChanged = scrollX !== oldScrollX;
    const scrollYChanged = scrollY !== oldScrollY;

    // if none of the above changed, then a scroll didn't happen at all
    if (!ownerHeightChanged && !scrollXChanged && !scrollYChanged) {
      return;
    }

    // only call onScrollStart if scrolling wasn't on previously
    if (!this.props.scrolling && onScrollStart) {
      onScrollStart(oldScrollX, oldScrollY, oldFirstRowIndex, oldEndRowIndex)
    }

    if (scrollXChanged && onHorizontalScroll) {
      onHorizontalScroll(scrollX);
    }

    if (scrollYChanged && onVerticalScroll) {
      onVerticalScroll(scrollY);
    }

    // debounced version of didScrollStop as we don't immediately stop scrolling
    this._didScrollStop();
  }

  // We need two versions of this function, one to finish up synchronously (for
  // example, in componentWillUnmount), and a debounced version for normal
  // scroll handling.
  _didScrollStopSync = () => {
    const {
      endRowIndex,
      firstRowIndex,
      onScrollEnd,
      scrollActions,
      scrollX,
      scrollY,
      scrolling,
    } = this.props;

    if (!scrolling) {
      return;
    }

    scrollActions.stopScroll();

    if (onScrollEnd) {
      onScrollEnd(scrollX, scrollY, firstRowIndex, endRowIndex);
    }
  }
}

class HorizontalScrollbar extends React.PureComponent {
  static propTypes = {
    contentSize: PropTypes.number.isRequired,
    offset: PropTypes.number.isRequired,
    onScroll: PropTypes.func.isRequired,
    position: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    isRTL: PropTypes.bool,
  }

  componentWillMount() {
    this._initialRender = true;
  }

  componentDidMount() {
    this._initialRender = false;
  }

  render() /*object*/ {
    const {
      offset,
      size,
    } = this.props;

    const outerContainerStyle = {
      height: Scrollbar.SIZE,
      width: size,
    };

    const innerContainerStyle = {
      height: Scrollbar.SIZE,
      overflow: 'hidden',
      width: size,
      top: offset,
    };
    
    return (
      <div
        className={joinClasses(
          cx('public/fixedDataTable/horizontalScrollbar'),
        )}
        style={outerContainerStyle}>
        <div style={innerContainerStyle}>
          <Scrollbar
            {...this.props}
            isOpaque={true}
            orientation="horizontal"
            offset={undefined}
          />
        </div>
      </div>
    );
  }
}
export default FixedDataTable;
