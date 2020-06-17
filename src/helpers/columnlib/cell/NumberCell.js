import React from 'react';
import {InputNumber, message} from 'antd';
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

  handleInputChange = (inputValue) => {
    if (!isNaN(inputValue)) {
      this.setState({
        inputValue: inputValue ? inputValue : '',
      });

      this.props.handleChange(inputValue, false);
    } else {
      message.warning(ErrorMsg.number_error);
      const {inputValue, value} = this.state
      this.props.handleChange(inputValue === null ? value : inputValue, false);
    }
  };

  render() {
    const {handleKey, ...props} = this.props;
    const {inputValue, value} = this.state;

    return (
      <Cell className="NumberCell">
        <InputNumber
          className="NumberCell"
          size="small"
          value={inputValue === null ? value : inputValue}
          onChange={this.handleInputChange}
          onPressEnter={handleKey}
        />
      </Cell>
    );
  }
}

export {NumberCell};
