// The main table view on the top of data store
// map => rowid => {rowkey, groupkey}
// rowid => [header, row, addrow, footer]

"use strict";

import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import { Table, Cell, Column } from './FixedDataTableRoot';
import { ColumnType,  RowType } from './data/MainTableType';
import { TextCell } from '../helpers/cells';
import { EditableCell } from '../helpers/EditableCell';
import Dimensions from 'react-dimensions';
import { Menu, Dropdown, message, Tooltip } from 'antd';
import { DataContext, AddFilter } from './data/DataContext';
import { DataVersionContext } from './data/DataContext';

import {DownloadOutlined,
    PlusOutlined,
    DownOutlined,
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
                    version={version}
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
                    version={version}
                    {...this.props}
                />
            )}
        </DataVersionContext.Consumer>
    );
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
        };
    }

    /**
     * callback assoicated with the group add button
     * add new row header/add/footer to the state.sortedRowlist.RowMap
     * add new group to the state.groups
     * @param {*} event 
     */
    _onAddNewGroupCallback(event) {
        let sortedRowList = this.state.sortedRowList;
        let rows = sortedRowList.getRowMap();
        let startIndex = this._defaultSortIndexes.length;
        let groupKey = sortedRowList.addNewGroup("新组")

        let index = startIndex;
        rows.unshift({rowType:RowType.FOOTER, groupKey:groupKey, rowKey:''});
        this._defaultSortIndexes.push(index++);
        rows.unshift({rowType:RowType.ADDROW, groupKey:groupKey, rowKey:''});
        this._defaultSortIndexes.push(index++);
        rows.unshift({rowType:RowType.HEADER, groupKey:groupKey, rowKey:''});
        this._defaultSortIndexes.push(index);

        this.state.groups.push({rowType:groupKey, startIndex:startIndex, endIndex:index});
        
     }

     /**
      * callback assoicated with the group delete button
      * remove the rows with the same groupKey from the state.sortedRowList.RowMap
      * remove the group from the state.groups
      * @param {*} groupKey 
      */
     _onRemoveGroupCallback(groupKey){
        let sortedRowList = this.state.sortedRowList;
        let groups = this.state.groups;
        let rows = sortedRowList.getRowMap();
        let rowslen = rows.length;
        let rmgroup = sortedRowList.getGroupAt(groupKey)
        
        if (!rmgroup)
            return;
        
        // TODO: check inplace delete in javascript
        for  (let ridx = 0; ridx < rowslen; ridx ++) {
            let row = rows[ridx];
            if (row && row.groupKey === groupKey) {
                rows.splice(ridx, 1);
                this._defaultSortIndexes(ridx, 1);
            }
        }

        for (let gidx = 0; gidx < groups.length; gidx ++){
            if (groups[gidx].groupKey === groupKey) {
                groups.splice(gidx, 1);
                break;
            }
        }
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

    renderTable() {
        var { data, filters } = this.state;
        const addColumnStyle = {
            boxShadow: 'none',
        };

        const fixedColumn = this.state.columns.length > 0 ? this.state.columns[0] : []; 
        const scrollColumns = this.state.columns.slice(1); 
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
                    {fixedColumn && <Column {...this.getColumnTemplate(fixedColumn.columnKey)} fixed={true} />}
                    {scrollColumns.map(column => (
                        <Column {...this.getColumnTemplate(column.columnKey)} fixed={false} />
                    ))
                    }              
                    <Column
                        columnKey=""
                        header={

                            <Dropdown overlay={menu}>
                            <Button basic circular icon='plus circle' style={addColumnStyle}/>
                            </Dropdown>
                            }

                        width={40}
                    />
                </FilterableDataTable>
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