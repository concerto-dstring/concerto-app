import React from 'react';
import 'antd/dist/antd.css'
import { Popover, Button, Avatar } from 'antd';
import {UserOutlined,} from '@ant-design/icons';
import './PeopleFilter.less'

class PeopleFilter extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      shape:'circle',
      buttonText:'',
      buttonType:'default'
    }
  }
  showPeople = () => {
    this.setState({
      shape:'round',
      buttonText:'Person',
      buttonType:'primary'
    })
  }
  visibleChange = (status) => {
   if(!status){
      this.setState({
        shape:'circle',
        buttonText:'',
        buttonType:'default'
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
        persons.map((v, i) => (
            <Button 
                shape="circle"
                className="peopleAvatar"
                style={{
                    background:v.faceColor
                }}
            >
            {v.smallName}
            </Button>                 
        ))
    }
    </div>;
    return(
        <Popover 
            placement="bottom"
            trigger="click" 
            content={content} 
            onVisibleChange={this.visibleChange}
        >
            <Button 
                type={this.state.buttonType}
                shape={this.state.shape}
                icon={<UserOutlined />}
                onClick={this.showPeople}
            >
            {this.state.buttonText}    
            </Button>
        </Popover>
    )
  }
}

export default PeopleFilter