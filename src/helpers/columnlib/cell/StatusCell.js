import React from 'react';
import 'antd/dist/antd.css'
import {Button ,Menu, Dropdown} from 'antd';
import 'moment/locale/zh-cn';
import '../../../maintable/css/style/TableCellComponent.css'
import { Cell } from '../../../maintable/FixedDataTableRoot';

class StatusCell extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        value:props.value
      }
      this.statusHashTable = {
        block:'阻塞',
        working:'进行中',
        finished:'已完成',
        todo:'To Do',
        default:undefined
      }
      this.statusColorHashTable = {
        block:{background:'#d2515e',color:'white',margin:'5px'},
        working:{background:'#fec06e',color:'white',margin:'5px'},
        finished:{background:'#5ac47d',color:'white',margin:'5px'},
        todo:{background:'#808080',color:'white',margin:'5px'},
        default:{background:'#c4c4c4',color:'white',height:'31px',margin:'5px'}
      }
    }
    getSelectedStatusColor(statusName){
       for(let key in this.statusColorHashTable){
          if(statusName === this.statusHashTable[key]){
             return this.statusColorHashTable[key];
          }
       }
    }
    render() {
      const {data, rowIndex, columnKey, collapsedRows, callback, value, handleChange, handleKey, ...props} = this.props;
      const returnValue = (e) => {
        const statusValue = e.key!='null'?e.item.props.children:'';
        this.setState({
          value:statusValue
        })
        return handleChange(statusValue);
      }
      const menu = <Menu style={{textAlign:'center',fontWeight:'bold'}} onClick={returnValue}>
          <Menu.Item key="working" style={this.statusColorHashTable.working}>
          {this.statusHashTable.working}
          </Menu.Item>
          <Menu.Item key="block" style={this.statusColorHashTable.block}>
          {this.statusHashTable.block}
          </Menu.Item>
          <Menu.Item key="finished" style={this.statusColorHashTable.finished}>
          {this.statusHashTable.finished}
          </Menu.Item>
          <Menu.Item key="todo" style={this.statusColorHashTable.todo}>
          {this.statusHashTable.todo}
          </Menu.Item>
          <Menu.Item key="default" style={this.statusColorHashTable.default}>
          {undefined}
          </Menu.Item>
      </Menu>
      return (
        <Cell {...props} style={{ width: '100%' }}>
            <Dropdown overlay={menu} trigger={['click']}>
              <Button style={this.getSelectedStatusColor(this.state.value)} className="statusWidth">
                  {this.state.value}
              </Button>
            </Dropdown>
        </Cell>
      );
    }
  }

  export {StatusCell};