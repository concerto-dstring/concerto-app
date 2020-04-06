import React from 'react';
import { Overlay } from 'react-overlays';
import { Badge } from 'antd';
import { Input } from 'semantic-ui-react';
import Keys from '../maintable/vendor_upstream/core/Keys';
import styled from 'styled-components';
import getHighlightText from '../maintable/getHighlightText'

const CellContainer = styled.div`
  display: flex;
  flex: 1 0 100%;
  align-items: center;
  height: 100%;
  overflow: hidden;
  margin: 2px 5px;
  padding: 5px;
`;

class RowHeaderCell extends React.PureComponent {
    constructor(props){
       super(props)
       let value = props.data ? props.data.getObjectAt(props.rowIndex)[props.columnKey] : props.value
       this.state = {
            value: value,
            displayValue: getHighlightText(value, props.data.getFilterInputValue()),
            count: props.data ? props.data.getSubRowCount(props.rowIndex) : 0,
            editing: false,
            handleChange:this.handleChange,
            handleKey:this.handleKey
        }
    }
    
    componentWillReceiveProps(props) {
        let value = props.data ? props.data.getObjectAt(props.rowIndex)[props.columnKey] : props.value
        this.setState({ 
            value: value,
            displayValue: getHighlightText(value, props.data.getFilterInputValue()),
            count: props.data ? props.data.getSubRowCount(props.rowIndex) : 0,
            version: props.dataVersion,
        });
    }

    setTargetRef = ref => (this.targetRef = ref);

    getTargetRef = () => this.targetRef;

    handleClick = () => {
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

    render() {
        const {container, data, rowIndex, columnKey, dataVersion, width, height,  ...props} = this.props;
        const { value, editing, count, displayValue } = this.state;
        const inputStyle = {
            width: width - 10,
            height: height - 5,
            borderRadius: '0px',
        }
        return (
            <>
                <CellContainer ref={this.setTargetRef} onClick={this.handleClick.bind(this)}>
                    <div style={{width:50}}>
                    {count != 0 && <a onClick={this.toggleSubRows}><Badge count={count+'+'} /></a>}
                    </div>
                    {!editing && displayValue}
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