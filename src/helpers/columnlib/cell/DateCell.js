import React, {createRef} from 'react';
import 'antd/dist/antd.css';
import {Button, DatePicker, Select, Switch, Row, Col, message} from 'antd';
import {ClockCircleOutlined} from '@ant-design/icons';
import moment from 'moment';
import 'moment/locale/zh-cn';
import {Cell} from '../../../maintable/FixedDataTableRoot';
import './DateCell.less';
import {DISPLAY} from '../../section/header/StyleValues';
class DateCell extends React.Component {
  #date_time_delimit = '  ';

  constructor(props) {
    super(props);
    let dateTimeValue = this.formatRenderDateValue(props.value);

    let dateValue = dateTimeValue['dateValue'] ? dateTimeValue['dateValue'] : '';
    let timeValue = dateTimeValue['timeValue'] ? dateTimeValue['timeValue'] : '';
    this.state = {
      open: false,
      addTimeStyle: {
        display: DISPLAY.NONE,
      },
      mouseIn: true,
      dateTimeStr: props.value,
      dateValue,
      timeValue,
      selectDateValue: '',
      selectTimeValue: '',
      switchChecked: timeValue ? true : false,
    };

    this.datePickerRef = createRef();
    this.selectRef = createRef();
  }

  componentWillReceiveProps(nextProps) {
    let dateTimeValue = this.formatRenderDateValue(nextProps.value);

    let dateValue = dateTimeValue['dateValue'] ? dateTimeValue['dateValue'] : '';
    let timeValue = dateTimeValue['timeValue'] ? dateTimeValue['timeValue'] : '';

    // 判断新Props里面的值是否和原来的一致，不一致则更新并重置选择的时间，一致则不更新
    if (nextProps.value !== this.state.dateTimeStr) {
      this.setState({
        dateTimeStr: nextProps.value,
        dateValue,
        timeValue,
        selectDateValue: '',
        selectTimeValue: '',
      });
    }
  }

  componentDidMount() {
    // 添加点击的监听事件
    window.addEventListener('click', this.handleClick);
  }

  componentWillUnmount() {
    // 移除点击的监听事件
    window.removeEventListener('click', this.handleClick);
  }

  handleClick = (e) => {
    // 判断鼠标是否在日期选择框内
    if (!this.state.mouseIn) {
      this.closeDatePicker();
    }
  };

  formatRenderDateValue = (value) => {
    let dateValue = undefined;
    let timeValue = '';
    const dateTimeValue = value ? value.split(this.#date_time_delimit) : '';
    if (value && value != '') {
      dateValue = moment(dateTimeValue[0], 'YYYY-MM-DD');
      timeValue = dateTimeValue[1];
    }
    return {
      dateValue: dateValue,
      timeValue: timeValue,
    };
  };

  closeDatePicker = () => {
    this.setState({
      open: false,
    });
  };

  showDatePicker = () => {
    this.setState({
      open: true,
    });
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
    for (let i = 1; i <= 24; i++) {
      if (i > 12) {
        let time = i - 12;
        let timeStr = String(time) + ':00 PM';
        if (time < 10) {
          timeStr = '0' + String(time) + ':00 PM';
        }
        options.push(
          <Option key={i} value={timeStr}>
            {timeStr}
          </Option>
        );
      } else {
        let timeStr = String(i) + ':00 AM';
        if (i < 10) {
          timeStr = '0' + String(i) + ':00 AM';
        }
        options.push(
          <Option key={i} value={timeStr}>
            {timeStr}
          </Option>
        );
      }
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
      mouseIn: false,
      selectDateValue: '',
      selectTimeValue: '',
    });
    this.props.handleChange(moment(dateValue).format('YYYY-MM-DD') + this.#date_time_delimit + timeValue, true);
  };

  clearDateTime = () => {
    this.setState({
      open: false,
      mouseIn: false,
      selectDateValue: '',
      selectTimeValue: '',
      switchChecked: false,
    });
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
                ref={this.selectRef}
                placeholder="选择时间"
                suffixIcon={<ClockCircleOutlined />}
                size="small"
                style={{display: selectStyle, width: 106}}
                onSelect={this.checkedAddTime}
                defaultValue={timeValue === '' ? undefined : timeValue}
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
      selectDateValue: moment(v, 'YYYY-MM-DD'),
    });
  };

  setMouseIn = (mouseIn) => {
    this.setState({
      mouseIn: mouseIn,
    });
  };

  render() {
    const {dateValue, timeValue, selectDateValue, selectTimeValue, open} = this.state;

    let dateDisplayValue = selectDateValue ? selectDateValue : dateValue;
    let timeDisplayValue = selectTimeValue ? selectTimeValue : timeValue;

    // const OpenOrDismiss = (open) => {
    //   if (!open) {
    //     this.props.handleChange('', false)
    //   }
    // }
    return (
      <Cell
        className="DateCell"
        onMouseEnter={this.setMouseIn.bind(this, true)}
        onMouseLeave={this.setMouseIn.bind(this, false)}
        onClick={this.showDatePicker}
      >
        <DatePicker
          ref={this.datePickerRef}
          className="DateCell"
          popupStyle={{pointerEvents: 'visible'}}
          allowClear={false}
          bordered={false}
          placeholder=""
          // onOpenChange={OpenOrDismiss}
          open={open}
          getPopupContainer={() => this.props.container}
          suffixIcon={<div style={{lineHeight: '33px', color: '#8b8c8d'}}>{timeDisplayValue}</div>}
          size="small"
          renderExtraFooter={this.renderDatePicker.bind(this, dateDisplayValue, timeDisplayValue)} //antd官网提供的加入额外页脚的方法
          value={dateDisplayValue}
          onChange={this.handleDateChange}
          inputReadOnly={true}
        />
      </Cell>
    );
  }
}

export {DateCell};
