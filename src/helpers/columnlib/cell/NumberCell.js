import React from 'react';
import {InputNumber, message, Input} from 'antd';
import 'moment/locale/zh-cn';
import {Cell} from '../../../maintable/FixedDataTableRoot';
import './NumberCell.less';
import ErrorMsg from '../../../ErrorMsg';

class NumberCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      inputValue: null,
    };
  }

  handleInputChange = (e) => {
    let inputValue = e.target.value ? e.target.value.trim() : '';
    let reg = /^[0-9-.]*$/g;

    if ((!Number.isNaN(inputValue) && reg.test(inputValue)) || inputValue === '') {

      // 如果包含-必须在开头，包含.则不能在开头且只能有一个
      if (inputValue.indexOf('-') !== -1) {
        if (!inputValue.startsWith('-') || (inputValue.split('-').length > 2) || inputValue.startsWith('-.')) {
          return
        }
      }

      if (inputValue.indexOf('.') !== -1) {
        if (inputValue.startsWith('.') || (inputValue.split('.').length > 2)) {
          return
        }
      }

      this.setState({
        inputValue: inputValue,
      });

      this.props.handleChange(inputValue, false);
    }
  };

  render() {
    const {handleKey, ...props} = this.props;
    const {inputValue, value} = this.state;

    return (
      <Cell className="NumberCell">
        <Input
          className="NumberCell"
          size="small"
          value={inputValue === null ? value : inputValue}
          onChange={this.handleInputChange}
          onPressEnter={handleKey}
          autoFocus={true}
        />
      </Cell>
    );
  }
}

export {NumberCell};
