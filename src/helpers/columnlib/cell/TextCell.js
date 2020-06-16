import React from 'react';
import 'antd/dist/antd.css';
import {Input} from 'antd';
import 'moment/locale/zh-cn';
import {Cell} from '../../../maintable/FixedDataTableRoot';
import './TextCell.less';

class TextCell extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value:props.value
    }
  }
  render() {
    const {
      data,
      rowIndex,
      columnKey,
      collapsedRows,
      isHeaderOrFooter,
      callback,
      value,
      handleChange,
      handleKey,
      ...props
    } = this.props;
    const returnValue = (e) => {
      const inputValue = e.target.value;
      this.setState({
        value: inputValue,
      });
      handleChange(inputValue);
      if (isHeaderOrFooter && inputValue == '') {
        handleChange(this.state.value);
      }
    };
    return (
      <Cell {...props} className="textCell">
        <Input value={this.state.value} onChange={returnValue} onKeyDown={handleKey} />
      </Cell>
    );
  }
}

export {TextCell};