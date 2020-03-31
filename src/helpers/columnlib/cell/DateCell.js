import React from 'react';
import 'antd/dist/antd.css'
import {Button, DatePicker,Select, Switch, Row, Col } from 'antd';
import {ClockCircleOutlined,} from '@ant-design/icons';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { Cell } from '../../../maintable/FixedDataTableRoot';
import './DateCell.less'
class DateCell extends React.Component { 
    #date_time_delimit = '  ';
    constructor(props){
      super(props);
      const valueObj = this.fomartRenderDateValue(props.value);
      this.state = {
        value:valueObj.dateValue,
        open:false,
        addDateTime:valueObj.timeValue,
        addTimeStyle:{
          display:'none'
        }
      }
    }
    componentWillReceiveProps(nextProps) {
      this.setState({
        value: this.fomartRenderDateValue(nextProps.value)['dateValue'],
        addDateTime:this.fomartRenderDateValue(nextProps.value)['timeValue'],
      });
    }
    fomartRenderDateValue = (value) => {
      let dateValue = undefined;
      let timeValue = '';
      const dateTimeValue = value?value.split(this.#date_time_delimit):'';
      if(value&&value!=''){
        dateValue = moment(dateTimeValue[0],'YYYY-MM-DD');
        timeValue = dateTimeValue[1];
      }
      return {
        dateValue:dateValue,
        timeValue:timeValue
      }
    }
    closeDatePicker = () => {
      this.setState({
        open:false
      })
    }
    showDatePicker = () => {
      this.setState({
        open:true
      })
    }
    switchAddTime = (checked) => {
      this.setState({
        addTimeStyle:{
          display:checked?'block':'none'
        }
      })
    }
    checkedAddTime = (v,o) => {
      const date = this.state.value;
      const addDateTime = o.children[0]+o.children[1];
      this.setState({
        addDateTime:addDateTime,
        value:date!=''?date:moment(),
        open:true
      })

    }
    optionVals(Option) {
      const vals = [];
      for(let i = 1; i <= 24; i++) {
        if (i > 12)
          vals.push(<Option key={i} value={i-12}>{i-12}:00 PM</Option>);
        else
          vals.push(<Option key={i} value={i}>{i}:00 AM</Option>);
      }
      return vals;
    } 
  
    renderDatePicker = () => {
      const { Option } = Select;
      const saveDateTime = () => {
        this.setState({
          open:false
        })
        this.refs.datePicker.blur();
        this.props.handleChange(moment(this.state.value).format('YYYY-MM-DD')+this.#date_time_delimit+this.state.addDateTime);
      }
      const clearDateTime = () => {
        this.setState({
          open:false,
          addDateTime:'',
          value:""
        })
        this.refs.datePicker.blur();
        this.props.handleChange("");

      }
      return (
        <div>
          <Row>
            <Col span={12}>
              <div style={{float:'left'}}>Add time&nbsp;<Switch size="small" onChange={this.switchAddTime}/>
              </div>
            </Col>
            <Col span={12}>
              <div className="timeSelect">
                <Select 
                  placeholder="选择时间" 
                  size="small"
                  suffixIcon={<ClockCircleOutlined />}
                  style={this.state.addTimeStyle}
                  onSelect={this.checkedAddTime}> 
                  {
                    this.optionVals(Option)
                  }
                </Select>
              </div>
            </Col>
          </Row>
          <Row style={{paddingBottom:'5px'}}>
            <Col span={12}>
              <Button type="primary" shape="round" size="small" style={{float:'left'}} onClick={saveDateTime}>保存</Button>
            </Col>
            <Col span={12}>
              <Button size="small" shape="round" style={{float:'right'}} onClick={clearDateTime}>清除</Button>
            </Col>
          </Row>
        </div>
      );
    };
   
    render() {
      const {data, rowIndex, columnKey, collapsedRows, callback, value, handleChange, handleKey, editing, ...props} = this.props;
      const returnValue = (e,v) => {
        this.setState({
          open:true,
          value:e
        })
      }
      
      return (
        <Cell {...props} className="DateCell">
         <DatePicker 
                ref="datePicker"
                className="DateCell"
                allowClear={false}
                bordered={false}
                placeholder=""
                open={this.state.open}
                suffixIcon={<div style={{lineHeight:'33px',color:'#8b8c8d'}}>{this.state.addDateTime}</div>}
                renderExtraFooter={this.renderDatePicker} //antd官网提供的加入额外页脚的方法
                value={this.state.value}
                onChange={returnValue}
                onFocus={this.showDatePicker}
                onBlur={this.closeDatePicker}
              />
        </Cell>
        
      );
    }
  }

  export { DateCell};