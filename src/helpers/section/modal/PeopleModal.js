import React, { PureComponent } from 'react';
import { Popover, Divider, Input, Avatar } from 'antd'
import { getPeople } from './PeopleName'

class PeopleModal extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      people: getPeople(),
    }
  }

  handleVisibleChange = (visible) => {
    this.props.handlePeopleModalVisible(visible)
  }

  filterPeople = (e) => {
    this.setState({
      people: getPeople(e.target.value)
    })
  }

  handleClickPeople = (user) => {
    // 关闭人员选择窗
    this.handleVisibleChange(false)

    // 编辑器赋值
    this.props.insertPeople(user.userName)
  }

  render() {
    return (
      <Popover  
        placement="bottom" 
        trigger="click"
        autoAdjustOverflow={false}
        visible={this.props.visible}
        onVisibleChange={this.handleVisibleChange}
        content={
          <div>
            <Divider className="dividerStyle">People</Divider>
            <div>
            {
              this.state.people.map((v, i) => (
                <div key={i} className="user" onClick={this.handleClickPeople.bind(this, v)}>
                    <div className="faceAvatar">
                      &nbsp;
                      <Avatar size={25} 
                        style={{background:v.faceColor}}>
                        {v.smallName}
                      </Avatar>
                      &nbsp;
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
              <Input.Search
                  placeholder="输入名称"
                  onChange={this.filterPeople}
              />
            </div>
        }
      >
        {this.props.children}
      </Popover>
    );
  }
}

export default PeopleModal;