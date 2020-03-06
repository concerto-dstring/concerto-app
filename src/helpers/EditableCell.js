import React from 'react';
import { Overlay } from 'react-overlays';
import 'antd/dist/antd.css'
import {Button} from 'antd';
import { Input } from 'semantic-ui-react';
import styled from 'styled-components';
import Keys from '../maintable/vendor_upstream/core/Keys';
import moment from 'moment';
import 'moment/locale/zh-cn';
import TableCellComponent from '../maintable/TableCellComponent';
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
    state = {
        value: this.props.data ? this.props.data.getObjectAt(this.props.rowIndex)[this.props.columnKey] : this.props.value,
        editing: false,
        type:this.props.type
    }

    componentWillReceiveProps(props) {
        this.setState({ value: props.data ? props.data.getObjectAt(this.props.rowIndex)[this.props.columnKey] : props.value});
    }

    setTargetRef = ref => (this.targetRef = ref);

    getTargetRef = () => this.targetRef;

    handleClick = () => {
        this.setState({ editing: true });
    }

    handleHide = () => {
        const type = this.state.type;
        if (this.props.data) {
            this.props.data.setObjectAt(this.props.rowIndex, this.props.columnKey, this.state.value);
        }
        if(type == 'DATE'){
          this.state.value = moment(this.state.value).format('YYYY-MM-DD');
        }else if(type == 'STATUS'){
          return;
        }
        this.setState({ editing: false });
        
    }

    handleChange = (e,v )=>
    {
        const type = this.state.type;
        let value = '';
        switch(type){
           case 'DATE':
                 value = moment(v, 'YYYY-MM-DD');
                 break;
           case 'NUMBER':
                 value = e;
                 break;
           case 'SELECT':
                 value = e;
                 break;    
           case 'PEOPLE':
                 value = String(e);
                 break;
           case 'STATUS':
                 value = e.key!='null'?e.key:'';
                 break;                       
           default:
                 value = e.target.value;    
        }
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

    render() {
        const {container, data, rowIndex, columnKey, width, height,  ...props} = this.props;
        const { value, editing } = this.state;
        const type = this.state.type;
        const inputStyle = {
            width: width - 10,
            height: height - 5,
            borderRadius: '0px',
        }
        const tableCellComponent = new TableCellComponent();
        const component = tableCellComponent.createTableCellComponentByType(type,value,inputStyle,[this.handleChange,this.handleKey]);
        return (

            <CellContainer ref={this.setTargetRef} onClick={this.handleClick}>
                {!editing && value}
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
                                {/* <Input autoFocus value={value} onChange={this.handleChange} style={inputStyle}
                      onKeyDown={this.handleKey} /> */}
                                {component}

                            </div>
                        )}
                    </Overlay>
                )}
            </CellContainer>
        )
    }
}

export { EditableCell };