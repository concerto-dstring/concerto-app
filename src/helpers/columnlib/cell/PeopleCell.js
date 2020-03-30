import React from 'react';
import 'antd/dist/antd.css'
import {Avatar,Button,Input, Popover, Tag, Divider } from 'antd';
import {CloseCircleFilled,UserOutlined,PlusCircleFilled } from '@ant-design/icons';
import 'moment/locale/zh-cn';
import '../../../maintable/css/style/TableCellComponent.css'
import { Cell } from '../../../maintable/FixedDataTableRoot';

class PeopleCell extends React.Component {
    state = {
      visible:false,
      selectedUsers:(this.props.value&&this.props.value!='')?this.props.value:[],
      removeBar:{
        display:'none'
      }
    }
    showUserPanel = () => {
      this.setState({
        visible:true
      })
    }
    getUserArray = () => {
      return [{
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
    }
    render() {
      const {Search} = Input;
      const {data, rowIndex, columnKey, collapsedRows, callback, value, handleChange, handleKey, ...props} = this.props;
      const someusers = this.state.selectedUsers;
      const returnValue = (e) => {
        let isHas = false;
        for(let i=0,len=someusers.length;i<len;i++){
            if(e.userName === someusers[i].userName){
               isHas = true;
               break;
            }
        }
        if(!isHas){
          someusers.push(e);
        }
        this.setState({
          visible:false,
          selectedUsers:someusers
        })
        handleChange(someusers);

      }
      const removeUser = (user) =>{
        const someusers = this.state.selectedUsers;
        for(let j=0,len2=someusers.length;j<len2;j++){
            if(user.userName === someusers[j].userName){
              someusers.splice(j,1);
              break;
            }
        }
        this.setState({
          selectedUsers:someusers
        })
        handleChange(someusers);
      }
      const memoveAllUsers = (e) => {
        this.setState({
          selectedUsers:[]
        })
        handleChange(new Array());
      }
      const showRemoveUserBar = () => {
        const display = this.state.selectedUsers.length<1?'none':'block';
        this.setState({
          removeBar:{
            display:display
          }
        })
      }
      const hideRemoveUserBar = () => {
        this.setState({
          removeBar:{
            display:"none"
          }
        })
      }
      return (
        <Cell {...props} style={{ width: '100%' }}>
           <Popover  
              placement="bottom" 
              trigger="click" 
              autoAdjustOverflow={false} 
              style={{width:'300px'}}
              visible={this.state.visible}
              onClick={this.showUserPanel}
              content={
                <div>
                  <Divider className="dividerStyle">People</Divider>
                  <div>
                  {
                    this.getUserArray().map((v, i) => (
                      <div key={i} className="user" onClick={returnValue.bind(this,v)}>
                          <div style={{padding:'5px',fontSize:'13px'}}>&nbsp;
                          <Avatar size={25} 
                            style={{background:v.faceColor}}>
                            {v.smallName}
                          </Avatar>&nbsp;
                          {v.userName}
                          </div>
                      </div>
                    ))
                  }
                  </div>
                </div>
              } 
              title={
                  <div>
                    <div style={{paddingBottom:'10px'}}>
                    {
                      someusers.map((v, i) => (
                        <Tag 
                          key={i} 
                          closable
                          className="userTag" 
                          onClose={removeUser.bind(this,v)}
                        >
                          <Avatar 
                            size={22} 
                            style={{background:v.faceColor}}>
                            {v.smallName}
                          </Avatar>
                          &nbsp;{v.userName}
                        </Tag>
                      ))
                    }
                    </div>
                    <Search
                        placeholder="Enter name"
                        bordered={false}
                        onSearch={value => console.log(value)}
                        style={{margin:'0 0 5px 0',border:'none' }}
                    />
                  </div>
              }>
              {
                  someusers.length>0&&
                  <div onMouseEnter={showRemoveUserBar} onMouseLeave={hideRemoveUserBar}>
                    <div className="userAvatar">
                      {
                        someusers.length===1&&
                          <Avatar
                             className="Avatar" 
                             style={{background:someusers[0].faceColor}}>
                             {someusers[0].smallName}
                          </Avatar>
                      }
                      {
                        someusers.length===2&&
                        <div>
                          <Avatar 
                            className="Avatar" 
                            style={{background:someusers[0].faceColor}}>{someusers[0].smallName}
                          </Avatar>
                          <Avatar 
                            className="Avatar" 
                            style={{right:'10px',background:someusers[1].faceColor}}>
                            {someusers[1].smallName}
                          </Avatar>
                        </div>}
                      {
                        someusers.length>2&&
                        <div>
                          <Avatar 
                            className="Avatar" 
                            style={{background:someusers[0].faceColor}}>
                            {someusers[0].smallName}
                          </Avatar>
                          <Avatar className="Avatar moreUserAvatar">
                            +{someusers.length-1}
                          </Avatar>
                        </div>
                      }
                    </div>
                    <PlusCircleFilled className="PlusCircleFilled"/>
                  </div>
              }    
              {
                  someusers.length<1&&
                  <div className="userAvatar">
                      <Button className="userIcon"
                          shape="circle"
                          icon={<UserOutlined/>}
                      />
                      <PlusCircleFilled className="PlusCircleFilled"/>
                  </div>
                  
              }
           </Popover>;
           <CloseCircleFilled 
              className="CloseCircleFilled" 
              onClick={memoveAllUsers} 
              style={this.state.removeBar}  
              onMouseEnter={showRemoveUserBar} 
              onMouseLeave={hideRemoveUserBar}
           />
        </Cell>
      );
    }
  }

  export {PeopleCell};