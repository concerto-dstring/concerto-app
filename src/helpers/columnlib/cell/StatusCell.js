import React from 'react';
import {Menu, Dropdown} from 'antd';
import 'moment/locale/zh-cn';
import {Cell} from '../../../maintable/FixedDataTableRoot';
import './StatusCell.less';
import {getStatusCellClassName, getStatusCellMenuItems} from './CellProperties';

class StatusCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || '',
      styleClassName: getStatusCellClassName(props.value || ''),
      menu: (
        <Menu onClick={this.handleMenuClick} className="statusCellMenu" style={{pointerEvents: 'visible'}}>
          {getStatusCellMenuItems().map((item) => {
            return (
              <Menu.Item key={item.key} className={item.className}>
                {item.desc}
              </Menu.Item>
            );
          })}
        </Menu>
      ),
    };
  }

  handleMenuClick = (e) => {
    const selectedText = e.item.props.children;
    const selectedStyle = e.item.props.className;
    const statusValue = selectedText ? selectedText : '';
    this.setState({
      value: statusValue,
      styleClassName: selectedStyle,
    });
    this.props.handleChange(statusValue, true);
    e.domEvent.stopPropagation();
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value || '',
      styleClassName: getStatusCellClassName(nextProps.value || ''),
    });
  }

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

    const dismiss = (e) => {
      handleChange(this.state.value, false);
    };
    const item_lineheight_style = {
      lineHeight: '32px',
      fontWeight: 400
    };

    let cellStatusTextStyle = this.state.styleClassName + ' statusWidth longText';
    return (
      <Cell {...props} className="statusCell">
        <Dropdown
          overlay={this.state.menu}
          trigger={['click']}
          onVisibleChange={dismiss}
          getPopupContainer={() => this.props.container}
        >
          <div className={cellStatusTextStyle} style={item_lineheight_style}>
            {displayValue}
          </div>
        </Dropdown>
      </Cell>
    );
  }
}

export {StatusCell};
