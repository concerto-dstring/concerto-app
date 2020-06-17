import React, {createRef} from 'react';
import 'antd/dist/antd.css';
import {Avatar, Button, Input, Popover, Tag, Divider} from 'antd';
import {CloseCircleFilled, UserOutlined, PlusCircleFilled} from '@ant-design/icons';
import 'moment/locale/zh-cn';
import {Cell} from '../../../maintable/FixedDataTableRoot';
import './PeopleCell.less';

class PeopleCell extends React.PureComponent {
  constructor(props) {
    super(props);
    let userData = this.getUserList(props);
    this.state = {
      visible: false,
      userList: userData.userList,
      filterUserList: null,
      selectedUsers: userData.selectedUsers,
      removeBar: {
        display: 'none',
      },
    };

    this.searchInputRef = createRef();
  }

  getUserList(props) {
    let userList = props.data.getTeamUsers();
    let selectedUsers = props.value && props.value != '' ? props.value : [];

    for (let i = 0; i < selectedUsers.length; i++) {
      const selectedUser = selectedUsers[i];
      let userIndex = userList.findIndex((user) => user.id === selectedUser.id);
      if (userIndex >= 0) {
        userList.splice(userIndex, 1);
      }
    }

    return {
      userList,
      selectedUsers,
    };
  }

  showUserPanel = () => {
    this.setState({
      visible: true,
    });
  };

  filterPeople = () => {
    let value = this.searchInputRef.current.input.input.value;
    if (value) {
      const {userList} = this.state;
      let valueLow = value.toLowerCase();
      let filterUserList = userList
        .slice()
        .filter(
          (user) =>
            (!user.lname && !user.fname ? user.username : user.lname + user.fname).toLowerCase().indexOf(valueLow) !==
            -1
        );
      this.setState({
        filterUserList,
      });
    } else {
      this.setState({
        filterUserList: null,
      });
    }
  };

  /**
   * 选择用户
   * @param {*} selectUser
   */
  handleUserClick = (selectUser) => {
    let selectedUsers = this.state.selectedUsers.slice();
    selectedUsers.push(selectUser);
    let userList = this.state.userList.slice();
    let userIndex = userList.findIndex((user) => user.id === selectUser.id);
    userList.splice(userIndex, 1);

    if (this.state.filterUserList) {
      let filterUserList = this.state.filterUserList.slice();
      let filterUserIndex = filterUserList.findIndex((user) => user.id === selectUser.id);
      filterUserList.splice(filterUserIndex, 1);

      this.setState({
        selectedUsers,
        userList,
        filterUserList,
      });
    } else {
      this.setState({
        selectedUsers,
        userList,
      });
    }
  };

  /**
   * 移除用户
   * @param {*} e
   * @param {*} user
   */
  handleUserRemove = (removeUser) => {
    let selectedUsers = this.state.selectedUsers.slice();
    let userIndex = selectedUsers.findIndex((user) => user.id === removeUser.id);
    selectedUsers.splice(userIndex, 1);
    let userList = this.state.userList.slice();
    userList.push(removeUser);
    this.setState({
      selectedUsers,
      userList,
    });
  };

  /**
   * 清空用户
   */
  handleUserClear = () => {
    // 直接调用props的handleChange存储数据
    this.props.handleChange([], true);
    this.setState({
      userList: this.props.data.getTeamUsers(),
      selectedUsers: [],
    });
  };

  /**
   * 滚动和最外层的滚动有冲突
   * @param {*} e
   */
  handleWheel = (e) => {
    console.log('wheel');
  };

  handleChangeVisible = (visible) => {
    // 消失时保存数据
    if (!visible) {
      this.props.handleChange(this.state.selectedUsers, true);
    }
    else {
      this.props.handleCellEdit('PEOPLE')
    }
  };

  render() {
    const {selectedUsers, userList, filterUserList} = this.state;
    const {Search} = Input;
    const {data, rowIndex, columnKey, collapsedRows, callback, value, handleChange, handleKey, ...props} = this.props;

    let users = filterUserList ? filterUserList : userList;
 
    const showRemoveUserBar = () => {
      const display = this.state.selectedUsers.length < 1 ? 'none' : 'block';
      this.setState({
        removeBar: {
          display: display,
        },
      });
    };
    const hideRemoveUserBar = () => {
      this.setState({
        removeBar: {
          display: 'none',
        },
      });
    };

    return (
      <Cell {...props} className="PeopleCell">
        <Popover
          placement="bottom"
          trigger="click"
          autoAdjustOverflow={false}
          onVisibleChange={this.handleChangeVisible}
          getPopupContainer={() => this.props.container}
          content={
            <div style={{pointerEvents: 'visible'}}>
              <Divider className="dividerStyle">People</Divider>
              <div style={{height: 200, overflowY: 'auto'}} onWheel={this.handleWheel}>
                {users.map((v, i) => (
                  <div key={i} className="user" onClick={this.handleUserClick.bind(this, v)}>
                    <div className="faceAvatar">
                      &nbsp;
                      <Avatar size={25} style={{background: v.faceColor}}>
                        {v.fname}
                      </Avatar>
                      &nbsp;
                      {!v.lname && !v.fname ? v.username : v.lname + v.fname}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          }
          title={
            <div style={{pointerEvents: 'visible'}}>
              <div style={{paddingBottom: '10px'}}>
                {selectedUsers.map((v, i) => (
                  <Tag key={i} closable className="userTag" onClose={this.handleUserRemove.bind(this, v)}>
                    <Avatar size={22} style={{background: v.faceColor}}>
                      {v.fname}
                    </Avatar>
                    &nbsp;{!v.lname && !v.fname ? v.username : v.lname + v.fname}
                  </Tag>
                ))}
              </div>
              <Search
                ref={this.searchInputRef}
                placeholder="Enter name"
                bordered="false"
                onChange={this.filterPeople}
                className="searchInput"
              />
            </div>
          }
        >
          {selectedUsers.length > 0 && (
            <div onMouseEnter={showRemoveUserBar} onMouseLeave={hideRemoveUserBar}>
              <div className="userAvatar">
                {selectedUsers.length === 1 && (
                  <Avatar className="Avatar" style={{background: selectedUsers[0].faceColor}}>
                    {selectedUsers[0].fname}
                  </Avatar>
                )}
                {selectedUsers.length === 2 && (
                  <div>
                    <Avatar className="Avatar" style={{background: selectedUsers[0].faceColor}}>
                      {selectedUsers[0].fname}
                    </Avatar>
                    <Avatar
                      size={25}
                      className="Avatar"
                      style={{
                        right: '10px',
                        background: selectedUsers[1].faceColor,
                      }}
                    >
                      {selectedUsers[1].fname}
                    </Avatar>
                  </div>
                )}
                {selectedUsers.length > 2 && (
                  <div>
                    <Avatar className="Avatar" style={{background: selectedUsers[0].faceColor}}>
                      {selectedUsers[0].fname}
                    </Avatar>
                    <Avatar className="Avatar moreUserAvatar">+{selectedUsers.length - 1}</Avatar>
                  </div>
                )}
              </div>
              <PlusCircleFilled className="PlusCircleFilled" />
            </div>
          )}
          {selectedUsers.length < 1 && (
            <div className="userAvatar">
              <Button
                className="userIcon"
                shape="circle"
                size="small"
                icon={<UserOutlined/>}
              />
              <PlusCircleFilled className="PlusCircleFilled" />
            </div>
          )}
        </Popover>
        <CloseCircleFilled
          className="CloseCircleFilled"
          onClick={this.handleUserClear}
          style={this.state.removeBar}
          onMouseEnter={showRemoveUserBar}
          onMouseLeave={hideRemoveUserBar}
        />
      </Cell>
    );
  }
}

export {PeopleCell};
