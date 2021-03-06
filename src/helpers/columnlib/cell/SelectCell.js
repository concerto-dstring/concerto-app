import React from 'react';
import 'antd/dist/antd.css';
import {Select} from 'antd';
import 'moment/locale/zh-cn';
import {Cell} from '../../../maintable/FixedDataTableRoot';
import './SelectCell.less';
class SelectCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }
  render() {
    const {Option} = Select;
    const {data, rowIndex, columnKey, collapsedRows, callback, value, handleChange, handleKey, ...props} = this.props;
    const returnValue = (value, option) => {
      this.setState({
        value: option.children,
      });
      handleChange(option.children, true);
    };
    return (
      <Cell {...props} className="SelectCell">
        <Select
          size="small"
          showSearch
          value={this.state.value}
          className="SelectCell"
          dropdownStyle={{pointerEvents: 'visible'}}
          getPopupContainer={() => this.props.container}
          placeholder="Select a option"
          optionFilterProp="children"
          filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          onSelect={returnValue}
          defaultOpen={true}
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
