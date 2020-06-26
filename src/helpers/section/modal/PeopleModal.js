import React, {PureComponent, createRef} from 'react';
import {Popover, Divider, Input, Avatar} from 'antd';

class PeopleModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      people: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      people: nextProps.data ? nextProps.data.getTeamUsers() : [],
    });
  }

  handleVisibleChange = (visible) => {
    this.props.handlePeopleModalVisible(visible);
  };

  filterPeople = (e) => {
    let value = e.target.value;
    if (value) {
      let valueLow = value.trim().toLowerCase()
      let filterUsers = this.props.data
        .getTeamUsers()
        .filter(
          (user) => user.username.toLowerCase().indexOf(valueLow) !== -1
        );
      this.setState({
        people: filterUsers,
      });
    } else {
      this.setState({
        people: this.props.data.getTeamUsers(),
      });
    }
  };

  handleClickPeople = (user) => {
    // 关闭人员选择窗
    this.handleVisibleChange(false);

    // 编辑器赋值
    this.props.insertPeople(user.username, user.id);
  };

  render() {
    return (
      <div className="people_modal">
        <Popover
          placement={this.props.placement ? this.props.placement : 'bottom'}
          trigger={[]}
          autoAdjustOverflow={false}
          visible={this.props.visible}
          onVisibleChange={this.handleVisibleChange}
          overlayStyle={{width: 240, height: 300}}
          getPopupContainer={() => this.props.container}
          content={
            <div>
              <Divider className="dividerStyle">People</Divider>
              <div className="user_scroll" style={this.state.people.length === 5 ? {overflowY: 'hidden'} : {}}>
                {this.state.people.map((v, i) => (
                  <div key={i} className="user" onClick={this.handleClickPeople.bind(this, v)}>
                    <div className="faceAvatar">
                      &nbsp;
                      <Avatar size={25} style={{background: v.faceColor}}>
                        {v.displayname}
                      </Avatar>
                      &nbsp;
                      {v.username}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          }
          title={
            <div>
              <Input.Search placeholder="输入名称" onChange={this.filterPeople} />
            </div>
          }
        >
          {this.props.children}
        </Popover>
      </div>
    );
  }
}

export default PeopleModal;
