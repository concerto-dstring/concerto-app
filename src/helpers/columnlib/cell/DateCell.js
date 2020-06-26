import React, {Fragment} from 'react';
import 'antd/dist/antd.css';
import {Button, DatePicker, Select, Switch, Row, Col, message, Input} from 'antd';
import {ClockCircleOutlined} from '@ant-design/icons';
import moment from 'moment';
import 'moment/locale/zh-cn';
import './DateCell.less';
import {DISPLAY} from '../../section/header/StyleValues';

let format = 'YYYY年MM月DD日';

class DateCell extends React.PureComponent {
  #date_time_delimit = ' ';

  constructor(props) {
    super(props);
    let value = props.value ? props.value : '';
    let dateTimeValue = this.formatRenderDateValue(value);

    this.state = {
      open: false,
      addTimeStyle: {
        display: DISPLAY.NONE,
      },
      // mouseIn: false,
      dateTimeStr: value,
      dateStr: dateTimeValue['dateStr'],
      dateValue: dateTimeValue['dateValue'],
      timeValue: dateTimeValue['timeValue'],
      selectDateValue: '',
      selectTimeValue: '',
      switchChecked: dateTimeValue['timeValue'] ? true : false,
    };

    // this.datePickerRef = createRef();
    // this.selectRef = createRef();
  }

  componentWillReceiveProps(nextProps) {
    let value = nextProps.value ? nextProps.value : '';
    let dateTimeValue = this.formatRenderDateValue(value);

    // 判断新Props里面的值是否和原来的一致，不一致则更新并重置选择的时间，一致则不更新
    if (nextProps.value !== this.state.dateTimeStr) {
      this.setState({
        dateTimeStr: value,
        dateStr: dateTimeValue['dateStr'],
        dateValue: dateTimeValue['dateValue'],
        timeValue: dateTimeValue['timeValue'],
        selectDateValue: '',
        selectTimeValue: '',
      });
    }
  }

  handleAddEvent = () => {
    // 增加点击事件
    document.addEventListener('click', this.handleClick);
  };

  handleRemoveEvent = () => {
    // 移除点击的监听事件
    document.removeEventListener('click', this.handleClick);
  };

  componentWillUnmount() {
    this.handleRemoveEvent();
  }

  handleClick = (e) => {
    // 判断鼠标是否在日期选择框内
    if (!this.props.mouseIn) {
      this.closeDatePicker();
    }
  };

  formatRenderDateValue = (value) => {
    let dateValue = '';
    let timeValue = '';
    let dateStr = '';

    if (value !== '') {
      const dateTimeValue = value.split(this.#date_time_delimit);
      dateStr = value.substring(0, 11);
      dateValue = moment(dateTimeValue[0], format);
      timeValue = dateTimeValue.length == 2 ? dateTimeValue[1] : '';
    }

    return {
      dateValue: dateValue,
      timeValue: timeValue,
      dateStr: dateStr,
    };
  };

  closeDatePicker = () => {
    this.handleRemoveEvent();

    // 还原值
    const {dateTimeStr} = this.state;
    let dateTimeValue = this.formatRenderDateValue(dateTimeStr);

    this.setState({
      open: false,
      // mouseIn: false,
      dateStr: dateTimeValue['dateStr'],
      dateValue: dateTimeValue['dateValue'],
      timeValue: dateTimeValue['timeValue'],
      selectDateValue: '',
      selectTimeValue: '',
      switchChecked: dateTimeValue['timeValue'] ? true : false,
    });

    this.props.handleCellEditEnd();
  };

  showDatePicker = (e) => {
    this.props.handleCellEdit('DATE');
    this.setState({
      open: true,
    });

    setTimeout(() => {
      // 增加点击事件
      document.addEventListener('click', this.handleClick);
    }, 500);
  };

  switchAddTime = (checked) => {
    this.setState({
      switchChecked: checked,
      selectTimeValue: '',
    });
  };

  checkedAddTime = (v, o) => {
    this.setState({
      selectTimeValue: v,
      open: true,
    });
  };

  getOptions(Option) {
    const options = [];
    for (let i = 0; i <= 24; i++) {
      let timeStr = String(i) + ':00';
      if (i < 10) {
        timeStr = '0' + String(i) + ':00';
      } else if (i === 24) {
        timeStr = String(23) + ':59';
      }

      options.push(
        <Option key={i} value={timeStr}>
          {timeStr}
        </Option>
      );
    }
    return options;
  }

  saveDateTime = (dateValue, timeValue) => {
    if (!dateValue) {
      message.warning('日期不能为空');
      return;
    }
    this.setState({
      open: false,
      // mouseIn: false,
      selectDateValue: '',
      selectTimeValue: '',
    });
    this.handleRemoveEvent();
    this.props.handleChange(moment(dateValue).format(format) + this.#date_time_delimit + timeValue, true);
  };

  clearDateTime = () => {
    this.setState({
      open: false,
      // mouseIn: false,
      selectDateValue: '',
      selectTimeValue: '',
      switchChecked: false,
    });
    this.handleRemoveEvent();
    this.props.handleChange('', true);
  };

  renderDatePicker = (dateValue, timeValue) => {
    const {Option} = Select;
    const {switchChecked} = this.state;
    let selectStyle = switchChecked ? DISPLAY.BLOCK : DISPLAY.NONE;

    return (
      <div>
        <Row>
          <Col span={12}>
            <div style={{float: 'left'}}>
              Add time&nbsp;
              <Switch size="small" onChange={this.switchAddTime} checked={switchChecked} />
            </div>
          </Col>
          <Col span={12}>
            <div className="timeSelect">
              <Select
                // ref={this.selectRef}
                placeholder="选择时间"
                suffixIcon={<ClockCircleOutlined />}
                size="small"
                style={{display: selectStyle, width: 90}}
                onSelect={this.checkedAddTime}
                value={timeValue === '' ? undefined : timeValue}
              >
                {this.getOptions(Option)}
              </Select>
            </div>
          </Col>
        </Row>
        <Row style={{paddingBottom: '5px'}}>
          <Col span={12}>
            <Button
              type="primary"
              shape="round"
              size="small"
              style={{float: 'left'}}
              onClick={this.saveDateTime.bind(this, dateValue, timeValue)}
            >
              保存
            </Button>
          </Col>
          <Col span={12}>
            <Button size="small" shape="round" style={{float: 'right'}} onClick={this.clearDateTime}>
              清除
            </Button>
          </Col>
        </Row>
      </div>
    );
  };

  handleDateChange = (m, v) => {
    this.setState({
      dateStr: v,
      selectDateValue: moment(v, format),
    });
  };

  // handleMouseEnter = () => {
  //   this.setState({
  //     mouseIn: true,
  //   });
  // };

  // handleMouseLeave = () => {
  //   this.setState({
  //     mouseIn: false,
  //   });
  // };

  render() {
    const {dateValue, timeValue, selectDateValue, selectTimeValue, open, dateStr} = this.state;

    let dateDisplayValue = selectDateValue ? selectDateValue : dateValue;
    let timeDisplayValue = selectTimeValue ? selectTimeValue : timeValue;
    let dateTimeDisplayValue = dateStr ? dateStr + this.#date_time_delimit + timeDisplayValue : timeDisplayValue;

    return (
      <div
        className="date_div"
        onMouseDown={this.showDatePicker}
        // onMouseEnter={this.handleMouseEnter}
        // onMouseLeave={this.handleMouseLeave}
      >
        {open ? (
          <Fragment>
            <DatePicker
              // ref={this.datePickerRef}
              className="DateCell"
              popupStyle={{pointerEvents: 'visible'}}
              allowClear={false}
              bordered={false}
              placeholder=""
              // onOpenChange={this.handelOpenChange}
              open={open}
              getPopupContainer={() => this.props.container}
              // suffixIcon={<div style={{lineHeight: '33px'}}>{timeDisplayValue}</div>}
              suffixIcon={null}
              size="small"
              renderExtraFooter={this.renderDatePicker.bind(this, dateDisplayValue, timeDisplayValue)} //antd官网提供的加入额外页脚的方法
              value={dateDisplayValue}
              format={format}
              onChange={this.handleDateChange}
            />
            <Input
              style={{width: '100%', textAlign: 'center', fontSize: 13, color: '#16191F'}}
              readOnly
              value={dateTimeDisplayValue}
            />
          </Fragment>
        ) : (
          <Input
            style={{width: '100%', textAlign: 'center', fontSize: 13, color: '#16191F'}}
            readOnly
            value={dateTimeDisplayValue}
          />
        )}
      </div>
    );
  }
}

export {DateCell};
