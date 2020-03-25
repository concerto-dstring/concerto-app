import React from 'react';
import 'antd/dist/antd.css'
import {Button, DatePicker,Select, Switch, Row, Col } from 'antd';
import {ClockCircleOutlined,} from '@ant-design/icons';
import moment from 'moment';
import 'moment/locale/zh-cn';
import '../../../maintable/css/style/TableCellComponent.css'
import { Cell } from '../../../maintable/FixedDataTableRoot';

class DateCell extends React.Component { 
    state = {
      value:this.props.value!=""?this.props.vlaue:undefined,
      open:false,
      addDateTime:'',
      addTimeStyle:{
        display:'none'
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
      this.setState({
        addDateTime:o.children,
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
          open:false,
          value:this.state.value?this.state.value:moment()
        })
        this.refs.datePicker.blur();
        const dateValue = this.state.value!=''?moment(this.state.value, 'YYYY-MM-DD'):undefined;
        this.props.handleChange(dateValue);
      }
      const clearDateTime = () => {
        this.setState({
          open:false,
          addDateTime:'',
          value:""
        })
        this.refs.datePicker.blur();
      }
      return (
        <div>
          <Row>
            <Col span={12}>
              <div style={{float:'left'}}>Add time&nbsp;<Switch size="small" onChange={this.switchAddTime}/>
              </div>
            </Col>
            <Col span={12}>
              <div style={{float:'right',marginTop:'7px'}}>
                <Select placeholder="选择时间" size="small" suffixIcon={<ClockCircleOutlined />} style={this.state.addTimeStyle} onSelect={this.checkedAddTime}> 
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
      const {data, rowIndex, columnKey, collapsedRows, callback, value, handleChange, handleKey, ...props} = this.props;
      const returnValue = (e,v) => {
        this.setState({
          open:true,
          value:e
        })
      }
      return (
        <Cell {...props} style={{ width: '100%' }}>
         <DatePicker 
                ref="datePicker"
                style={{ width: '100%' }}
                allowClear={false}
                bordered={false}
                placeholder=""
                open={this.state.open}
                suffixIcon={<div style={{lineHeight:'33px',color:'#8b8c8d'}}>{this.state.addDateTime}</div>}
                renderExtraFooter={this.renderDatePicker} //antd官网提供的加入额外页脚的方法
                value={typeof value!='object'?undefined:value}
                onChange={returnValue}
                onFocus={this.showDatePicker}
                onBlur={this.closeDatePicker}
              />
        </Cell>
      );
    }
  }

  export { DateCell};