import React from 'react';
import {Overlay} from 'react-overlays';
import {Badge, Icon, Tooltip} from 'antd';
import {Input} from 'semantic-ui-react';
import Keys from '../maintable/vendor_upstream/core/Keys';
import styled from 'styled-components';
import getHighlightText from '../maintable/getHighlightText';
import {EditOutlined, UnorderedListOutlined, MessageOutlined} from '@ant-design/icons';
import '../maintable/css/style/RowHeaderCell.less';
import {connect} from 'react-redux';
import {dealRowHeaderDrawer} from '../maintable/actions/rowActions';

const CellContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  overflow: hidden;
  cursor: pointer;
  text-align: left;
  padding: 5px;
`;

@connect((state) => ({isOpenRowHeaderDrawer: state.isOpenRowHeaderDrawer, drawerRowIndex: state.rowIndex}), {
  dealRowHeaderDrawer,
})
class RowHeaderCell extends React.PureComponent {
  constructor(props) {
    super(props);
    let value = props.data ? props.data.getCellValue(props.rowIndex, props.columnKey) : props.value;
    this.state = {
      value: value,
      displayValue: getHighlightText(value, props.filterInputValue),
      count: props.data ? props.data.getSubRowCount(props.rowIndex) : 0,
      editing: false,
      handleChange: this.handleChange,
      handleKey: this.handleKey,
      updateInfoCount: this.getRowUpdateInfoCount(props),
      notReadNotifications: this.getNotifications(props),
    };
  }

  componentWillReceiveProps(props) {
    let value = props.data ? props.data.getCellValue(props.rowIndex, props.columnKey) : props.value;
    this.setState({
      value: value,
      displayValue: getHighlightText(value, props.filterInputValue),
      count: props.data ? props.data.getSubRowCount(props.rowIndex) : 0,
      version: props.dataVersion,
      updateInfoCount: this.getRowUpdateInfoCount(props),
      notReadNotifications: this.getNotifications(props),
    });
  }

  getRowUpdateInfoCount = (props) => {
    // 滑窗里菜单Update Info数据
    let count = props.data.getRowThreadCount(props.rowIndex);
    return count;
  };

  getNotifications = (props) => {
    return props.data.getNotificationsByRowId(props.rowIndex);
  };

  setTargetRef = (ref) => (this.targetRef = ref);

  getTargetRef = () => this.targetRef;

  handleClick = (e) => {
    // 防止document事件的冒泡
    e.stopPropagation();
    e.preventDefault();
    this.props.onCellEdit(this.props.rowIndex, this.props.columnKey);
    this.setState({editing: true});
  };

  handleInputClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  handleHide = () => {
    if (this.props.data) {
      this.props.data.setObjectAt(this.props.rowIndex, this.props.columnKey, this.state.value);
    }
    this.setState({editing: false});
    this.props.onCellEditEnd(this.props.rowIndex, this.props.columnKey);
  };

  handleChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  handleKey = (e) => {
    if (e.keyCode == Keys.RETURN) {
      this.handleHide();
      return;
    }
  };

  toggleSubRows = (count, event) => {
    event.stopPropagation();
    if (count > 0) {
      this.props.data.toggleSubRows(this.props.rowIndex);
    }
  };
  
    getNotifications = (props) => {
      return props.data.getNotificationsByRowId(props.rowIndex)
    }

    setTargetRef = ref => (this.targetRef = ref);

    getTargetRef = () => this.targetRef;

    handleClick = (e) => {
      // 防止document事件的冒泡
      e.stopPropagation();
      e.preventDefault();
      this.props.onCellEdit(this.props.rowIndex, this.props.columnKey)
      this.setState({ editing: true });
      
    }

    handleInputClick = (e) => {
      e.stopPropagation();
      e.preventDefault();
    }

    handleHide = () => {
        if (this.props.data) {
            this.props.data.setObjectAt(this.props.rowIndex, this.props.columnKey, this.state.value);
        }
        this.setState({ editing: false });
        this.props.onCellEditEnd(this.props.rowIndex, this.props.columnKey);
    }

    handleChange = (e)=> {
        this.setState({
            value: e.target.value,
        });
    }

    handleKey = e => {
        if (e.keyCode == Keys.RETURN) {
            this.handleHide();
            return;
        }
    }

    toggleSubRows = (count, event) => {
      event.stopPropagation();
      if (count > 0) {
        this.props.data.toggleSubRows(this.props.rowIndex);
      }
    }

    // 显示右侧滑窗
    showRowDrawer = (event) => {
      event.stopPropagation();
      const { value } = this.state
      const { data, rowIndex } = this.props
      let rowId = data.getRowKey(rowIndex)
      let groupId = data.getGroupByRowIndex(rowIndex).groupKey
      this.props.dealRowHeaderDrawer({rowHeaderDrawerTitle: value, data, rowId, rowIndex, groupId, isOpenRowHeaderDrawer: true})
    }

    getCellComponent = () => {
      const { height } = this.props;
      const { count, displayValue, updateInfoCount, notReadNotifications } = this.state;
      
      //当前行的回复是否都已读(逻辑：有未读的显示蓝色并且显示未读的个数，没有未读的显示灰色并且显示所有个数)
      let countColor = notReadNotifications.length > 0 ? '#009AFF' : '#D3D3D3';
      return (
        <>
          <div className="row_header_cell_text_component" style={{lineHeight: `${height - 12}px`}}>
            <i onClick={this.handleClick.bind(this)} className="row_header_cell_edit_icon">
              <EditOutlined />
            </i>
            <Tooltip placement="top" title={displayValue} arrowPointAtCenter>
              <div className="row_header_cell_text">
                {displayValue}
              </div>
            </Tooltip>
          </div>
          {count>0 && 
          <div style={{marginLeft: 4, lineHeight: `${height - 12}px`}} onClick={this.toggleSubRows.bind(this, count)}>
            <UnorderedListOutlined />
            &nbsp;{count}
          </div>
        }
        <div className="row_header_cell_update" style={{lineHeight: `${height - 12}px`}}>
          {/* <span>
              <Badge count={updateInfoCount} style={{backgroundColor: '#BB0000'}} />
            </span> */}
          <span>
            <MessageOutlined style={{fontSize: 24, color: countColor}} />
          </span>
          <span>
            <Badge
              count={notReadNotifications.length > 0 ? notReadNotifications.length : updateInfoCount}
              style={{
                fontSize: 10,
                marginLeft: -15,
                width: 14,
                height: 14,
                padding: '0px 0px 4px',
                minWidth: 'unset',
                lineHeight: '14px',
                backgroundColor: countColor,
              }}
            />
          </span>
        </div>
      </>
    );
  };

  render() {
    const {
      container,
      data,
      rowIndex,
      columnKey,
      dataVersion,
      width,
      height,
      isOpenRowHeaderDrawer,
      drawerRowIndex,
      ...props
    } = this.props;
    const {value, editing} = this.state;
    const inputStyle = {
      width: width - 10,
      height: height - 5,
      borderRadius: '0px',
    };
    let group = data.getGroupByRowIndex(rowIndex);
    let groupColor = group ? group.color : '#f1f3f5';
    let cellStyle = {
      // borderLeft: '3px solid '+groupColor,
    };

    if (editing) {
      cellStyle.margin = '0px 5px';
    }

    if (isOpenRowHeaderDrawer && drawerRowIndex === rowIndex) {
      cellStyle.border = '1px solid rgba(31, 118, 194, 100)';
      cellStyle.background = '#e3e6eb';
    }

    return (
      <>
        <CellContainer
          ref={this.setTargetRef}
          className="row_header_cell_component"
          onClick={this.showRowDrawer}
          style={cellStyle}
        >
          {!editing && this.getCellComponent()}
          {editing && this.targetRef && (
            <Overlay
              show
              flip
              rootClose
              container={this.getTargetRef}
              target={this.getTargetRef}
              onHide={this.handleHide}
              onExit={this.handleHide}
            >
              {({props, placement}) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    width: this.targetRef.offsetWidth,
                    top: placement === 'top' ? this.targetRef.offsetHeight : -this.targetRef.offsetHeight,
                  }}
                >
                  <Input
                    autoFocus
                    value={value}
                    onChange={this.handleChange}
                    style={inputStyle}
                    onKeyDown={this.handleKey}
                    onClick={this.handleInputClick}
                  />
                </div>
              )}
            </Overlay>
          )}
        </CellContainer>
      </>
    );
  }
}

export {RowHeaderCell};
