import React from 'react';
import 'antd/dist/antd.css'
import {Input } from 'antd';
import 'moment/locale/zh-cn';
import '../../../maintable/css/style/TableCellComponent.css'
import { Cell } from '../../../maintable/FixedDataTableRoot';

class TextCell extends React.Component {
    render() {
      const {data, rowIndex, columnKey, collapsedRows, callback, value, handleChange, handleKey, ...props} = this.props;
      const returnValue = (e) => {
        return handleChange(e.target.value); 
      }
      return (
        <Cell {...props} style={{ width: '100%' }}>
            <Input 
            // style={style} 
            value={value} 
            onChange={returnValue} 
            onKeyDown={handleKey}/>
        </Cell>
      );
    }
  }

  export {TextCell};