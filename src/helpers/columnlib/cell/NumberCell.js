import React from 'react';
import 'antd/dist/antd.css'
import {InputNumber} from 'antd';
import 'moment/locale/zh-cn';
import '../../../maintable/css/style/TableCellComponent.css'
import { Cell } from '../../../maintable/FixedDataTableRoot';


class NumberCell extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        value:props.value
      }
    }
    render() {
      const {data, rowIndex, columnKey, collapsedRows, callback, value, handleChange, handleKey, ...props} = this.props;
      const returnValue = (e) => {
        this.setState({
          value:e
        })
        return handleChange(e); 
      }
      return (
        <Cell {...props} style={{ width: '100%' }}>
            <InputNumber 
            style={{width:'100%'}} 
            value={this.state.value} 
            onChange={returnValue} 
            onKeyDown={handleKey}/>
        </Cell>
      );
    }
  }

  export {NumberCell};