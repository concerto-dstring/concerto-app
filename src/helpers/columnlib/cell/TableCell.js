import React from 'react';
import 'antd/dist/antd.css'
import 'moment/locale/zh-cn';
import '../../../maintable/css/style/TableCellComponent.css'
import { TableContext } from '../../../maintable/data/DataContext';
import {PeopleCell} from './PeopleCell'
import {TextCell} from './TextCell'
import {NumberCell} from './NumberCell'
import {SelectCell} from './SelectCell'
import {DateCell} from './DateCell'
import {StatusCell} from './StatusCell'

class TableCell extends React.Component{
    constructor(props){
         super(props)
    }
    initCellHashTable(table){
      const cellHashTable = {
          PEOPLE:<PeopleCell  value={table.value} handleChange={table.handleChange} handleKey={table.handleKey}/>,
          TEXT:<TextCell  value={table.value} isHeaderOrFooter={table.isHeaderOrFooter} handleChange={table.handleChange} handleKey={table.handleKey}/>,
          NUMBER:<NumberCell  value={table.value} handleChange={table.handleChange} handleKey={table.handleKey}/>,
          SELECT:<SelectCell  value={table.value} handleChange={table.handleChange} handleKey={table.handleKey}/>,
          DATE:<DateCell  value={table.value} handleChange={table.handleChange} handleKey={table.handleKey}/>,
          STATUS:<StatusCell  value={table.value} handleChange={table.handleChange} handleKey={table.handleKey}/>
      }
      return cellHashTable[table.type];

    }
    render(){
      const {type, ...props} = this.props;
      return(
        <TableContext.Consumer>
           {(table) => (
             this.initCellHashTable(table)
           )}
        </TableContext.Consumer>
      )
    } 
}



export { 
  TableCell 
};