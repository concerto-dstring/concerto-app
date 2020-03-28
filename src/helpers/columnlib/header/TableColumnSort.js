import React from 'react';
import { Button } from 'antd';
import {SortAscendingOutlined,SortDescendingOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types';

class TableColumnSort extends React.Component{
    static propTypes = {
        sortByColumn: PropTypes.func,
    }
    constructor(props){
        super(props);
        this.sortbarStyle = {
            position:'absolute',
            top:'8px',
            right:'5px'
        }
        this.state = {
            sortBy:'null',
            tableData:props.tableData,
            rowIndex:props.rowIndex,
            columnKey:props.columnKey
        }
        this._onSortByColumn = this._onSortByColumn.bind(this);
    }
    _onSortByColumn = () =>{
        this.setState({
            sortBy:this.state.sortBy!=='ASC'?'ASC':'DES'
        })
        if(this.props.sortByColumn){
            this.props.sortByColumn(this.props.sortBy, this.state.columnKey);
        }
        
    }
    render(){
        return(
            <div style={this.sortbarStyle}>
                <Button 
                    size="small"
                    shape="circle"
                    icon={this.state.sortBy!=='ASC'?<SortDescendingOutlined/>:<SortAscendingOutlined/> }
                    onClick={this._onSortByColumn}
                />
            </div>
        )
    }
}
export default TableColumnSort;