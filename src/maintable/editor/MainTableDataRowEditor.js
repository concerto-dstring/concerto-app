// import { DataEditableCell, DataTextCell } from '../MainTableDataColumns';
import MainTableRowEditor from './MainTableRowEditor';
import { getSubLevel, ColumnType } from '../data/MainTableType';
import React from 'react';
import { DataVersionContext } from '../../maintable/data/DataContext';
import { TextCell } from '../../helpers/cells';
import { EditableCell } from '../../helpers/columnlib/header/EditableCell';

export const DataEditableCell = function(props) {
    this.props = props;
    return (
        <DataVersionContext.Consumer>
            {({data, version, rowIndex}) => (
                <EditableCell
                    key={props.columnKey}
                    data={data}
                    dataVersion={version}
                    rowIndex={rowIndex}
                    {...this.props}
                />
            )}
        </DataVersionContext.Consumer>
    );
  }
  
  export const DataTextCell = function(props) {
    this.props = props;
    return (
        <DataVersionContext.Consumer>
            {({data, version, rowIndex}) => (
                <TextCell
                    key={props.key}
                    data={data}
                    dataVersion={version}
                    rowIndex={rowIndex}
                    {...this.props}
                />
            )}
        </DataVersionContext.Consumer>
    );
  }

class MainTableDataRowEditor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: props.data,
            version: 0,
            rowIndex: props.rowIndex,
            rowKey: props.rowKey,
            container: null
        };
    }

    _onRef = (div) => {
        this.setState({container: div});
    }

    render() {
        const props = this.props;

        if (!props.rowKey) {
            return null;
        }

        const level =  getSubLevel(props.rowKey);

        const datacolumns = props.data.getColumns();
        let columns=[];

        for (let i = 0; i < datacolumns.length; i++) {
            let column = datacolumns[i];
            if (column.level === level 
                && column.name !== ColumnType.ROWACTION 
                && column.name !== ColumnType.ROWSELECT) {
                if (column.type === ColumnType.LABEL) {
                    columns.push({name: column.name, key: column.columnKey, template: DataTextCell});
                }
                else if (column.type === ColumnType.EDITBOX) {
                    columns.push({name: column.name, key: column.columnKey, template: DataEditableCell});
                }
            }            
        }
        return (
            <DataVersionContext.Provider value={this.state} >
                <div ref={this._onRef}>
                    <MainTableRowEditor columns={columns} data={props.data} rowIndex={props.rowIndex} container={this.state.container} />
                </div>
            </DataVersionContext.Provider>
        )
    }
}


export default MainTableDataRowEditor;