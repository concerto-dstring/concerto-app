// The main table view on the top of data store
// map => rowid => {rowkey, groupkey}
// rowid => [header, row, addrow, footer]

"use strict";

import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import { Table, Cell, Column } from './FixedDataTableRoot';
import { ColumnType,  RowType, ColumnKey } from './data/MainTableType';
import { TextCell, DropDownMenuCell, CheckBoxCell } from '../helpers/cells';
import ReNameRowModal from './helper/ReNameRowModal'
import DeleteRowModal from './helper/DeleteRowModal'
import AfterMoveRowModal from './helper/AfterMoveRowModal'
import { EditableCell } from '../helpers/EditableCell';
import Dimensions from 'react-dimensions';
import { Menu, Dropdown, message, Tooltip } from 'antd';
import { DataContext, AddFilter } from './data/DataContext';
import { DataVersionContext } from './data/DataContext';

import {
    UserOutlined,
    ScheduleOutlined,
    FormOutlined,
    CheckSquareOutlined,
    StrikethroughOutlined,
    AccountBookOutlined } from '@ant-design/icons';

/**
 * A cell that is aware of its context
 *
 * This cell is aware of its context and retrieves the data and its version
 * before passing it on to an ordinary cell.
 *
 * @param {object} props   Standard props
 * @param {object} data    A data object with getObjectAt() defined
 * @param {number} version A number indicating the current version of the displayed data
 */


const DataEditableCell = function(props) {
    this.props = props;
    return (
        <DataVersionContext.Consumer>
            {({data, version}) => (
                <EditableCell
                    data={data}
                    dataVersion={version}
                    {...this.props}
                />
            )}
        </DataVersionContext.Consumer>
    );
}

const DataTextCell = function(props) {
    this.props = props;
    return (
        <DataVersionContext.Consumer>
            {({data, version}) => (
                <TextCell
                    data={data}
                    dataVersion={version}
                    {...this.props}
                />
            )}
        </DataVersionContext.Consumer>
    );
}

const DropDownCell = function(props) {
  this.props = props;
  console.log(props)
  return (
    <DataVersionContext.Consumer>
        {({data, version}) => (
            <DropDownMenuCell
                data={data}
                dataVersion={version}
                isHeader={false}
                {...this.props}
            />
        )}
    </DataVersionContext.Consumer>
  )
}

const DropDownHeader = function(props) {
  this.props = props;
  return (
    <DataVersionContext.Consumer>
        {({data, version}) => (
            <DropDownMenuCell
                data={data}
                dataVersion={version}
                isHeader={true}
                {...this.props}
            />
        )}
    </DataVersionContext.Consumer>
  )
}

const FilterableDataTable = AddFilter(DataContext(Table));

class MainTable extends React.Component {

    static propTypes = {
        dataset: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props);
        this._dataset = props.dataset;

        this._onAddNewGroupCallback = this._onAddNewGroupCallback.bind(this);
        this._onRemoveGroupCallback = this._onRemoveGroupCallback.bind(this);
        this._onColumnResizeEndCallback = this._onColumnResizeEndCallback.bind(this);
        this._onColumnAddCallback = this._onColumnAddCallback.bind(this);
        this._onColumnReorderEndCallback = this._onColumnReorderEndCallback.bind(this);

        this._getColumnName = this._getColumnName(this);
        this.refresh = this.refresh.bind(this);
        this._dataset.setCallback(this.refresh, 'main');

        this.state = {
            data: this._dataset,
            filters: {'rowKey' : ''},
            columns: this._dataset.getColumns(),
            version: 0,
            isShowAddSubRowModal: false,
            isShowReNameRowModal: false,
            isShowAfterMoveRowModal: false,
            isShowDeleteRowModal: false,
            rowIndex: null,
            columnKey: null
        };
    }

    /**
     * callback assoicated with the group add button
     * @param {*} event 
     */
    _onAddNewGroupCallback(event) {
        this._dataset.addNewGroup("新组")
    }

     /**
      * callback assoicated with the group delete button
      * @param {*} groupKey 
      */
     _onRemoveGroupCallback(groupKey){
        this._dataset.removeGroup(groupKey)
     }

    _onColumnReorderEndCallback(event) {
        let {columnAfter, reorderColumn} = event;
        if (columnAfter) {
            this._dataset.reorderColumn(columnAfter, reorderColumn);
        }
    }

    getColumnWidth(columnKey) {
        let columns = this.state.columns;
        for (let index = 0; index < columns.length; index++) {
            const column = columns[index];
            if (column.columnKey === columnKey) {
                return column.width;
            }
        }
        return 80;
    }

    setColumnWidth(columnKey, width) {
        let columns = this.state.columns;
        for (let index = 0; index < columns.length; index++) {
            const column = columns[index];
            if (column.columnKey === columnKey) {
                column.width = width;
            }
        }
        this.setState({columns: columns})
    }

    _onColumnAddCallback(t) {
        const columnComponentType = t.key;
        this._dataset.addNewColumn('New Column', columnComponentType);
    }

    _getColumnName(columnKey) {
        let columns = this._dataset.getColumns();
        for (let index = 0; index < columns.length; index++) {
            const column = columns[index];
            if (column.columnKey === columnKey) {
                return column.name;
            }
        }
        return '';
    }

    getColumnTemplate(columnKey) {
        let columns = this.state.columns;
        let colTemplates = {};
        for (let i  = 0; i < columns.length; i ++) {
            let column = columns[i];
            if (columnKey === column.columnKey) {
                colTemplates.width = column.width;
                colTemplates.columnKey = columnKey;
                colTemplates.header = <EditableCell value={column.name} />;
                colTemplates.footer = <Cell>summary</Cell>;
                colTemplates.width = this.getColumnWidth(columnKey);
                colTemplates.minWidth = 70;
                colTemplates.isResizable = true;
                if (column.type === ColumnType.LABEL) { 
                    colTemplates.cell = DataTextCell;
                    return colTemplates;
                }
                if (column.type === ColumnType.EDITBOX) {
                    colTemplates.cell = DataEditableCell;
                    return colTemplates;
                }
            }
        }
        return null;
    }
    
    /**
     * 固定列(行操作列，行复选框列，行标题列)
     * @param {*} sortedRowList 
     * @param {*} column 
     */
    getFixedColumnTemplate(data, column) {
      
      let rowTemplates = {};
      const columnKey = column.columnKey
      if (columnKey == ColumnKey.ROWACTION) {
        rowTemplates.width = column.width;
        rowTemplates.columnKey = columnKey;
        rowTemplates.header = <DropDownMenuCell data={data} isHeader={true} />;
        rowTemplates.footer = null;
        rowTemplates.isResizable = false;
        rowTemplates.cell = DropDownCell(this.handleRowModal, this.moveRowToOtherSection);

        return rowTemplates
      }
      else if (columnKey == ColumnKey.ROWSELECT) {

        rowTemplates.width = column.width;
        rowTemplates.columnKey = columnKey;
        rowTemplates.header = null;
        rowTemplates.footer = null;
        rowTemplates.isResizable = false;
        rowTemplates.cell = <CheckBoxCell data={data} />;

        return rowTemplates
      }
      else {
        rowTemplates.width = column.width;
        rowTemplates.columnKey = columnKey;
        rowTemplates.header = <EditableCell value={column.name} />;
        rowTemplates.footer = <Cell>summary</Cell>;
        rowTemplates.width = this.getColumnWidth(columnKey);
        rowTemplates.minWidth = 70;
        rowTemplates.isResizable = true;
        if (column.type === ColumnType.LABEL) {
            rowTemplates.cell = DataTextCell;
        }
        else if (column.type === ColumnType.EDITBOX) {
            rowTemplates.cell = DataEditableCell;
        }
      }

      if (Object.keys(rowTemplates).length == 0) {
        return null
      }
      else {
        return rowTemplates;
      }
    }

    handleRowModal = (
      isShowAddSubRowModal, 
      isShowReNameRowModal,
      isShowAfterMoveRowModal,
      isShowDeleteRowModal, 
      rowIndex, 
      columnKey
    ) => {
      this.setState({
        isShowAddSubRowModal: isShowAddSubRowModal,
        isShowReNameRowModal: isShowReNameRowModal,
        isShowAfterMoveRowModal: isShowAfterMoveRowModal,
        isShowDeleteRowModal: isShowDeleteRowModal,
        rowIndex: rowIndex,
        columnKey: columnKey
      })
    }

    handleRef = component => {
        this.setState({ref: component});
    };

    _onColumnResizeEndCallback(newColumnWidth, columnKey) {
        this.setColumnWidth(columnKey, newColumnWidth);
    }

    refresh() {
        this.setState({
          version: this.state.version + 1,
        });
    }

    render() {
        return (
          <div className='autoScrollContainer'>
            {this.renderControls()}
            <br />
            {this.renderTable()}
          </div>
        );
    }

    renderControls() {
        return (
            <div id="addGroupBtn" className='autoScrollControls'>
              <Button primary onClick={this._onAddNewGroupCallback} >添加新分区</Button>
            </div>
          )
    }

    handleDeleteRowOKClick = () => {
      // const { sortedRowList, rowIndex } = this.state
      
      // let rowKey = sortedRowList.getRowKey(rowIndex)
      
      // let rows = sortedRowList.getRowMap();
      // let groupKey
      // for  (let ridx = 0; ridx < rows.length; ridx ++) {
      //     let row = rows[ridx];
      //     if (row && row.rowKey === rowKey) {
      //         groupKey = row.groupKey
      //         rows.splice(ridx, 1);
      //     }
      // }

      // // 删除行
      // this._dataset.removeRow(groupKey, rowKey)
      
      // this.setState({
      //   sortedRowList: new DataViewWrapper(this._dataset, rows),
      //   isShowDeleteRowModal: false
      // });
      // this._refresh();
    }

    // 移动行，并记录行原来所在的分区和行数
    moveRowToOtherSection = (sourceGroupKey, targetGroupKey, rowIndex) => {
      this.handleMoveRow(sourceGroupKey, targetGroupKey, rowIndex, null, -1, true)
    }

    handleMoveRow = (sourceGroupKey, targetGroupKey, rowIndex, 
      rowKey, insertIndex, isShowAfterMoveRowModal) => {

      // const { sortedRowList } = this.state

      // let rows = sortedRowList.getRowMap();

      // if (!rowKey) {
      //   rowKey = sortedRowList.getRowKey(rowIndex)
      // }

      // let moveRow
      // for  (let ridx = 0; ridx < rows.length; ridx ++) {
      //   let row = rows[ridx];
      //   if (row && row.rowKey === rowKey) {
      //     moveRow = row
      //     rows.splice(ridx, 1)
      //     break;
      //   }
      // }

      // moveRow.groupKey = targetGroupKey

      // if (insertIndex < 0) {
      //   for (let ridx = 0; ridx < rows.length; ridx ++) {
      //     let row = rows[ridx];
      //     if (row && row.groupKey === targetGroupKey && row.rowType === RowType.ADDROW) {
      //       insertIndex = ridx
      //       break
      //     }
      //   }
      // }

      // rows.splice(insertIndex, 0, moveRow)
      
      // sortedRowList.moveRow(sourceGroupKey, targetGroupKey, rowKey)

      // this.setState({
      //   sortedRowList: new DataViewWrapper(this._dataset, rows),
      //   isShowAfterMoveRowModal: isShowAfterMoveRowModal,
      //   sourceGroupKey: isShowAfterMoveRowModal ? sourceGroupKey : null,
      //   targetGroupKey: isShowAfterMoveRowModal ? targetGroupKey : null,
      //   rowKey: isShowAfterMoveRowModal ? rowKey : null,
      //   rowIndex: isShowAfterMoveRowModal ? rowIndex : null,
      // });
      // this._refresh();
    }

    // 撤销移动行
    cancelMoveRowToOtherSection = () => {

      const { sourceGroupKey, targetGroupKey, rowIndex,  rowKey } = this.state

      this.handleMoveRow(targetGroupKey, sourceGroupKey, -1, rowKey, rowIndex, false)
    }

    renderTable() {
        var { data, filters } = this.state;
        const addColumnStyle = {
            boxShadow: 'none',
        };
        
        const fixedColumns = this.state.columns.length > 0 ? this.state.columns.slice(0, 3) : [];
        const scrollColumns = this.state.columns.slice(3); 
        const menu = (
            <Menu onClick={this._onColumnAddCallback}>
                <Menu.Item key="DATE">
                    <ScheduleOutlined />
                    日期
                </Menu.Item>
                <Menu.Item key="NUMBER">
                    <AccountBookOutlined />
                    数字
                </Menu.Item>
                <Menu.Item key="TEXT">
                    <FormOutlined />
                    文本
                </Menu.Item>
                <Menu.Item key="SELECT">
                    <CheckSquareOutlined />
                    选择
                </Menu.Item>
                <Menu.Item key="PEOPLE">
                    <UserOutlined />
                    人员
                </Menu.Item>
                <Menu.Item key="STATUS">
                    <StrikethroughOutlined />
                    状态
                </Menu.Item>
            </Menu>
        );
        return (
            <div>
            <FilterableDataTable
                    ref={this.handleRef}
                    onColumnReorderEndCallback={this._onColumnReorderEndCallback}
                    onColumnResizeEndCallback={this._onColumnResizeEndCallback}
                    data={data}    
                    headerHeight={40}
                    rowHeight={40}
                    isColumnResizing={false}
                    addRowHeight={35}
                    footerHeight={40}
                    filters={filters}                
                    height={this.props.containerHeight}
                    // 减去左侧Sider宽度 
                    width={this.props.containerWidth - this.props.siderWidth}
                    {...this.props}>
                    {/* {fixedColumn && <Column {...this.getColumnTemplate(fixedColumn.columnKey)} fixed={true} />} */}
                    {fixedColumns.map(column => (
                      <Column {...this.getFixedColumnTemplate(data, column)} fixed={true} />
                    ))}
                    {scrollColumns.map(column => (
                        <Column {...this.getColumnTemplate(column.columnKey)} fixed={false} />
                    ))
                    }              
                    <Column
                        columnKey=""
                        header={

                            <Dropdown overlay={menu} trigger={['click']}>
                            <Button basic circular icon='plus circle' style={addColumnStyle}/>
                            </Dropdown>
                            }

                        width={40}
                    />
                </FilterableDataTable>
                <ReNameRowModal 
                  isShowReNameRowModal={this.state.isShowReNameRowModal}
                  handleRowModal={this.handleRowModal}
                  // data={sortedRowList}
                  // rowIndex={this.state.rowIndex}
                  // columnKey={this.state.columnKey}
                  _refresh={this._refresh}
                />
                <DeleteRowModal 
                  isShowDeleteRowModal={this.state.isShowDeleteRowModal}
                  handleRowModal={this.handleRowModal}
                  handleDeleteRowOKClick={this.handleDeleteRowOKClick}
                />
                <AfterMoveRowModal 
                  isShowAfterMoveRowModal={this.state.isShowAfterMoveRowModal}
                  handleRowModal={this.handleRowModal}
                  cancelMoveRowToOtherSection={this.cancelMoveRowToOtherSection}
                />
            </div>      
        );
    }
}

export default Dimensions({
    getHeight: function(element) {
      // 减去上面面包屑的高度
      return window.innerHeight - 152 - document.getElementById("appBread").clientHeight;
    },
    getWidth: function(element) {
      return window.innerWidth - 16;
    }
  })(MainTable);