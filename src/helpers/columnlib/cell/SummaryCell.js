import React, { PureComponent } from 'react';
import './SummaryCell.less'

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

  getSummaryCell = () => {
    const { data, rowIndex, columnKey } = this.props
    let summaryCell
    switch (this.state.columnComponentType) {
      case 'STATUS':
        // 状态列

        // 获取每个状态占的百分比
        let statusPercent = data.getStatusPercent(rowIndex, columnKey)

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
    
      default:
        summaryCell = (
          <div className="default_summary_cell" />
        )
        break;
    }

    return summaryCell
  }

  render() {
    return this.getSummaryCell();
  }
}

export default SummaryCell;