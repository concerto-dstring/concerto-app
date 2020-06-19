import React from 'react';
import {Overlay} from 'react-overlays';
import styled from 'styled-components';
import Keys from '../../../maintable/vendor_upstream/core/Keys';
import moment from 'moment';
import 'moment/locale/zh-cn';
import {TableCell} from '../cell/TableCell';
import {TableContext} from '../../../maintable/data/DataContext';
import './EditableCell.less';
import getHighlightText from '../../../maintable/getHighlightText';

const CellContainer = styled.div`
  display: flex;
  flex: 1 0 100%;
  align-items: center;
  height: 31px;
  overflow: hidden;
`;

class EditableCell extends React.PureComponent {
  constructor(props) {
    super(props);
    let cellData = this.getCellData(props, null);
    this.state = {
      value: cellData.value,
      displayValue: cellData.displayValue,
      oldValue: cellData.value, // 保留原值
      isCollapsed: cellData.isCollapsed,
      editing: false,
      mouseIn: false,
      type: cellData.type,
      isHeaderOrFooter: false,
      data: props.data,
      filterInputValue: props.filterInputValue,
      handleChange: this.handleChange,
      handleKey: this.handleKey,
      handleHide: this.handleHide,
      handleCellEdit: this.handleCellEdit,
      handleCellFocus: this.handleCellFocus,
    };
    this.cellRenderValues = {
      TEXT: true,
      NUMBER: true,
      SELECT: true,
      DATE: false,
      PEOPLE: false,
      STATUS: false,
    };

    this.popupHeights = {
      DATE: 450,
      PEOPLE: 364,
      STATUS: 250,
    };
  }

  /**
   * 读取单元格数据，若row为空则取列标题名称(若分区折叠时则只显示分区名称)
   */
  getCellData = (props, oldValue) => {
    let isCollapsed;
    if (typeof props.rowIndex === 'string') {
      isCollapsed = false;
    } else {
      isCollapsed = props.data._indexMap[props.rowIndex].isCollapsed;
    }
    let type = 'TEXT';
    let value = '';
    let displayValue = '';
    let isDataChanged = false;
    if (props.data.getObjectAt(props.rowIndex)) {
      value = props.data.getObjectAt(props.rowIndex)[props.columnKey];
      type = props.data.getColumn(props.columnKey).columnComponentType;
      if (type !== 'PEOPLE' && type !== 'DATE') {
        displayValue = getHighlightText(value, props.filterInputValue);
        // 检查单元格的值是否发生变化
        isDataChanged = oldValue === null ? true : ((value ? value : '') !== oldValue)
      }
    } else {
      if (isCollapsed) {
        value = '';
        displayValue = '';
      } else {
        value = props.data.getColumn(props.columnKey).name;
        displayValue = value;
      }
    }

    let cellData = {
      isCollapsed,
      value,
      displayValue,
      type,
      isDataChanged,
    };

    return cellData;
  };

  componentWillReceiveProps(props) {
    let cellData = this.getCellData(props, this.state.oldValue ? this.state.oldValue : '');

    if (cellData.isDataChanged) {
      this.setState({
        oldValue: cellData.value,
        value: cellData.value,
        displayValue: cellData.displayValue,
        isCollapsed: cellData.isCollapsed,
        data: props.data,
        container: props.container,
        type: cellData.type,
        filterInputValue: props.filterInputValue,
      });
    } else {
      this.setState({
        displayValue: cellData.displayValue,
        isCollapsed: cellData.isCollapsed,
        data: props.data,
        container: props.container,
        type: cellData.type,
        filterInputValue: props.filterInputValue,
      });
    }
    this.setState({version: props.dataVersion});
  }

  setTargetRef = (ref) => (this.targetRef = ref);

  getTargetRef = () => this.targetRef;

  updateValue = () => {
    const {data, rowIndex, columnKey} = this.props;
    if (data) {
      // 有行数据
      if (data.getObjectAt(rowIndex)) {
        data.setObjectAt(rowIndex, columnKey, this.state.value);
      } else {
        // 修改列名
        if (this.state.value) {
          data.setColumnData(columnKey, {
            name: this.state.value,
          });
        } else {
          data.setColumnData(columnKey, {
            name: this.state.oldValue,
          });
        }
      }
    }
  };

  handleHide = () => {
    this.updateValue();
    this.setState({editing: false});
    if (this.props.onCellEditEnd) {
      this.props.onCellEditEnd(this.props.rowIndex, this.props.columnKey);
    }
  };

  saveData(value) {
    this.props.data.setObjectAt(this.props.rowIndex, this.props.columnKey, value);
  }

  handleClick = (type) => {
    if (type && type !== 'PEOPLE') {
      const columnCanEditor = this.cellRenderValues[type];
      const height = this.popupHeights[type];
      if (columnCanEditor) {
        this.setState({editing: true});
      }
      if (this.props.onCellEdit) {
        this.props.onCellEdit(this.props.rowIndex, this.props.columnKey, height);
      }
    }
  };

  handleHide = () => {
    this.setState({editing: false});
    this.updateValue();
    if (this.props.onCellEditEnd) {
      this.props.onCellEditEnd(this.props.rowIndex, this.props.columnKey);
    }
  };

  handleChange = (value, isSave) => {
    if (isSave) {
      this.saveData(value);
      if (this.props.onCellEditEnd) {
        this.props.onCellEditEnd(this.props.rowIndex, this.props.columnKey);
      }
    } else {
      this.setState({
        value: value,
      });
      if (this.props.onCellEditEnd) {
        this.props.onCellEditEnd(this.props.rowIndex, this.props.columnKey);
      }
    }
  };

  handleCellFocus = (focused) => {
    if (this.props.onCellFocus) {
      this.props.onCellFocus(this.props.rowIndex, this.props.columnKey, focused);
    }
  };

  /**
   * 弹出层高度
   * @param {*} type
   * @param {*} height
   */
  handleCellEdit = (type, height) => {
    if (this.props.onCellEdit) {
      let popupHeight = (this.popupHeights[type] ? this.popupHeights[type] : 0) + (height ? height : 0);
      this.props.onCellEdit(this.props.rowIndex, this.props.columnKey, popupHeight);
    }
  };

  handleKey = (e) => {
    if (e.keyCode === Keys.RETURN) {
      this.handleHide();
      return;
    }
  };

  getColumnComponentTypeByColumnKey = (columnKey, columns) => {
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

  getFilterStyle = (type, editing, value) => {
    let style = {};
    switch (type) {
      case 'PEOPLE':
        if (!editing && value && value instanceof Array && this.props.filterInputValue && this.props.data) {
          let filterInputValue = this.props.filterInputValue.toLowerCase();
          value.map((user) => {
            if (user.username && user.username.toLowerCase().indexOf(filterInputValue) !== -1) {
              style = {backgroundColor: '#CCE9FF'};
              return;
            }
          });
        }
        break;

      case 'DATE':
        if (!editing && value && this.props.filterInputValue && this.props.data) {
          let filterInputValue = this.props.filterInputValue.toLowerCase();
          if (value.toLowerCase().indexOf(filterInputValue) !== -1) {
            style = {backgroundColor: '#CCE9FF'};
          }
        }
      default:
        break;
    }

    return style;
  };

  render() {
    const {container, data, rowIndex, columnKey, dataVersion, width, height, ...props} = this.props;
    const {value, editing, displayValue, type} = this.state;

    return (
      <CellContainer
        ref={this.setTargetRef}
        onClick={this.handleClick.bind(this, type)}
        onMouseEnter={() => this.setMouseIn(true)}
        onMouseLeave={() => this.setMouseIn(false)}
        //className={classNameStr}  // disable for timebeing
        style={this.getFilterStyle(type, editing, value)}
      >
        {!editing && this.cellRenderValues[type] && displayValue}
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
                  width: '100%',
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

export {EditableCell};
