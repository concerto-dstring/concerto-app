// The main table view on the top of data store
// map => rowid => {rowkey, groupkey}
// rowid => [header, row, addrow, footer]

"use strict";

import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import { Table, Cell, Column } from './FixedDataTableRoot';
import { ColumnType,  RowType } from './MainTableType';
import { TextCell } from '../helpers/cells';
import { EditableCell } from '../helpers/EditableCell';
import Dimensions from 'react-dimensions';
import { Menu, Dropdown, message, Tooltip } from 'antd';
import {DownloadOutlined,
    PlusOutlined,
    DownOutlined,
    UserOutlined,
    ScheduleOutlined,
    FormOutlined,
    CheckSquareOutlined,
    StrikethroughOutlined,
    AccountBookOutlined } from '@ant-design/icons';

class DataViewWrapper {
    constructor(dataset, indexMap) {
        this._indexMap = indexMap;
        this._dataset = dataset;
        this.getSize = this.getSize.bind(this);
        this.getObjectAt = this.getObjectAt.bind(this);
        this.getRowType = this.getRowType.bind(this);
        this.getRowKey = this.getRowKey.bind(this);
        this.getRowHeight = this.getRowHeight.bind(this);
        this.getRowMap = this.getRowMap.bind(this);
        this.removeRow = this.removeRow.bind(this);
        this.removeRows = this.removeRows.bind(this);
        this.reorderColumn = this.reorderColumn.bind(this);
        this.setObjectAt = this.setObjectAt.bind(this);
    }

    // The callback is used for triggering re-rendering
    setCallback(cb, id = 'wrapper') {
        if (this._dataset.setCallback) {
            this._dataset.setCallback(cb, id);
        }
    }

    getSize() {
        if (this._indexMap === null) {
            return this._dataset.getSize();
        }
        return this._indexMap.length;
    }

    getObjectAt(index) {
        if (index > this._indexMap.length - 1 && index < 0 ) {
            return null;
        }
        let rowkey = this._indexMap[index].rowKey;
        return rowkey ? this._dataset.getObjectAt(rowkey) : null;
    }

    getRowType(index) {
        if (index === undefined || index > this._indexMap.length - 1 || index < 0 ) {
            return null;
        }
        return this._indexMap[index].rowType;
    }

    getRowKey(index) {
        if (index > this._indexMap.length - 1 && index < 0 ) {
            return null;
        }
        return this._indexMap[index].rowKey;
    }

    addNewRow(index, groupKey, newItem) {
        let rowKey = this._dataset.addNewRow(groupKey, newItem);
        for (let row = this._indexMap.length; row > index; row--) {
            this._indexMap[row] = this._indexMap[row-1]; 
        }
        this._indexMap[index] = {rowType:RowType.ROW, groupKey:groupKey, rowKey:rowKey};
    }

    removeRow(index) {
        let rowKey = this._indexMap[index];
        this._dataset.removeRow(rowKey);
    }

    removeRows(indexArray) {
        let rowKeys = [];
        indexArray.array.forEach(index => {
            if (this._indexMap[index])
                rowKeys.push(this._indexMap[index]);
        });
        this._dataset.rowRows(rowKeys);
    }

    addNewColumn(newItem,columnComponentType) {
        this._dataset.addNewColumn(newItem,columnComponentType);
    }

    reorderColumn(columnAfter, columnKey) {
        this._dataset.reorderColumn(columnAfter, columnKey);
    }

    getRowHeight(index) {
        let rowtype = this.getRowType(index);
        if (rowtype) {
            switch (rowtype) {
                case RowType.ADDROW: 
                    return 35;
                case RowType.HEADER:
                    return 40;
                case RowType.FOOTER:
                    return 140;
                case RowType.ROW:
                    return 40;
            }
        }
        return 40;
    }

    getRowMap() {
        return this._indexMap;
    }

    setObjectAt(rowIndex, columnKey, value) {
        if (rowIndex < 0 || rowIndex >= this._indexMap.length) {
            return;
        }
        if(typeof value != 'string'){
            value = moment(value).format('YYYY-MM-DD');
         }
        this._dataset.setObjectAt(this._indexMap[rowIndex].rowKey, columnKey, value);
    }

    /**
     * add a new group to the backend dataset 
     * @param {*} groupName 
     */
    addNewGroup(groupName) {
        return this._dataset.addNewGroup(groupName);
    }

    /**
     * remove a group from the backend dataset by the groupKey
     * @param {*} groupKey 
     */
    removeGroup(groupKey) {
        return this._dataset.removeGroup(groupKey);
    }
}

class MainTable extends React.Component {

    static propTypes = {
        dataset: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props);
        this._dataset = props.dataset;
        this._defaultSortIndexes = [];
        this._refresh = this._refresh.bind(this);

        let groups = []; //{groupkey, startIndex} // group -> name, key, rows[rowkey]
        let rows = []; //{type, rowkey, groupKey}

        this._onAddNewGroupCallback = this._onAddNewGroupCallback.bind(this);
        this._onRemoveGroupCallback = this._onRemoveGroupCallback.bind(this);
        this._onAddNewRowCallback = this._onAddNewRowCallback.bind(this);
        this._onRowReorderEndCallback = this._onRowReorderEndCallback.bind(this);
        this._onColumnResizeEndCallback = this._onColumnResizeEndCallback.bind(this);
        this._onColumnAddCallback = this._onColumnAddCallback.bind(this);
        this._onColumnReorderEndCallback = this._onColumnReorderEndCallback.bind(this);
        this._getColumnName = this._getColumnName.bind(this);


        // the latest added group is on the top
        var index = 0;
        for(let i = this._dataset.getGroups().length - 1; i >= 0; i --) {
            let group = this._dataset.getGroups()[i];
            rows.push({rowType:RowType.HEADER, groupKey:group.groupKey, rowKey:''});
            this._defaultSortIndexes.push(index);
            let startIndex = index;
            index ++;
            for (let j = group.rows.length - 1; j >=0; j --) {
                rows.push({rowType:RowType.ROW, groupKey:group.groupKey, rowKey:group.rows[j]});
                this._defaultSortIndexes.push(index);
                index ++;
            }
            rows.push({rowType:RowType.ADDROW, groupKey:group.groupKey, rowKey:''});
            this._defaultSortIndexes.push(index);
            index ++;
            rows.push({rowType:RowType.FOOTER, groupKey:group.groupKey, rowKey:''});
            this._defaultSortIndexes.push(index);
            groups.push({rowType:group.key, startIndex:startIndex, endIndex:index});
            index ++;
        }

        this.state = {
            sortedRowList: new DataViewWrapper(this._dataset, rows),
            groups: groups,
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
        
        this.setState({sortedRowList: new DataViewWrapper(this._dataset, rows)});
        this._refresh();
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
        
        this.setState({sortedRowList: new DataViewWrapper(this._dataset, rows), groups : groups});
        this._refresh();
     }

    _onColumnReorderEndCallback(event) {
        let {columnAfter, reorderColumn} = event;
        if (columnAfter) {
            this.state.sortedRowList.reorderColumn(columnAfter, reorderColumn);
            this._refresh();
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

    _onAddNewRowCallback(rowIndex, newItem){
        if (newItem !== '') {
            let row = this.state.sortedRowList.getRowMap()[rowIndex];
            this.state.sortedRowList.addNewRow(rowIndex, row.groupKey, newItem);
            this._refresh();
        }
    }

    _onColumnAddCallback(t) {
        const columnComponentType = t.key;
        this.state.sortedRowList.addNewColumn('新列', columnComponentType);
        this._refresh();
    }

    _getColumnName(columnKey) {
        let columns = this.state.columns;
        for (let index = 0; index < columns.length; index++) {
            const column = columns[index];
            if (column.columnKey === columnKey) {
                return column.name;
            }
        }
        return '';
    }

    _onRowReorderEndCallback(rowKey, oldRowIndex, newRowIndex) {
        let rows = this.state.sortedRowList.getRowMap();
        if (oldRowIndex !== newRowIndex) {            
            if ( newRowIndex < oldRowIndex ) {  // move backward
                let oldrow = rows[oldRowIndex];
                for (let row = oldRowIndex; row > newRowIndex; -- row ) {
                    rows[row] = rows[row-1]; 
                }
                rows[newRowIndex] = oldrow;
            } else {                            // move forward
                let oldrow = rows[oldRowIndex];
                for (let row = oldRowIndex; row < newRowIndex; ++ row ) {
                    rows[row] = rows[row+1]; 
                }
                rows[newRowIndex] = oldrow;
            }
            
            this.setState({sortedRowList: new DataViewWrapper(this._dataset, rows)});
            this._refresh();
        }
    }

    getColumnTemplate(sortedRowList, columnKey) {
        let columns = this.state.columns;
        let rowTemplates = {};
        for (let i  = 0; i < columns.length; i ++) {
            let column = columns[i];
            if (columnKey === column.columnKey) {
                rowTemplates.width = column.width;
                rowTemplates.columnKey = columnKey;
                rowTemplates.header = <EditableCell value={column.name}/>;
                rowTemplates.footer = <Cell>汇总</Cell>;
                rowTemplates.width = this.getColumnWidth(columnKey);
                rowTemplates.minWidth = 70;
                rowTemplates.isResizable = true;
                if (column.type === ColumnType.LABEL) {
                    rowTemplates.cell = <TextCell data={sortedRowList}/>;
                    return rowTemplates;   
                }
                if (column.type === ColumnType.EDITBOX) {
                    rowTemplates.cell = <EditableCell data={sortedRowList} type={column.columnComponentType}/>;
                    return rowTemplates;
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

    _refresh() {
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
        const version = this.state.version;
        var { sortedRowList } = this.state;
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
                <Table
                    ref={this.handleRef}
                    headerHeight={40}
                    rowHeight={40}
                    isColumnResizing={false}
                    addRowHeight={35}
                    footerHeight={40}
                    onColumnReorderEndCallback={this._onColumnReorderEndCallback}
                    rowsCount={sortedRowList.getSize()}
                    rowHeightGetter={sortedRowList.getRowHeight}
                    rowTypeGetter={sortedRowList.getRowType}
                    rowKeyGetter={sortedRowList.getRowKey}
                    columnNameGetter={this._getColumnName}
                    onColumnResizeEndCallback={this._onColumnResizeEndCallback}
                    onRowReorderEndCallback={this._onRowReorderEndCallback}
                    onNewRowAddCallback={this._onAddNewRowCallback}
                    data={sortedRowList}
                    height={this.props.containerHeight}

                    // 减去左侧Sider宽度 
                    width={this.props.containerWidth - this.props.siderWidth}
                    {...version}
                    {...this.props}>
                    {fixedColumn && <Column {...this.getColumnTemplate(sortedRowList, fixedColumn.columnKey)} fixed={true} />}
                    {scrollColumns.map(column => (
                        <Column {...this.getColumnTemplate(sortedRowList, column.columnKey)} fixed={false} />
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
                </Table>
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