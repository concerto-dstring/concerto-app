import React from 'react';
import 'antd/dist/antd.css'
import { Popover, Button, Avatar } from 'antd';
import {UserOutlined,CloseCircleOutlined,SaveOutlined} from '@ant-design/icons';
import './PeopleFilter.less'

class PeopleFilter extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      visible:false,
      hasCheckPeople:false,
      shape:'circle',
      buttonText:null,
      buttonType:'default',
      checkedPeople:{},
      peopleAvatar:<UserOutlined />
    }
  }
  showPeople = () => {
    this.setState({
      visible:true,
      shape:'round',
      buttonText:'Person',
      buttonType:'primary'
    })
  }
  removePeople = () => {
    this.setState({
      visible:false,
      hasCheckPeople:false,
      shape:'circle',
      buttonText:null,
      buttonType:'default',
      checkedPeople:{},
      peopleAvatar:<UserOutlined />
    });
  }
  checkPeople = (people) => {
    const peopleAvatar = 
      <Avatar 
        size={30} 
        className="peopleAvatarIcon"
        style={{background:people.faceColor}}>
        <span>{people.smallName}</span>
      </Avatar>
    this.setState({
      visible:false,
      shape:'round',
      buttonText:null,
      hasCheckPeople:true,
      checkedPeople:people,
      peopleAvatar:peopleAvatar
    })
  }
  visibleChange = (status) => {
    if(!status&&!this.state.hasCheckPeople){
      this.setState({
        shape:'circle',
        buttonText:null,
        visible:false,
        buttonType:'default'
      })
    }else if(!status&&this.state.hasCheckPeople){
      this.setState({
        shape:'round',
        buttonText:null,
        visible:false,
        buttonType:'primary'
      })
    }
  }
  render = () => {
    const persons = [{
        smallName:'Z',
        userName:'ZhangTao',
        faceColor:'#f4617f'
    },{
        smallName:'C',
        userName:'Lucy Chen',
        faceColor:'#66cdff'
    },{
        smallName:'L',
        userName:'Leo',
        faceColor:'#f49642'
    },{
        smallName:'M',
        userName:'Jack Ma',
        faceColor:'#79cdcd'
    },{
        smallName:'W',
        userName:'Civen Wang',
        faceColor:'#f4617f'
    }]
    const content = <div>
    {
      <div>
         {
           persons.map((people, i) => (
             <Button 
                shape="circle"
                className="peopleAvatar"
                onClick={this.checkPeople.bind(this,people)}
                style={{
                    background:people.faceColor,
                    boxShadow:this.state.checkedPeople.userName == people.userName?'#cce9ff 0px 0px 5px 5px':'none',
                }}
             >
             {people.smallName}
             </Button>
           ))
         }
         <Button 
           className="saveView"
           disabled={true}>
           <SaveOutlined className="saveViewBtn"/>保存视图
         </Button> 
      </div>                
        
    }
    </div>;
    const removeIconStyle = {
        display:this.state.hasCheckPeople?'inline':'none'
    }
    return(
        <Popover 
            placement="bottom"
            trigger="click" 
            content={content} 
            visible={this.state.visible}
            onVisibleChange={this.visibleChange}
        >
            <Button 
                type={this.state.buttonType}
                shape={this.state.shape}
                icon={this.state.peopleAvatar}
                onClick={this.showPeople}
            >
                {this.state.buttonText}
                <CloseCircleOutlined 
                    style={removeIconStyle} 
                    className="removeIcon"
                    onClick={this.removePeople}
                />
            </Button>
        </Popover>
    )
  }
}

export default PeopleFilter