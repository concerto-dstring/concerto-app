import React from 'react'
import 'antd/dist/antd.css'
import {Avatar, Button, Input, Popover, Tag, Divider} from 'antd'
import {
  CloseCircleFilled,
  UserOutlined,
  PlusCircleFilled,
} from '@ant-design/icons'
import 'moment/locale/zh-cn'
import {Cell} from '../../../maintable/FixedDataTableRoot'
import './PeopleCell.less'
import FixedDataTableTranslateDOMPosition from '../../../maintable/FixedDataTableTranslateDOMPosition';
import { getNodeText } from '@testing-library/react'

class PeopleCell extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      allPeoples: props.data.getTeamUsers(),
      selectedUsers:
        props.value && props.value != '' ? props.value : [],
      removeBar: {
        display: 'none',
      },
    }
  }

  componentWillReceiveProps(nextProps) {
    const value = nextProps.value != '' ? nextProps.value : []
    this.setState({
      selectedUsers: value,
      allPeoples: nextProps.data.getTeamUsers(),
      left: nextProps.left,
      top: nextProps.top
    })
  }
  showUserPanel = () => {
    this.setState({
      visible: true,
    });
  }

  filterPeople(value) {
    this.setState({
      allPeoples: this.props.data.filterTeamUsers(value)
    })
  }

  render() {
    const someusers = this.state.selectedUsers || []

    if (someusers instanceof Array === false) return null

    const {Search} = Input
    const {
      data,
      rowIndex,
      columnKey,
      collapsedRows,
      callback,
      value,
      handleChange,
      handleKey,
      ...props
    } = this.props

    const dismiss = (e) => {
      handleChange(this.state.selectedUsers, false);
    }

    const allPeoples = this.state.allPeoples || [];
    const defaultAllPeoples = () => {
      for (let i = 0, len = someusers.length; i < len; i++) {
        const user = someusers[i]
        for (let j = 0; j < allPeoples.length; j++) {
          if (user.username === allPeoples[j].username) {
            allPeoples.splice(j, 1)
            this.setState({
              allPeoples: allPeoples,
            })
            break
          }
        }
      }
    }
    const returnValue = (e) => {
      let isHas = false;
      for (let i = 0, len = someusers.length; i < len; i++) {
        if (e.username === someusers[i].username) {
          isHas = true
          break
        }
      }
      if (!isHas) {
        someusers.push(e)
        for (let j = 0; j < allPeoples.length; j++) {
          if (e.username === allPeoples[j].username) {
            allPeoples.splice(j, 1)
            this.setState({
              allPeoples: allPeoples,
            })
          }
        }
      }
      this.setState({
        visible: false,
        selectedUsers: someusers,
      })
      handleChange(someusers, true)
    }
    const removeUser = (user) => {
      const someusers = this.state.selectedUsers
      const allPeoples = this.state.allPeoples
      for (let j = 0, len2 = someusers.length; j < len2; j++) {
        if (user.username === someusers[j].username) {
          someusers.splice(j, 1)
          allPeoples.push(user)
          break
        }
      }
      this.setState({
        selectedUsers: someusers,
        allPeoples: allPeoples,
      })
      handleChange(someusers, true)
    }
    const memoveAllUsers = (e) => {
      this.setState({
        selectedUsers: [],
      })
      handleChange(new Array(), true)
    }
    const showRemoveUserBar = () => {
      const display = this.state.selectedUsers.length < 1 ? 'none' : 'block'
      this.setState({
        removeBar: {
          display: display,
        },
      })
    }
    const hideRemoveUserBar = () => {
      this.setState({
        removeBar: {
          display: 'none',
        },
      })
    }
    defaultAllPeoples();


    return (
      <Cell {...props} className="PeopleCell" >
        <Popover
          placement="bottom"
          trigger="click"
          autoAdjustOverflow={false}
          onVisibleChange={dismiss} 
          getPopupContainer={()=>this.props.container}
          // visible={this.state.visible}
          onClick={this.showUserPanel}
          content={
            <div style={{pointerEvents: 'visible'}}>
              <Divider className="dividerStyle">People</Divider>
              <div>
                {this.state.allPeoples.map((v, i) => (
                  <div
                    key={i}
                    className="user"
                    onClick={returnValue.bind(this, v)}
                  >
                    <div className="faceAvatar">
                      &nbsp;
                      <Avatar size={25} style={{background: v.faceColor}}>
                        {v.fname}
                      </Avatar>
                      &nbsp;
                      {v.lname + v.fname}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          }
          title={
            <div style={{pointerEvents: 'visible'}}>
              <div style={{paddingBottom: '10px'}}>
                {someusers.map((v, i) => (
                  <Tag
                    key={i}
                    closable
                    className="userTag"
                    onClose={removeUser.bind(this, v)}
                  >
                    <Avatar size={22} style={{background: v.faceColor}}>
                      {v.fname}
                    </Avatar>
                    &nbsp;{v.lname + v.fname}
                  </Tag>
                ))}
              </div>
              <Search
                placeholder="Enter name"
                bordered="false"
                onSearch={this.filterPeople.bind(this)}
                className="searchInput"
              />
            </div>
          }
        >
          {someusers.length > 0 && (
            <div
              onMouseEnter={showRemoveUserBar}
              onMouseLeave={hideRemoveUserBar}
            >
              <div className="userAvatar">
                {someusers.length === 1 && (
                  <Avatar
                    className="Avatar"
                    style={{background: someusers[0].faceColor}}
                  >
                    {someusers[0].fname}
                  </Avatar>
                )}
                {someusers.length === 2 && (
                  <div>
                    <Avatar
                      className="Avatar"
                      style={{background: someusers[0].faceColor}}
                    >
                      {someusers[0].fname}
                    </Avatar>
                    <Avatar
                      className="Avatar"
                      style={{
                        right: '10px',
                        background: someusers[1].faceColor,
                      }}
                    >
                      {someusers[1].fname}
                    </Avatar>
                  </div>
                )}
                {someusers.length > 2 && (
                  <div>
                    <Avatar
                      className="Avatar"
                      style={{background: someusers[0].faceColor}}
                    >
                      {someusers[0].fname}
                    </Avatar>
                    <Avatar className="Avatar moreUserAvatar">
                      +{someusers.length - 1}
                    </Avatar>
                  </div>
                )}
              </div>
              <PlusCircleFilled className="PlusCircleFilled" />
            </div>
          )}
          {someusers.length < 1 && (
            <div className="userAvatar">
              <Button
                className="userIcon"
                shape="circle"
                icon={<UserOutlined />}
              />
              <PlusCircleFilled className="PlusCircleFilled" />
            </div>
          )}
        </Popover>
        ;
        <CloseCircleFilled
          className="CloseCircleFilled"
          onClick={memoveAllUsers}
          style={this.state.removeBar}
          onMouseEnter={showRemoveUserBar}
          onMouseLeave={hideRemoveUserBar}
        />
      </Cell>
    )
  }
}

export {PeopleCell}
