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
import { TextCell, DropDownMenuHeader, DropDownMenuCell, CheckBoxCell, CheckBoxHeader } from '../helpers/cells';
import { RowHeaderCell } from '../helpers/RowHeaderCell';
import ReNameModal from '../helpers/section/modal/ReNameModal'
import DeleteModal from '../helpers/section/modal/DeleteModal'
import UndoMessage from '../helpers/section/modal/UndoMessage'
import { EditableCell } from '../helpers/columnlib/header/EditableCell';
import SectionHeader from '../helpers/section/header/SectionHeader';
import Dimensions from 'react-dimensions';
import { Menu, Dropdown, message, Tooltip, Row, Col, Input} from 'antd';
import { DataContext, AddFilter } from './data/DataContext';
import { DataVersionContext, TableContext } from './data/DataContext';
import { connect } from 'react-redux'
import { mapRowActionStateToProps } from './data/mapStateToProps'
import PeopleFilter from '../helpers/filter/PeopleFilter'

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

const DataRowHeaderCell = function(props) {
    this.props = props;
    return (
        <DataVersionContext.Consumer>
            {({data, version, filterInputValue}) => (
                <RowHeaderCell
                    data={data}
                    dataVersion={version}
                    type={'TEXT'}
                    filterInputValue={filterInputValue}
                    {...this.props}
                />
            )}
        </DataVersionContext.Consumer>
    );
}

const DataEditableCell = function(props) {
    this.props = props;
    return (
        <DataVersionContext.Consumer>
            {({data, version, filterInputValue}) => (
                <EditableCell
                    data={data}
                    dataVersion={version}
                    filterInputValue={filterInputValue}
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
            {({data, version, filterInputValue}) => (
                <TextCell
                    data={data}
                    dataVersion={version}
                    filterInputValue={filterInputValue}
                    {...this.props}
                />
            )}
        </DataVersionContext.Consumer>
    );
}

const DropDownCell = function(props) {
  this.props = props;
  return (
    <DataVersionContext.Consumer>
        {({data, version}) => (
            <DropDownMenuCell
                data={data}
                dataVersion={version}
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
            <DropDownMenuHeader
                data={data}
                dataVersion={version}
                {...this.props}
            />
        )}
    </DataVersionContext.Consumer>
  )
}

const DataCheckBoxCell = function(props) {
  this.props = props;
  return (
    <DataVersionContext.Consumer>
        {({data, version}) => (
            <CheckBoxCell
                data={data}
                dataVersion={version}
                {...this.props}
            />
        )}
    </DataVersionContext.Consumer>
  )
}

const DataCheckBoxHeader = function(props) {
  this.props = props;
  return (
    <DataVersionContext.Consumer>
        {({data, version}) => (
            <CheckBoxHeader
                data={data}
                dataVersion={version}
                {...this.props}
            />
        )}
    </DataVersionContext.Consumer>
  )
}

const DataSectionHeader = function(props) {
  this.props = props;
  return (
    <DataVersionContext.Consumer>
        {({data, version}) => (
            <SectionHeader
                data={data}
                dataVersion={version}
                {...this.props}
            />
        )}
    </DataVersionContext.Consumer>
  )
}

const FilterableDataTable = AddFilter(DataContext(Table));

@connect(mapRowActionStateToProps, null, null, { forwardRef: true })
class MainTable extends React.Component {

    static propTypes = {
        data: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props);
        this._dataset = props.data;

        this._onAddNewGroupCallback = this._onAddNewGroupCallback.bind(this);
        this._onRemoveGroupCallback = this._onRemoveGroupCallback.bind(this);
        this._onColumnResizeEndCallback = this._onColumnResizeEndCallback.bind(this);
        this._onColumnAddCallback = this._onColumnAddCallback.bind(this);
        this._onColumnReorderEndCallback = this._onColumnReorderEndCallback.bind(this);
        this._onRemoveColumnCallback = this._onRemoveColumnCallback.bind(this);
        this._onCollpseColumnCallback = this._onCollpseColumnCallback.bind(this);

        this._getColumnName = this._getColumnName(this);
        this.refresh = this.refresh.bind(this);
        this._dataset.setCallback(this.refresh, 'main');

        this.state = {
            data: this._dataset,
            filters: {'rowKey' : ''},
            filterPeople:null,
            columns: this._dataset.getColumns(),
            version: 0,
            isShowAddSubRowModal: false,
            isShowReNameModal: false,
            isShowUndoModal: false,
            isShowDeleteModal: false,
            rowIndex: null,
            columnKey: null,
            _onRemoveColumnCallback:this._onRemoveColumnCallback,
            _onCollpseColumnCallback:this._onCollpseColumnCallback
        };
    }

    _onCollpseColumnCallback(columnKey,collpse){
        if(collpse){
            this.setColumnWidth(columnKey, 15);
        }else{
            this.setColumnWidth(columnKey, 200);
        }
        
        this.setColumnCollpse(columnKey)
    }

    _onRemoveColumnCallback(columnKey){
        this._dataset.removeColumn(columnKey);
    }

    /**
     * callback assoicated with the group add button
     * @param {*} event 
     */
    _onAddNewGroupCallback(event) {
        this._dataset.addNewGroup("新分区");
        this.refresh()
    }

     /**
      * callback assoicated with the group delete button
      * @param {*} groupKey 
      */
     _onRemoveGroupCallback(groupKey){
        this._dataset.removeGroup(groupKey);
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
        this.setState({columns: columns});
    }

    setColumnCollpse(columnKey, width) {
        let columns = this.state.columns;
        for (let index = 0; index < columns.length; index++) {
            const column = columns[index];
            if (column.columnKey === columnKey) {
                column.collpse = !column.collpse;
            }
        }
        this.setState({columns: columns});
    }

    _onColumnAddCallback(e) {
        const [columnComponentType, level] = e.key.split('-');
        this._dataset.addNewColumn(e.item.node.innerText, level * 1, columnComponentType);
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
                colTemplates.header = DataEditableCell;
                colTemplates.footer = <Cell>summary</Cell>;
                colTemplates.width = this.getColumnWidth(columnKey);
                colTemplates.minWidth = 70;
                colTemplates.isResizable = true;
                colTemplates.level = column.level;
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
    getFixedColumnTemplate(column) {
      
      let rowTemplates = {};
      const columnKey = column.columnKey;
      if (column.type === ColumnType.ROWACTION) {
        rowTemplates.width = column.width;
        rowTemplates.columnKey = columnKey;
        rowTemplates.header = DropDownHeader;
        rowTemplates.footer = null;
        rowTemplates.isResizable = false;
        rowTemplates.cell = DropDownCell;
        rowTemplates.level = column.level;
      }
      else if (column.type === ColumnType.ROWSELECT) {
        rowTemplates.width = column.width;
        rowTemplates.columnKey = columnKey;
        rowTemplates.header = DataCheckBoxHeader;
        rowTemplates.footer = null;
        rowTemplates.isResizable = false;
        rowTemplates.cell = DataCheckBoxCell;
        rowTemplates.level = column.level;
      }
      else {
        rowTemplates.width = column.width;
        rowTemplates.columnKey = columnKey;
        if (column.level == 0)
            rowTemplates.header = DataSectionHeader;
        rowTemplates.header = DataSectionHeader;
        rowTemplates.footer = <Cell>总计</Cell>;
        rowTemplates.minWidth = 70;
        rowTemplates.isResizable = true;
        rowTemplates.level = column.level;
        if (column.type === ColumnType.LABEL) {
            rowTemplates.cell = DataTextCell;
        }
        else if (column.type === ColumnType.EDITBOX) {
            rowTemplates.cell = DataRowHeaderCell;
        }
      }
      return rowTemplates;
    }

    getColumnAddOptionTemplate(columnKey, level, width) {
        const addColumnStyle = {
            boxShadow: 'none',
        };
        const menu = (
            <Menu onClick={this._onColumnAddCallback} style={{width:'100px'}}>
            <Menu.Item key={"DATE-"+level}>
                    <ScheduleOutlined />
                    日期
                </Menu.Item>
                <Menu.Item key={"NUMBER-"+level}>
                    <AccountBookOutlined />
                    数字
                </Menu.Item>
                <Menu.Item key={"TEXT-"+level}>
                    <FormOutlined />
                    文本
                </Menu.Item>
                <Menu.Item key={"SELECT-"+level}>
                    <CheckSquareOutlined />
                    选择
                </Menu.Item>
                <Menu.Item key={"PEOPLE-"+level}>
                    <UserOutlined />
                    人员
                </Menu.Item>
                <Menu.Item key={"STATUS-"+level}>
                    <StrikethroughOutlined />
                    状态
                </Menu.Item>
            </Menu>
        );
        let colTemplate = {};
        colTemplate.columnKey = columnKey;
        colTemplate.level = level;
        colTemplate.header = <Dropdown overlay={menu} trigger={['click']}>
                                <Button basic circular icon='plus circle' style={addColumnStyle} />
                             </Dropdown>;
        colTemplate.width = width;
        return colTemplate;
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

    doFilter = (people) => {
        this.setState({
         filterPeople:people
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

    /**
     * 查询/过滤数据
     */
    filterTableData = (e) => {
      this.setState({
        filterInputValue: e.target.value.trim()
      })
    }

    renderControls() {
        return (
            <Row>
                <Col span={16}>
                    <div id="addGroupBtn" className='autoScrollControls'>
                        <Button primary onClick={this._onAddNewGroupCallback} >添加新分区</Button>
                    </div>
                </Col>
                <Col span={4}>
                  <Input 
                    style={{height: 32, borderRadius: 16}} 
                    allowClear={true}
                    placeholder={'查询/过滤'}
                    onChange={this.filterTableData}
                  />
                </Col>
                <Col span={4}>
                    <div id="filterPeople" style={{marginLeft: 10}} >
                       <TableContext.Provider value={this.state}> 
                            <PeopleFilter doFilter={this.doFilter}></PeopleFilter>
                        </TableContext.Provider>
                    </div>
                </Col>
            </Row>
              
              
            
          )
    }
   
    renderTable() {
        var { data, filters, filterInputValue, filterPeople } = this.state;
        const fixedColumns = this.state.columns.filter(c => c.fixed); 
        const scrollColumns = this.state.columns.filter(c => !c.fixed);
      
        return (
         <TableContext.Provider value={this.state}>
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
                    filterInputValue={filterInputValue}  
                    filterPeople={filterPeople}              
                    height={this.props.containerHeight}
                    // 减去左侧Sider宽度 
                    width={this.props.containerWidth - this.props.siderWidth}
                    siderWidth={this.props.siderWidth}
                    {...this.props}>
                    {/* {fixedColumn && <Column {...this.getColumnTemplate(fixedColumn.columnKey)} fixed={true} />} */}
                    {fixedColumns.map(column => (
                      <Column {...this.getFixedColumnTemplate(column)} fixed={true} />
                    ))}
                    {scrollColumns.map(column => (
                        <Column {...this.getColumnTemplate(column.columnKey)} fixed={false} />
                    ))
                    }
                    <Column {...this.getColumnAddOptionTemplate("", 0, 40)}/>
                    <Column {...this.getColumnAddOptionTemplate("", 1, 40)}/>
                </FilterableDataTable>
                <ReNameModal 
                  isShowReNameModal={this.props.isShowReNameModal}
                />
                <DeleteModal 
                  isShowDeleteModal={this.props.isShowDeleteModal}
                />
                <UndoMessage 
                  isShowUndoModal={this.state.isShowUndoModal}
                />
              </div>   
            </TableContext.Provider>   
        );
    }
}

export default Dimensions({
    getHeight: function(element) {
      // 减去上面面包屑的高度
      return window.innerHeight - 152 - document.getElementById("appBread").clientHeight + 64;
    },
    getWidth: function(element) {
      return window.innerWidth - 101;
    }
  })(MainTable);