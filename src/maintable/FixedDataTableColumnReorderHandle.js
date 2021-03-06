/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * This is to be used with the FixedDataTable. It is a header icon
 * that allows you to reorder the corresponding column.
 *
 * @providesModule FixedDataTableColumnReorderHandle
 * @typechecks
 */

import DOMMouseMoveTracker from './vendor_upstream/dom/DOMMouseMoveTracker';
import React from 'react';
import PropTypes from 'prop-types';
import FixedDataTableEventHelper from './FixedDataTableEventHelper';
import cx from './vendor_upstream/stubs/cx';

import './css/style/fixedDataTableColumnReorder.css'

class FixedDataTableColumnReorderHandle extends React.PureComponent {
  static propTypes = {

    /**
     * When reordering is complete this is called.
     */
    onColumnReorderEnd: PropTypes.func,

    /**
     * Column key for the column being reordered.
     */
    columnKey: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),

    /**
     * RowIndex for the header being reordered.
     */
    rowIndex: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),

    /**
     * Whether the reorder handle should respond to touch events or not.
     */
    touchEnabled: PropTypes.bool,

    /**
     * If the component should render for RTL direction
     */
    isRTL: PropTypes.bool,
  }

  state = /*object*/ {
    dragDistanceX: 0,
    dragDistanceY: 0,
  }

  componentWillReceiveProps(/*object*/ newProps) {
  }

  componentWillUnmount() {
    if (this._mouseMoveTracker) {
      cancelAnimationFrame(this.frameId);
      this.frameId = null;
      this._mouseMoveTracker.releaseMouseMoves();
      this._mouseMoveTracker = null;
    }
  }

  render() /*object*/ {
    var style = {
      height: this.props.height,
    };
    return (
      <div
        className={cx({
          'fixedDataTableCellLayout/columnReorderContainer': true,
          'fixedDataTableCellLayout/columnReorderContainer/active': false,
        })}
        onMouseDown={this.onMouseDown}
        onTouchStart={this.props.touchEnabled ? this.onMouseDown : null}
        onTouchEnd={this.props.touchEnabled ? e => e.stopPropagation() : null}
        onTouchMove={this.props.touchEnabled ? e => e.stopPropagation() : null}
        style={style}>
      </div>
    );
  }

  onMouseDown = (event) => {
    var targetRect = event.target.getBoundingClientRect();
    var coordinates = FixedDataTableEventHelper.getCoordinatesFromEvent(event);

    this.mouseLocationInElement = coordinates.x - targetRect.left;
    this.mouseLocationInRelationToColumnGroup = this.mouseLocationInElement + event.target.parentElement.offsetLeft;

    this._mouseMoveTracker = new DOMMouseMoveTracker(
      this._onMove,
      this._onColumnReorderEnd,
      document.body,
      this.props.touchEnabled
    );
    this._mouseMoveTracker.captureMouseMoves(event);
    this.setState({
      dragDistanceX: 0,
      dragDistanceY: 0,
    });

    this._distanceX = 0;
    this._distanceY = 0;
    this._animating = true;
    this._cumulativeX = 0;
    this._cumulativeY = 0;

    event.stopPropagation();
    /**
     * This prevents the rows from moving around when we drag the
     * headers on touch devices.
     */
    // if(this.props.touchEnabled) {
    //   event.stopPropagation();
    // }
  }

  _onMove = (/*number*/ deltaX, /*number*/ deltaY) => {
    this._distanceX = this.state.dragDistanceX + deltaX * (this.props.isRTL ? -1 : 1);
    this._distanceY = this.state.dragDistanceY + deltaY * (this.props.isRTL ? -1 : 1);
    this._cumulativeX += this._distanceX;
    this._cumulativeY += this._distanceY;
    const combinedDelta = Math.abs(this._cumulativeX) + Math.abs(this._cumulativeY);
    if (combinedDelta > 15 && !this._dragging && this._animating) {
      this._distanceX = this._cumulativeX;
      this._distanceY = this._cumulativeY;
      this._dragging = true;
      this.props.onMouseDown({
        columnKey: this.props.columnKey,
        mouseLocation: {
          dragDistanceX: 0,
          dragDistanceY: 0,
          inElement: this.mouseLocationInElement,
          inColumnGroup: this.mouseLocationInRelationToColumnGroup
        }
      });
      this.frameId = requestAnimationFrame(this._updateState);
    }
  }

  _onColumnReorderEnd = (/*boolean*/ cancelReorder) => {
    this._animating = false;
    this._dragging = false;
    cancelAnimationFrame(this.frameId);
    this.frameId = null;
    this._mouseMoveTracker.releaseMouseMoves();
    this.props.columnReorderingData.cancelReorder = cancelReorder;
    this.props.onColumnReorderEnd();
  }

  _updateState = () => {
    if (this._animating) {
      this.frameId = requestAnimationFrame(this._updateState)
    }
    this.setState({
      dragDistanceX: this._distanceX,
      dragDistanceY: this._distanceY,
    });
    this.props.onColumnReorderMove(this._distanceX, this._distanceY);
  }
}
export default FixedDataTableColumnReorderHandle;
