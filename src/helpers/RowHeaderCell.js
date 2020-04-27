import React from 'react';
import { Overlay } from 'react-overlays';
import { Badge } from 'antd';
import { Input } from 'semantic-ui-react';
import Keys from '../maintable/vendor_upstream/core/Keys';
import styled from 'styled-components';
import getHighlightText from '../maintable/getHighlightText'
import {
  EditOutlined,
  UnorderedListOutlined
} from '@ant-design/icons'
import '../maintable/css/style/RowHeaderCell.less'
import { connect } from 'react-redux'
import { dealRowHeaderDrawer } from '../maintable/actions/rowActions'

const CellContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  overflow: hidden;
  cursor: pointer;
  text-align: left;
  padding: 5px;
`;

@connect(null, { dealRowHeaderDrawer })
class RowHeaderCell extends React.PureComponent {
    constructor(props){
       super(props)
       let value = props.data ? props.data.getObjectAt(props.rowIndex)[props.columnKey] : props.value
       this.state = {
          value: value,
          displayValue: getHighlightText(value, props.filterInputValue),
          count: props.data ? props.data.getSubRowCount(props.rowIndex) : 0,
          editing: false,
          handleChange:this.handleChange,
          handleKey:this.handleKey,
          updateInfo: this.getRowUpdateInfo(props),
        }
    }
    
    componentWillReceiveProps(props) {
        let value = (props.data &&props.data.getObjectAt(props.rowIndex))? props.data.getObjectAt(props.rowIndex)[props.columnKey] : props.value
        this.setState({ 
            value: value,
            displayValue: getHighlightText(value, props.filterInputValue),
            count: props.data ? props.data.getSubRowCount(props.rowIndex) : 0,
            version: props.dataVersion,
            updateInfo: this.getRowUpdateInfo(props)
        });
    }

    getRowUpdateInfo = (props) => {
      // 滑窗里菜单Update Info数据
      let updateInfo 
      if (!props.data || !props.data.getObjectAt(props.rowIndex) || !props.data.getObjectAt(props.rowIndex)['updateInfo']) {
        updateInfo = []
      }
      else {
        updateInfo = props.data.getObjectAt(props.rowIndex)['updateInfo']
      }
      return updateInfo
    }

    setTargetRef = ref => (this.targetRef = ref);

    getTargetRef = () => this.targetRef;

    handleClick = (e) => {
      // 防止document事件的冒泡
      e.nativeEvent.stopImmediatePropagation();
      e.stopPropagation()
      e.preventDefault()
      this.setState({ editing: true });
    }

    handleHide = () => {
        if (this.props.data) {
            this.props.data.setObjectAt(this.props.rowIndex, this.props.columnKey, this.state.value);
        }
        this.setState({ editing: false });
    }

    handleChange = (e)=> {
        this.setState({
            value: e.target.value,
        });
    }

    handleKey = e => {
        if (e.keyCode == Keys.RETURN) {
            this.handleHide();
            return;
        }
    }

    toggleSubRows = (event) => {
        this.props.data.toggleSubRows(this.props.rowIndex);
        event.stopPropagation();
    }

    // 显示右侧滑窗
    showRowDrawer = (event) => {
      event.stopPropagation();
      const { updateInfo, value } = this.state
      const { data, rowIndex } = this.props
      this.props.dealRowHeaderDrawer({rowHeaderDrawerTitle: value, updateInfo, data, rowIndex, isOpenRowHeaderDrawer: true})
    }

    getCellComponent = () => {
      const { height } = this.props;
      const { count, displayValue, updateInfo } = this.state;
      return (
        <>
          <div className="row_header_cell_text_component" style={{lineHeight: `${height - 10}px`}}>
            <i onClick={this.handleClick.bind(this)} className="row_header_cell_edit_icon">
              <EditOutlined />
            </i>
            <div className="row_header_cell_text">
              {displayValue}
            </div>
          </div>
          <div style={{marginLeft: 4, lineHeight: `${height - 10}px`}}><UnorderedListOutlined />&nbsp;{count}</div>
          <div 
            className="row_header_cell_update"
            style={{lineHeight: `${height - 10}px`}}
          >
            <span>
              <Badge count={updateInfo.length} style={{backgroundColor: '#BB0000'}} />
            </span>
          </div>
        </>
      )
    }

    render() {
        const {container, data, rowIndex, columnKey, dataVersion, width, height,  ...props} = this.props;
        const { value, editing } = this.state;
        const inputStyle = {
            width: width - 10,
            height: height - 5,
            borderRadius: '0px',
        }

        return (
            <>
                <CellContainer 
                  ref={this.setTargetRef} 
                  className="row_header_cell_component"
                  onClick={this.showRowDrawer}
                  style={editing ? {margin: '2px 5px'} : {}}
                >
                    {!editing && this.getCellComponent()}
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
                                    <Input autoFocus value={value} onChange={this.handleChange} style={inputStyle}
                                        onKeyDown={this.handleKey} />
                                </div>
                            )}
                        </Overlay>
                    )}
                </CellContainer>
            </>
        )
    }
}

export { RowHeaderCell };