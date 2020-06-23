import React from 'react';
import {Overlay} from 'react-overlays';
import styled from 'styled-components';
import Keys from '../maintable/vendor_upstream/core/Keys';
import moment from 'moment';
import 'moment/locale/zh-cn';
import {TableCell} from './columnlib/cell/TableCell';
import {TableContext} from '../maintable/data/DataContext';
import getHighlightText from '../maintable/getHighlightText';
import {message} from 'antd';

const CellContainer = styled.div`
  display: flex;
  flex: 1 0 100%;
  align-items: center;
  height: 100%;
  overflow: hidden;
  margin: 0px 5px;
  padding: 5px;
`;

class ColumnHeaderCell extends React.PureComponent {
  constructor(props) {
    super(props);
    let cellData = this.getCellData(props);
    this.state = {
      value: cellData.value,
      oldValue: cellData.value, // 保留原值
      isCollapsed: cellData.isCollapsed,
      editing: false,
      mouseIn: false,
      type: 'TEXT',
      isHeaderOrFooter: true,
      handleChange: this.handleChange,
      handleKey: this.handleKey,
      handleHide: this.handleHide,
    };
    this.cellRenderValues = {
      TEXT: true,
      NUMBER: true,
      SELECT: true,
      DATE: false,
      PEOPLE: false,
      STATUS: false,
    };
  }

  /**
   * 读取单元格数据，若row为空则取列标题名称(若分区折叠时则只显示分区名称)
   */
  getCellData = (props) => {
    let isCollapsed;
    if (typeof props.rowIndex === 'string') {
      isCollapsed = false;
    } else {
      isCollapsed = props.data._indexMap[props.rowIndex].isCollapsed;
    }

    let value = '';
    let editing = false;
    if (props.data.getObjectAt(props.rowIndex)) {
      value = props.data.getObjectAt(props.rowIndex)[props.columnKey];
    } else {
      if (isCollapsed) {
        value = '';
      } else {
        let column = props.data.getColumn(props.columnKey);
        value = column.name;
        editing = column.isEditing;
      }
    }
    let cellData = {
      isCollapsed,
      value,
      editing
    };

    return cellData;
  };

  componentWillReceiveProps(props) {
    let cellData = this.getCellData(props);
    if (cellData.editing) {
      this.setState({
        editing: cellData.editing,
        value: cellData.value,
        isCollapsed: cellData.isCollapsed,
      });
    }
    else {
      this.setState({
        value: cellData.value,
        isCollapsed: cellData.isCollapsed,
      });
    }
    
    this.setState({version: props.dataVersion});
  }

  setTargetRef = (ref) => (this.targetRef = ref);

  getTargetRef = () => this.targetRef;

  updateValue = () => {
    if (this.props.data) {
      // 有行数据
      if (this.props.data.getObjectAt(this.props.rowIndex)) {
        this.props.data.setObjectAt(this.props.rowIndex, this.props.columnKey, this.state.value);
      } else {
        // 修改列名
        if (this.state.value) {
          this.props.data.setColumnData(this.props.columnKey, {
            name: this.state.value,
          });
        } else {
          this.props.data.setColumnData(this.props.columnKey, {
            name: this.state.oldValue,
          });
        }
      }
    }
  };

  handleClick = (type) => {
    if (type) {
      const columnCanEditor = this.cellRenderValues[type];
      if (columnCanEditor) {
        this.setState({editing: true});
      }
    } else {
      this.setState({editing: true});
    }
  };

  handleHide = () => {
    this.updateValue();
    this.props.data.updateColumnEditing(this.props.columnKey, false);
    this.setState({editing: false});
  };

  handleChange = (value) => {
    if (!value) {
      message.warning('列名不能为空');
      return;
    }
    this.setState({
      value: value,
    });
  };

  handleKey = (e) => {
    if (e.keyCode === Keys.RETURN) {
      this.handleHide();
      return;
    }
  };

  getColumnCompentTypeByColumnKey = (columnKey, columns) => {
    for (let i = 0, len = columns.length; i < len; i++) {
      let column = columns[i];
      if (columnKey === column.columnKey) {
        return column.columnComponentType;
      }
    }
  };

  setMouseIn(mouseIn) {
    this.setState({
      mouseIn: mouseIn,
    });
  }

  render() {
    const {container, width, height} = this.props;
    const {value, editing, type} = this.state;

    const inputStyle = {
      width: width - 10,
      height: height - 5,
      borderRadius: '0px',
    };
 
    // let classNameStr;
    // if (!isHeaderOrFooter) {
    //     classNameStr =  'editableCell ' + (this.state.mouseIn ? 'mouseIn':'mouseOut');
    // }
    return (
      <CellContainer
        ref={this.setTargetRef}
        onClick={this.handleClick.bind(this, type)}
        onMouseEnter={() => this.setMouseIn(true)}
        onMouseLeave={() => this.setMouseIn(false)}
        //className={classNameStr}
        // style={this.getPeopleFilterStyle(type, editing, value)}
      >
        {!editing && this.cellRenderValues[type] && value}
        {!editing && !this.cellRenderValues[type] && (
          <TableContext.Provider value={this.state}>
            <TableCell></TableCell>
          </TableContext.Provider>
        )}
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
                  width: (width - 36),
                  top: placement === 'top' ? this.targetRef.offsetHeight : -this.targetRef.offsetHeight,
                }}
              >
                <TableContext.Provider value={this.state}>
                  <TableCell></TableCell>
                </TableContext.Provider>
              </div>
            )}
          </Overlay>
        )}
      </CellContainer>
    );
  }
}

export {ColumnHeaderCell};
