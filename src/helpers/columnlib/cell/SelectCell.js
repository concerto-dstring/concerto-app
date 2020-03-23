
import React from 'react';
import 'antd/dist/antd.css'
import {Select} from 'antd';
import 'moment/locale/zh-cn';
import '../../../maintable/css/style/TableCellComponent.css'
import { Cell } from '../../../maintable/FixedDataTableRoot';

class SelectCell extends React.Component {
    render() {
      const { Option } = Select;
      const {data, rowIndex, columnKey, collapsedRows, callback, value, handleChange, handleKey, ...props} = this.props;
      const returnValue = (e) => {
        return handleChange(e); 
      }
      return (
        <Cell {...props} style={{ width: '100%' }}>
            <Select
                showSearch
                value={value}
                style={{ width: '100%' }}
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