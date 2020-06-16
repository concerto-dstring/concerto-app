import React from 'react';
import 'antd/dist/antd.css';
import {Button, Menu, Dropdown, Tooltip} from 'antd';
import 'moment/locale/zh-cn';
import {Cell} from '../../../maintable/FixedDataTableRoot';
import './StatusCell.less';

class StatusCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || '',
      styleClassName: this.renderStatusStyle(props.value || ''),
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value || '',
      styleClassName: this.renderStatusStyle(nextProps.value || ''),
    });
  }
  statusHashTable = {
    block: '阻塞',
    working: '进行中',
    finished: '已完成',
    todo: 'To Do',
    default: '',
  };
  renderStatusStyle = (value) => {
    for (let key in this.statusHashTable) {
      if (value === this.statusHashTable[key]) {
        return key + 'Item';
      }
    }
  };

  render() {
    const {
      data,
      rowIndex,
      columnKey,
      collapsedRows,
      callback,
      value,
      handleChange,
      handleKey,
      displayValue,
      ...props
    } = this.props;
    const returnValue = (e) => {
      const selectedText = e.item.props.children;
      const selectedStyle = e.item.props.className;
      const statusValue = selectedText ? selectedText : '';
      this.setState({
        value: statusValue,
        styleClassName: selectedStyle,
      });
      handleChange(statusValue, true);
      e.domEvent.stopPropagation();
    };

    const dismiss = (e) => {
      handleChange(this.state.value, false);
    };

    const menu = (
      <Menu onClick={returnValue} className="statusCellMenu" style={{pointerEvents: 'visible'}}>
        <Menu.Item key="working" className="workingItem">
          {this.statusHashTable.working}
        </Menu.Item>
        <Menu.Item key="block" className="blockItem">
          {this.statusHashTable.block}
        </Menu.Item>
        <Menu.Item key="finished" className="finishedItem">
          {this.statusHashTable.finished}
        </Menu.Item>
        <Menu.Item key="todo" className="todoItem">
          {this.statusHashTable.todo}
        </Menu.Item>
        <Menu.Item key="default" className="defaultItem"></Menu.Item>
      </Menu>
    );

    let cellStatusTextStyle = this.state.styleClassName + ' statusWidth longText';
    return (
      <Cell {...props} className="statusCell">
        <Dropdown
          overlay={menu}
          trigger={['click']}
          onVisibleChange={dismiss}
          getPopupContainer={() => this.props.container}
        >
          <div className={cellStatusTextStyle}>{displayValue}</div>
        </Dropdown>
      </Cell>
    );
  }
}

export {StatusCell};
