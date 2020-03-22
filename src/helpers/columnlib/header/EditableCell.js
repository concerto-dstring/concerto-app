import React from 'react';
import { Overlay } from 'react-overlays';
import styled from 'styled-components';
import Keys from '../../../maintable/vendor_upstream/core/Keys';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { TableCell } from '../cell/TableCell'
import { TableContext } from '../../../maintable/data/DataContext';
const CellContainer = styled.div`
  display: flex;
  flex: 1 0 100%;
  align-items: center;
  height: 100%;
  overflow: hidden;
  margin: 2px 5px;
  padding: 5px;
`

class EditableCell extends React.PureComponent {
    constructor(props){
       super(props)
       let cellData = this.getCellData(props)
       this.state = {
            value: cellData.value,
            isCollapsed: cellData.isCollapsed,
            editing: false,
            type:props.type,
            handleChange:this.handleChange,
            handleKey:this.handleKey
        }
        this.cellRenderValues={
            TEXT:true,
            NUMBER:true,
            SELECT:true,
            DATE:false,
            PEOPLE:false,
            STATUS:false
        }
        this.cellhideValues={
            TEXT:true,
            NUMBER:true,
            SELECT:true,
            DATE:true,
            PEOPLE:true,
            STATUS:false
        }
    }
    
    /**
     * 读取单元格数据，若row为空则取列标题名称(若分区折叠时则只显示分区名称)
     */
    getCellData = (props) => {
      let cellData = {}
      let isCollapsed = props.data._indexMap[props.rowIndex].isCollapsed
      let value = props.data.getObjectAt(props.rowIndex) 
                  ? 
                  props.data.getObjectAt(props.rowIndex)[props.columnKey] 
                  : 
                  (
                    isCollapsed
                    ?
                    ''
                    :
                    props.data.getColumn(props.columnKey).name
                  )
      cellData.isCollapsed =isCollapsed
      cellData.value = value

      return cellData
    }

    componentWillReceiveProps(props) {
        // this.setState({ value: props.data ? props.data.getObjectAt(props.rowIndex)[props.columnKey] : props.value});
        let cellData = this.getCellData(props)
        this.setState({ value: cellData.value,
                        isCollapsed: cellData.isCollapsed
                      });
        this.setState({ version: props.dataVersion });
    }

    setTargetRef = ref => (this.targetRef = ref);

    getTargetRef = () => this.targetRef;

    handleClick = (type) => {
        if(type){
            const columnCanEditor = this.cellRenderValues[type] ;
            if(columnCanEditor){
                this.setState({ editing: true });
            }
        }else{
            this.setState({ editing: true });
        }
    }

    handleHide = () => {
        const type = this.state.type;
        if (this.props.data) {
            this.props.data.setObjectAt(this.props.rowIndex, this.props.columnKey, this.state.value);
        }
        if(type == 'DATE'){
          this.state.value = moment(this.state.value).format('YYYY-MM-DD');
        }
        const hideValue = this.cellhideValues[type];
        if(!hideValue){
           return;
        }
        this.setState({ editing: false });
    }

    handleChange = (value)=>
    {
        this.setState({
            value: value,
        });
        
    }

    handleKey = e =>
    {
        if (e.keyCode == Keys.RETURN) {
            this.handleHide();
            return;
        }
    }

    getColumnCompentTypeByColumnKey = (columnKey) => {
        let parent = this.props.container;
            parent = parent.props.container;
        const columns = parent.props.dataset._columns
        for(let i=0,len=columns.length;i<len;i++){
            let column = columns[i];
            if(columnKey === column.columnKey){
                return column.columnComponentType;
            } 
        }
    }

    render() {
        const {container, data, rowIndex, columnKey, dataVersion, width, height,  ...props} = this.props;
        const { value, editing } = this.state;
        const type = this.state.type||'TEXT';
        
        let v = (typeof value !='undefined'&&typeof value !='string')?moment(value).format('YYYY-MM-DD'):value;
        const inputStyle = {
            width: width - 10,
            height: height - 5,
            borderRadius: '0px',
        }
       
        return (

            <CellContainer ref={this.setTargetRef} onClick={this.handleClick.bind(this,type)}>
                {!editing && this.cellRenderValues[type] && v}
                {!editing && !this.cellRenderValues[type]&&
                <TableContext.Provider value={this.state}>
                    <TableCell></TableCell>
                </TableContext.Provider>}
                {editing && this.targetRef && (
                    <Overlay
                        show
                        flip
                        rootClose
                        container={this.getTargetRef}
                        target={this.getTargetRef}
                        onHide={this.handleHide}
                        onExit={this.handleHide}
                        >
                        {({ props, placement }) => (
                            <div
                                {...props}
                                style={{
                                    ...props.style,
                                    width: this.targetRef.offsetWidth,
                                    top:
                                        placement === 'top'
                                            ? this.targetRef.offsetHeight
                                            : -this.targetRef.offsetHeight,
                                }}>
                                <TableContext.Provider value={this.state}>
                                    <TableCell></TableCell>
                                </TableContext.Provider>
                            </div>
                        )}
                    </Overlay>
                )}
            </CellContainer>
        )
    }
}

export { EditableCell };