import React from 'react';
import 'antd/dist/antd.css'
import {Button ,Menu, Dropdown} from 'antd';
import 'moment/locale/zh-cn';
import '../../../maintable/css/style/TableCellComponent.css'
import { Cell } from '../../../maintable/FixedDataTableRoot';
import './StatusCell.less';

class StatusCell extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        value:props.value||''
      }
      this.statusHashTable = {
        block:'阻塞',
        working:'进行中',
        finished:'已完成',
        todo:'To Do',
        default:''
      }
    }
    render() {
      const {data, rowIndex, columnKey, collapsedRows, callback, value, handleChange, handleKey, ...props} = this.props;
      const returnValue = (e) => {
        const selectedText = e.item.props.children;
        const selectedStyle = e.item.props.className;
        const statusValue = selectedText?selectedText:'';
        this.setState({
          value:statusValue,
          styleClassName:selectedStyle,
        })
        handleChange(statusValue);
      }
      const menu = <Menu onClick={returnValue} className='statusCellMenu'>
          <Menu.Item key="working" className='workingItem'>
          {this.statusHashTable.working}
          </Menu.Item>
          <Menu.Item key="block" className='blockItem'>
          {this.statusHashTable.block}
          </Menu.Item>
          <Menu.Item key="finished" className='finishedItem'>
          {this.statusHashTable.finished}
          </Menu.Item>
          <Menu.Item key="todo" className='todoItem'>
          {this.statusHashTable.todo}
          </Menu.Item>
          <Menu.Item key="default" className='defaultItem'>
          </Menu.Item>
      </Menu>
      let cellStatusTextStyle = this.state.styleClassName + ' statusWidth longText';
      return (
        <Cell {...props} className='statusCell'>
            <Dropdown overlay={menu} trigger={['click']}>
              <div className={cellStatusTextStyle}>
                  {this.state.value}
              </div>
            </Dropdown>
        </Cell>
      );
    }
  }

  export {StatusCell};