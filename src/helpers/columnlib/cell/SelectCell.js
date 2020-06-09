
import React from 'react';
import 'antd/dist/antd.css'
import {Select} from 'antd';
import 'moment/locale/zh-cn';
import { Cell } from '../../../maintable/FixedDataTableRoot';
import './SelectCell.less'
class SelectCell extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        value:props.value
      }
    }
    render() {
      const { Option } = Select;
      const {data, rowIndex, columnKey, collapsedRows, callback, value, handleChange, handleKey, ...props} = this.props;
      const returnValue = (value,option) => {
        this.setState({
            value:option.children
        });
        return handleChange(option.children); 
      }
      return (
        <Cell {...props} className="SelectCell">
            <Select
                showSearch
                value={this.state.value}
                className="SelectCell"
                getPopupContainer={()=>this.props.container}
                placeholder="Select a option"
                optionFilterProp="children"
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                onSelect={returnValue}
                >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="tom">Tom</Option>
            </Select>
        </Cell>
      );
    }
  }

  export {SelectCell};