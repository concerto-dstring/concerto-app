import React, { PureComponent } from 'react';
import './SummaryCell.less'
import {
  RightOutlined 
} from '@ant-design/icons'

class SummaryCell extends PureComponent {

  constructor(props) {
    super(props)
    this.state = ({
      columnComponentType: this.getColumnComponentType(props)
    })
  }

  componentWillReceiveProps(nextProps) {
    return ({
      columnComponentType: this.getColumnComponentType(nextProps)
    })
  }

  getColumnComponentType = (props) => {
    const { data, columnKey } = props
    const column = data.getColumn(columnKey)
    
    // 统计列（状态和日期）  && (column.columnComponentType === 'STATUS' || column.columnComponentType === 'DATE')
    if (column) {
      return column.columnComponentType
    }
      
    return null
  }

  changeGroupCollapseState = () => {
    const { data, rowIndex } = this.props

    let group = data.getGroupByRowIndex(rowIndex,true);
    data.changeGroupCollapseState(group.groupKey);
  }

  getSummaryCell = () => {
    const { data, rowIndex, columnKey } = this.props
    let column =data.getColumn(columnKey);
    const group = data.getGroupByRowIndex(rowIndex);
    const border_style={
      width:'100%',
      borderLeft:'3px solid '+ group.color
    }
    const expand_style = {
      cursor:'pointer',
      color: group.color
    }
    const toatal_style = {
      color:'black',
      paddingLeft:'150px'
    }
    const title_style = {
      fontWeight: 'bold'
    }
    const count_style = {
      color:'#cccccc',
      fontSize:'13px'
    }
    const summary_cell_background = {
      background:group.isCollapsed?'white':''
    }
    let summaryCell
    switch (this.state.columnComponentType) {
      case 'STATUS':
        // 状态列

        // 获取每个状态占的百分比
        let statusPercent = data.getStatusSummary(rowIndex, columnKey)

        summaryCell = (
          <div className="summary_cell">
            <div className="sunmmary_cell_status_container">
              {
                statusPercent.map(status => {
                  return (
                    <div
                      key={status.style.background} 
                      className="status_summary"
                      style={status.style} 
                    />
                  )
                })
              }
            </div>
          </div>
        )
        break;

      case 'DATE':
        // 日期列

        // 获取最小和最大日期及相差天数
        let dateSummary = data.getDateSummary(rowIndex, columnKey)
        let color = data.getGroupByRowIndex(rowIndex).color
        summaryCell = (
          <div className="summary_cell">
            <div className="summary_cell_date_container">
              {
                dateSummary.dateDiff
                ?
                <div style={{background: `linear-gradient(to right, ${color} ${dateSummary.datePercent}, rgb(28, 31, 59) ${dateSummary.datePercent})`}}>
                  <span
                    className="summary_cell_date_container_span" 
                    contents={dateSummary.dateText} 
                    hovercontents={dateSummary.dateDiff}
                  />
                </div>
                :
                <span className="summary_cell_date_container_span" >
                  {dateSummary.dateText} 
                </span>
              }
            </div>
          </div>
        )
        break;
    
      default:
        summaryCell = (
          <div className="default_summary_cell" style={summary_cell_background}/>
        )
        break;
    }
    if(column.name === "GROUPTITLE" && group.isCollapsed){
      summaryCell = (
        <div className="summary_cell" style={expand_style}>
          <div className="sunmmary_cell_status_container">
              <span style={{fontWeight:'bold',marginLeft:'-7px'}}>{group.name}</span>
            <div style={toatal_style}><span style={title_style}>小计：</span><span style={count_style}>共{group.rows.length}条</span></div>
          </div>
        </div>
      )
    }else if(column.name === "ROWSELECT" && group.isCollapsed){
      summaryCell = (
        <div className="summary_cell" style = {border_style}>
          <div className="sunmmary_cell_status_container">
            <RightOutlined style={expand_style} onClick={this.changeGroupCollapseState}/>
          </div>
        </div>
      )
    }else if(column.name === "ROWACTION"){
      summaryCell = (
        <div className="default_summary_cell"/>
      )
    }
    return summaryCell
  }


  render() {
    return this.getSummaryCell();
  }
}

export default SummaryCell;