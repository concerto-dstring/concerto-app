import React from 'react';
import 'antd/dist/antd.css'
import 'moment/locale/zh-cn';
import { TableContext } from '../../../maintable/data/DataContext';
import {PeopleCell} from './PeopleCell';
import {TextCell} from './TextCell';
import {NumberCell} from './NumberCell';
import {SelectCell} from './SelectCell';
import {DateCell} from './DateCell';
import {StatusCell} from './StatusCell';

class TableCell extends React.Component{
    constructor(props){
         super(props)
    }
    initCellHashTable(table){
      const cellHashTable = {
          PEOPLE:<PeopleCell  value={table.value} handleChange={table.handleChange} handleKey={table.handleKey} 
                              data={table.data} container={table.container}/>,
          TEXT:<TextCell  value={table.value} isHeaderOrFooter={table.isHeaderOrFooter} handleChange={table.handleChange} handleKey={table.handleKey}/>,
          NUMBER:<NumberCell  value={table.value} handleChange={table.handleChange} handleKey={table.handleKey}/>,
          SELECT:<SelectCell  value={table.value} handleChange={table.handleChange} handleKey={table.handleKey} container={table.container}/>,
          DATE:<DateCell  value={table.value} handleChange={table.handleChange} handleKey={table.handleKey} container={table.container} mouseIn={table.mouseIn} />,
          STATUS:<StatusCell  value={table.value} handleChange={table.handleChange} handleKey={table.handleKey} 
                              displayValue={table.displayValue} container={table.container}/>
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