import React, { createRef } from 'react'
import 'antd/dist/antd.css'
import {Button, DatePicker, Select, Switch, Row, Col, message} from 'antd'
import {ClockCircleOutlined} from '@ant-design/icons'
import moment from 'moment'
import 'moment/locale/zh-cn'
import {Cell} from '../../../maintable/FixedDataTableRoot'
import './DateCell.less'
import { DISPLAY } from '../../section/header/StyleValues'
class DateCell extends React.PureComponent {

  #date_time_delimit = '  '

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      addDateTime: '',
      addTimeStyle: {
        display: DISPLAY.NONE,
      },
    }

    this.datePickerRef = createRef()
    this.selectRef = createRef()
  }

  formatRenderDateValue = (value) => {
    let dateValue = undefined
    let timeValue = ''
    const dateTimeValue = value ? value.split(this.#date_time_delimit) : ''
    if (value && value != '') {
      dateValue = moment(dateTimeValue[0], 'YYYY-MM-DD')
      timeValue = dateTimeValue[1]
    }
    return {
      dateValue: dateValue,
      timeValue: timeValue,
    }
  }

  closeDatePicker = () => {
    this.setState({
      open: false,
    })
  }

  showDatePicker = () => {
    this.setState({
      open: true,
    })
  }

  switchAddTime = (checked) => {
    this.setState({
      addTimeStyle: {
        display: checked ? DISPLAY.BLOCK : DISPLAY.NONE,
        addDateTime: ''
      },
    })
  }

  checkedAddTime = (v, o) => {
    const addDateTime = o.children[0] + o.children[1]
    this.setState({
      addDateTime: addDateTime,
      open: true
    })
  }

  optionVals(Option) {
    const vals = []
    for (let i = 1; i <= 24; i++) {
      if (i > 12)
        vals.push(
          <Option key={i} value={i - 12}>
            {i - 12}:00 PM
          </Option>
        )
      else
        vals.push(
          <Option key={i} value={i}>
            {i}:00 AM
          </Option>
        )
    }
    return vals
  }

  saveDateTime = (dateValue, timeValue) => {
    if (!dateValue) {
      message.warning('日期不能为空')
      return
    }
    const { addDateTime } = this.state
    this.setState({
      open: false,
    })
    this.props.handleChange(
      moment(dateValue).format('YYYY-MM-DD') +
        this.#date_time_delimit +
        addDateTime ? addDateTime : timeValue,
      true
    )
  }

  clearDateTime = () => {
    this.setState({
      open: false,
      addDateTime: '',
    })
    this.refs.datePicker.blur()
    this.props.handleChange('', true)
  }

  renderDatePicker = (dateValue, timeValue) => {
    const {Option} = Select
    const { addTimeStyle } = this.state
    let selectStyle = timeValue !== "" ? {display: DISPLAY.BLOCK} : addTimeStyle
    return (
      <div>
        <Row>
          <Col span={12}>
            <div style={{float: 'left'}}>
              Add time&nbsp;
              <Switch size="small" onChange={this.switchAddTime} />
            </div>
          </Col>
          <Col span={12}>
            <div className="timeSelect">
              <Select
                ref={this.selectRef}
                autoFocus={true}
                placeholder="选择时间"
                size="small"
                suffixIcon={<ClockCircleOutlined />}
                style={selectStyle}
                onSelect={this.checkedAddTime}
                onBlur={this.handleBlur}
              >
                {this.optionVals(Option)}
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
            <Button
              size="small"
              shape="round"
              style={{float: 'right'}}
              onClick={this.clearDateTime}
            >
              清除
            </Button>
          </Col>
        </Row>
      </div>
    )
  }

  handleDateChange = (e, v) => {
    this.props.handleChange(v, false)
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
      editing,
      ...props
    } = this.props

    const { addDateTime, open } = this.state
    if (this.datePickerRef.current) {
      this.datePickerRef.current.blur = null
    }
    let dateTimeValue = this.formatRenderDateValue(value)

    let dateValue = dateTimeValue['dateValue'] ? dateTimeValue['dateValue'] : ""
    let timeValue = dateTimeValue['timeValue'] ? dateTimeValue['timeValue'] : ""

    const OpenOrDismiss = (open) => {
      if (!open) {
        this.props.handleChange('', false)
      }
    }
    return (
      <Cell {...props} className="DateCell" onFocus={this.showDatePicker} onBlur={this.closeDatePicker}
     >
        <DatePicker
          ref={this.datePickerRef}
          className="DateCell"
          popupStyle={{pointerEvents: 'visible'}}
          allowClear={false}
          bordered={false}
          placeholder=""
          onOpenChange={OpenOrDismiss}
          open={open}
          getPopupContainer={() => this.props.container}
          suffixIcon={
            <div style={{lineHeight: '33px', color: '#8b8c8d'}}>
              {addDateTime ? addDateTime : timeValue}
            </div>
          }
          renderExtraFooter={this.renderDatePicker.bind(this, dateValue, timeValue)} //antd官网提供的加入额外页脚的方法
          value={dateValue}
          onChange={this.handleDateChange}
        />
      </Cell>
    )
  }
}

export {DateCell}
