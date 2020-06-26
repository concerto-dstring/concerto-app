import React from 'react';
import {Input} from 'antd';
import 'moment/locale/zh-cn';
import {Cell} from '../../../maintable/FixedDataTableRoot';
import './TextCell.less';

class TextCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      inputValue: null,
    };
  }

  handleInputChange = (e) => {
    let inputValue = e.target.value;
    this.setState({
      inputValue: inputValue ? inputValue : '',
    });
    this.props.handleChange(inputValue, false);
  };

  render() {
    const {handleKey} = this.props;
    const {inputValue, value} = this.state;
    return (
      <Cell className="textCell">
        <Input
          autoFocus={true}
          value={inputValue === null ? value : inputValue}
          size="small"
          onChange={this.handleInputChange}
          onKeyDown={handleKey}
        />
      </Cell>
    );
  }
}

export {TextCell};
