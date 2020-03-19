import React, { Component } from 'react';
import { Overlay } from 'react-overlays';
import { Input } from 'semantic-ui-react';
import styled from 'styled-components';
import Keys from '../maintable/vendor_upstream/core/Keys';

import {
  COLOR,
} from './StyleValues'

const CellContainer = styled.div`
  display: flex;
  flex: 1 0 100%;
  align-items: center;
  height: 100%;
  overflow: hidden;
  margin: 2px 5px;
  padding: 5px;
`

class SectionHeader extends Component {

  constructor(props) {
    super(props)
    const { data, rowIndex } = props
    this.state = {
      group: data.getGroupByRowIndex(rowIndex),
      editing: false,
    }
  }

  componentWillReceiveProps(props) {

    const { data, rowIndex } = props
    
    this.setState({ 
      group: data.getGroupByRowIndex(rowIndex),
      version: props.dataVersion
    });
  }

  setTargetRef = ref => (this.targetRef = ref);

  getTargetRef = () => this.targetRef;

  handleClick = () => { 
    this.setState({ editing: true });
  }

  handleHide = () => {
    this.setState({ editing: false });
    if (this.props.data) {
      this.props.data.setGroupData(this.state.group);
    }
  }

  handleChange = e =>
  {
    this.setState({
      group: {...this.state.group, name: e.target.value},
    });
  }

  handleKey = e =>
  {
    if (e.keyCode == Keys.RETURN) {
      this.handleHide();
      return;
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { columnKey, rowIndex } = this.props

    const { group, editing, version } = this.state

    if (columnKey !== nextProps.columnKey ||
        rowIndex !== nextProps.rowIndex ||
        JSON.stringify(group) !== JSON.stringify(nextState.group) ||
        editing !== nextState.editing ||
        version !== nextState.version) {
          
      return true
    }

    return false
  } 

  render() {
    const { width, height } = this.props;
    const { group, editing } = this.state;

    let groupName = group ? group.name : ''
    let groupColor = group ? group.color : COLOR.SECTION_DEFAULT

    const inputStyle = {
      width: width - 10,
      height: height - 5,
      borderRadius: '0px',
    }
    
    return (
      <CellContainer 
        ref={this.setTargetRef} 
        onClick={this.handleClick}
        style={{color: groupColor}}
      >
        {!editing && groupName}
        {editing && this.targetRef && (
          <Overlay
            show
            flip
            rootClose
            container={this.getTargetRef}
            target={this.getTargetRef}
            onHide={this.handleHide}
            onExit={this.handleHide}>
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
                <Input autoFocus value={groupName} onChange={this.handleChange} style={inputStyle}     
                      onKeyDown={this.handleKey} />
              </div>
            )}
          </Overlay>
        )}
      </CellContainer>
    )
  }
}

export default SectionHeader;