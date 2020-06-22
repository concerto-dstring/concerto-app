'use strict';

import PropTypes from 'prop-types';
import React from 'react';
import { Input} from 'antd';
import cx from './vendor_upstream/stubs/cx';
import { sumPropWidths } from './helper/widthHelper';
import Scrollbar from './Scrollbar';
import FixedDataTableTranslateDOMPosition from './FixedDataTableTranslateDOMPosition';

import './css/layout/fixedDataTableRowLayout.css';
import './css/style/fixedDataTableRow.css';
import './css/style/fixedDataTable.css';


/**
 * Component that renders the row for <FixedDataTable />.
 * This component should not be used directly by developer. Instead,
 * only <FixedDataTable /> should use the component internally.
 */

class MainTableAddRow extends React.Component {

  static propTypes = {

    className: PropTypes.string,
    /**
     * Array of data for the fixed columns.
     */
    fixedColumns: PropTypes.array.isRequired,

    /**
     * Height of the row.
     */
    height: PropTypes.number.isRequired,

    /**
     * The vertical position where the row should render itself
     */
    offsetTop: PropTypes.number.isRequired,

    /**
     * Height of fixedDataTableCellGroupLayout/cellGroupWrapper.
     */
    cellGroupWrapperHeight: PropTypes.number,

    /**
     * Array of data for the scrollable columns.
     */
    scrollableColumns: PropTypes.array.isRequired,

    /**
     * Array of <FixedDataTableColumn /> for the fixed columns positioned at end of the table.
     */
    fixedRightColumns: PropTypes.array.isRequired,

    /**
     * The distance between the left edge of the table and the leftmost portion
     * of the row currently visible in the table.
     */
    scrollLeft: PropTypes.number.isRequired,

    /**
     * Width of the row.
     */
    width: PropTypes.number.isRequired,

    /**
     * End edit callback
     */
    onNewRowAdd: PropTypes.func,

    /**
     * The value of the aria-rowindex attribute.
     */
    ariaRowIndex: PropTypes.number,

    /**
     * Whether the grid should be in RTL mode
     */
    isRTL: PropTypes.bool,

    /**
     * DOM attributes to be applied to the row.
     */
    attributes: PropTypes.object,
  };

  componentWillMount() {
    this._initialRender = true;
    this._onKeyPress = this._onKeyPress.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setState({newItem:''});
  }

  componentDidMount() {
    this._initialRender = false;
  }
  
  _onKeyPress(event) {
    if (event.key === 'Enter') {
      if (this.props.onNewRowAdd) {
        this.props.onNewRowAdd(this.props.index, this.state.newItem);
      }
    }
  }

  _onNewrowButton(props){
    if (props.onNewRowAdd) {
      props.onNewRowAdd(props.index, this.state.newItem);
    }
  }

  handleChange(event) {
    this.setState({newItem: event.target.value});
  }

  render() /*object*/ {
    const { offsetTop, zIndex, visible,data, ...rowProps } = this.props;

    const className = cx({
      'fixedDataTableRowLayout/main': true
    });

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
      FixedDataTableTranslateDOMPosition(placeStyle, 0, offsetTop, this._initialRender, this.props.isRTL);

      dropPlace = <div style={placeStyle}></div>;
    }  

    const fixedColumnsWidth = sumPropWidths(this.props.fixedColumns);
    var scrollableColumnsWidth = sumPropWidths(this.props.scrollableColumns);
    const fixedRightColumnsWidth = sumPropWidths(this.props.fixedRightColumns);

    const len = this.props.scrollableColumns.length;

    if (len > 0 
      && !this.props.scrollableColumns[len - 1].template) {
        scrollableColumnsWidth = scrollableColumnsWidth - this.props.scrollableColumns[len - 1].props.width;
    }

    const width = fixedColumnsWidth + scrollableColumnsWidth + fixedRightColumnsWidth - this.props.scrollLeft;
    let group = data.getGroupByRowIndex(this.props.index);
    let groupColor = group ? group.color : "rgba(0, 0, 0, 0.65)";
    var inputStyle = {
      width: width+10,
      height: this.props.height,
      zIndex: this.props.zIndex,
      borderRadius:'0px',
      background:'#fafafa',
      border:'none',
      borderLeft:'3px solid '+groupColor
    }

    var style = {
      height: this.props.height,
      zIndex: (this.props.zIndex ? this.props.zIndex : 0),
      display: (this.props.visible ? 'block' : 'none'),
     
    };

    let offset = this.props.offsetTop;
    if (this.props.isRowReordering && this.props.rowReorderingData) {
      if (this.props.rowReorderingData.newRowIndex < this.props.rowReorderingData.oldRowIndex) {
        if (this.props.index >= this.props.rowReorderingData.newRowIndex && this.props.index < this.props.rowReorderingData.oldRowIndex) {
          let height = this.props.rowReorderingData.height;
          offset += height;
        }
      } else if (this.props.rowReorderingData.newRowIndex > this.props.rowReorderingData.oldRowIndex) {
        if (this.props.index > this.props.rowReorderingData.oldRowIndex && this.props.index < this.props.rowReorderingData.newRowIndex) {
          let height = this.props.rowReorderingData.height * -1;
          offset += height;
        }
      }
    }

    FixedDataTableTranslateDOMPosition(style, 0, offset, this._initialRender, this.props.isRTL);

    var scrollbarOffset = this.props.showScrollbarY ? Scrollbar.SIZE : 0;
    
    let scrollbarSpacer = null;
    if (this.props.showScrollbarY) {
      var spacerStyles = {
        width: scrollbarOffset,
        height: this.props.height,
        // Since the box-sizing = border-box the border on the table is included in the width
        // so we need to account for the left and right border
        left: this.props.width - scrollbarOffset - 2,
      };
      scrollbarSpacer =
        <div 
          style={spacerStyles} 
          className={cx('public/fixedDataTable/scrollbarSpacer')}
        />;
    }

    return ( 
          <div style={{background:'#fafafa'}}> 
            {dropPlace}
            <div style={style} className={className} >
              <Input 
                style={inputStyle} 
                // action= {{content:'添加', onClick:() => this._onNewrowButton(this.props) }} 
                placeholder='+' 
                onKeyPress={this._onKeyPress} 
                value={this.state.newItem} 
                onChange={this.handleChange} 
              />
              {scrollbarSpacer}
            </div>
          </div>
          );
  }
}

export default MainTableAddRow;