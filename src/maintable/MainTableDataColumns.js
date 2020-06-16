import React from 'react';

import { TextCell, DropDownMenuHeader, DropDownMenuCell, CheckBoxCell, CheckBoxHeader } 
        from '../helpers/cells';
import { RowHeaderCell } from '../helpers/RowHeaderCell';
import { ColumnHeaderCell } from '../helpers/ColumnHeaderCell';
import { EditableCell } from '../helpers/columnlib/header/EditableCell';
import SectionHeader from '../helpers/section/header/SectionHeader';
import SummaryCell from '../helpers/columnlib/cell/SummaryCell';
import { DataVersionContext } from './data/DataContext';

export const DataRowHeaderCell = function(props) {
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

export const DataEditableCell = function(props) {
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

export const DataColumnHeaderCell = function(props) {
    this.props = props;
    return (
        <DataVersionContext.Consumer>
            {({data, version, filterInputValue}) => (
                <ColumnHeaderCell
                    data={data}
                    dataVersion={version}
                    filterInputValue={filterInputValue}
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

export const DropDownCell = function(props) {
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

export const DropDownHeader = function(props) {
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

export const DataCheckBoxCell = function(props) {
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

export const DataCheckBoxHeader = function(props) {
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

export const DataSectionHeader = function(props) {
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

export const DataSummaryCell = function(props) {
  this.props = props;
  return (
    <DataVersionContext.Consumer>
        {({data, version}) => (
            <SummaryCell
                data={data}
                dataVersion={version}
                {...this.props}
            />
        )}
    </DataVersionContext.Consumer>
  )
}
