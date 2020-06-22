import React, {PureComponent, Fragment, createRef} from 'react';
import './SummaryCell.less';
import {RightOutlined} from '@ant-design/icons';
import {Popover, Radio} from 'antd';
import {DateCellSummaryRule} from './CellProperties';

class SummaryCell extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      columnComponentType: this.getColumnComponentType(props),
      isChanged: false,
    };

    this.popoverRef = createRef();
  }

  componentWillReceiveProps(nextProps) {
    return {
      columnComponentType: this.getColumnComponentType(nextProps),
    };
  }

  getColumnComponentType = (props) => {
    const {data, columnKey} = props;
    const column = data.getColumn(columnKey);

    // 统计列（状态和日期）  && (column.columnComponentType === 'STATUS' || column.columnComponentType === 'DATE')
    if (column) {
      return column.columnComponentType;
    }

    return null;
  };

  changeGroupCollapseState = () => {
    const {data, rowIndex} = this.props;

    let group = data.getGroupByRowIndex(rowIndex, true);
    data.changeGroupCollapseState(group.groupKey);
  };

  handleVisibleChange = (visible) => {
    if (visible) {
      this.props.onCellEdit(this.props.rowIndex, this.props.columnKey);
    } else {
      this.props.onCellEditEnd(this.props.rowIndex, this.props.columnKey);
    }
  };

  handleRadioChange = (e) => {
    this.popoverRef.current.tooltip.state.visible = false;
    this.setState({
      isChanged: !this.state.isChanged,
    });

    let value = e.target.value;
    this.props.data.updateColumnBoardData(this.props.columnKey, {
      summaryRule: value,
    });
  };

  getSummaryCell = () => {
    const {data, rowIndex, columnKey, container} = this.props;
    let column = data.getColumn(columnKey);
    const group = data.getGroupByRowIndex(rowIndex);
    const border_style = {
      width: '100%',
      borderLeft: '3px solid ' + group.color,
    };
    const expand_style = {
      cursor: 'pointer',
      color: group.color,
    };
    const toatal_style = {
      color: 'black',
      paddingLeft: '15px',
    };
    const title_style = {
      fontWeight: 'nomal',
    };
    const count_style = {
      color: '#cccccc',
      fontSize: '13px',
    };
    const summary_cell_background = {
      background: group.isCollapsed ? 'white' : '',
    };
    let summaryCell;
    switch (this.state.columnComponentType) {
      case 'STATUS':
        // 状态列

        // 获取每个状态占的百分比
        let statusPercent = data.getStatusSummary(rowIndex, columnKey);

        summaryCell = (
          <div className="summary_cell">
            <div className="summary_cell_status_container">
              {statusPercent.map((status) => {
                return <div key={status.style.background} className="status_summary" style={status.style} />;
              })}
            </div>
          </div>
        );
        break;

      case 'DATE':
        // 日期列

        // 获取最小和最大日期及相差天数
        let dateSummary = data.getDateSummary(rowIndex, columnKey);
        const radioStyle = {
          display: 'block',
          height: '30px',
          lineHeight: '30px',
        };

        summaryCell = (
          <Fragment>
            <Popover
              ref={this.popoverRef}
              placement="leftTop"
              trigger="click"
              autoAdjustOverflow={false}
              getPopupContainer={() => container}
              onVisibleChange={this.handleVisibleChange}
              content={
                <Radio.Group
                  style={{marginLeft: 4, pointerEvents: 'visible'}}
                  onChange={this.handleRadioChange}
                  value={dateSummary.summaryRule}
                >
                  <Radio style={radioStyle} value={DateCellSummaryRule.EARLIEST.key}>
                    {DateCellSummaryRule.EARLIEST.desc}
                  </Radio>
                  <Radio style={radioStyle} value={DateCellSummaryRule.LATEST.key}>
                    {DateCellSummaryRule.LATEST.desc}
                  </Radio>
                </Radio.Group>
              }
            >
              <div className="summary_cell">
                <div className="summary_cell_date_container">
                  {/* {dateSummary.dateDiff ? (
                  <div
                    style={{
                      background: `linear-gradient(to right, ${color} ${dateSummary.datePercent}, rgb(28, 31, 59) ${dateSummary.datePercent})`,
                    }}
                  >
                    <span
                      className="summary_cell_date_container_span"
                      contents={dateSummary.dateText}
                      hovercontents={dateSummary.dateDiff}
                    />
                  </div>
                ) : (
                  <span className="summary_cell_date_container_span">{dateSummary.dateText}</span>
                )} */}
                  {dateSummary.dateText2 ? (
                    <Fragment>
                      <div className="summary_cell_date_container_rule">{dateSummary.dateText1}</div>
                      <div className="summary_cell_date_container_text">{dateSummary.dateText2}</div>
                    </Fragment>
                  ) : null}
                </div>
              </div>
            </Popover>
          </Fragment>
        );
        break;

      default:
        summaryCell = <div className="default_summary_cell" style={summary_cell_background} />;
        break;
    }
    if (column.name === 'GROUPTITLE' && group.isCollapsed) {
      summaryCell = (
        <div className="summary_cell" style={expand_style}>
          <div className="summary_cell_status_container">
            <span style={{marginLeft: '-7px', width: '200px'}}>{group.name}</span>
            <div style={toatal_style}>
              <span style={title_style}>小计：</span>
              <span style={count_style}>共{group.rows.length}条</span>
            </div>
          </div>
        </div>
      );
    } else if (column.name === 'ROWSELECT' && group.isCollapsed) {
      summaryCell = (
        <div className="summary_cell" style={border_style}>
          <div className="summary_cell_status_container">
            <RightOutlined style={expand_style} onClick={this.changeGroupCollapseState} />
          </div>
        </div>
      );
    } else if (column.name === 'ROWACTION') {
      summaryCell = <div className="default_summary_cell" />;
    }
    return summaryCell;
  };

  render() {
    return this.getSummaryCell();
  }
}

export default SummaryCell;
