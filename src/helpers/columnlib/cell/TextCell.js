import React from 'react';
import 'antd/dist/antd.css'
import {Input } from 'antd';
import 'moment/locale/zh-cn';
import '../../../maintable/css/style/TableCellComponent.css'
import { Cell } from '../../../maintable/FixedDataTableRoot';

class TextCell extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        value:props.value
      }
    }
    render() {
      const {data, rowIndex, columnKey, collapsedRows, callback, value, handleChange, handleKey, ...props} = this.props;
      const returnValue = (e) => {
        const inputValue = e.target.value;
        this.setState({
           value:inputValue
        })
        return handleChange(inputValue); 
      }
      return (
        <Cell {...props} style={{ width: '100%' }}>
            <Input 
            // style={style} 
            value={this.state.value} 
            onChange={returnValue} 
            onKeyDown={handleKey}/>
        </Cell>
      );
    }
  }

  export {TextCell};