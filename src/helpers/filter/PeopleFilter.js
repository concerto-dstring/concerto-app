import React from 'react';
import 'antd/dist/antd.css'
import { Popover, Button, Avatar } from 'antd';
import {UserOutlined,CloseCircleOutlined,SaveOutlined,CloseCircleFilled} from '@ant-design/icons';
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
  showPeople = (e) => {
    this.setState({
      visible:true,
      shape:'round',
      buttonText:'Person',
      buttonType:'primary'
    })
  }
  removePeople = (e) => {
    this.setState({
      visible:false,
      hasCheckPeople:false,
      shape:'circle',
      buttonText:null,
      buttonType:'default',
      checkedPeople:{},
      peopleAvatar:<UserOutlined />
    });
    e.stopPropagation();
    this.props.doFilter(null);
  }
  checkPeople = (people) => {
    const peopleAvatar = 
      <Avatar 
        size={30} 
        className="peopleAvatarIcon"
        style={{background:people.faceColor}}>
        <span>{people.smallName}</span>
      </Avatar>;
    this.setState({
      visible:false,
      shape:'round',
      buttonText:null,
      hasCheckPeople:true,
      checkedPeople:people,
      peopleAvatar:peopleAvatar
    });
    this.props.doFilter(people);
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
    const content =  <div>
        {
        persons.map((people, i) => (
            <Button 
                key={i}
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
                className="filterButton"
            >
                {this.state.buttonText}
                <a 
                  style={removeIconStyle}
                  onClick={this.removePeople}>
                  <CloseCircleFilled className="removeBtn"/>
                </a>
            </Button>
        </Popover>
    )
  }
}

export default PeopleFilter