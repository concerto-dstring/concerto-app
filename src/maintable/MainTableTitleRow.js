'use strict';

import PropTypes from 'prop-types';
import React from 'react';
import { Layout, Input, Avatar, Space, Select} from 'antd';
import { Button } from 'semantic-ui-react';
import { getPeople } from '../helpers/section/modal/PeopleName';
import filterIcon from './helper/filterIcon.svg';

import FixedDataTableTranslateDOMPosition from './FixedDataTableTranslateDOMPosition';

import './MainTableTitleRow.less';
import './css/style/Board.less';

import { 
    SearchOutlined,
    ShareAltOutlined,
    DownOutlined,
    EyeInvisibleOutlined,
} from '@ant-design/icons';

/**
 * Component that renders the row for <FixedDataTable />.
 * This component should not be used directly by developer. Instead,
 * only <FixedDataTable /> should use the component internally.
 */


class MainTableTitleRow extends React.Component {

  static propTypes = {

    className: PropTypes.string,

    /**
     * Title of the content
     */
    title: PropTypes.string,

    /**
     * Height of the row.
     */
    height: PropTypes.number.isRequired,

    /**
     * The vertical position where the row should render itself
     */
    offsetTop: PropTypes.number.isRequired,

    /**
     * Height of fixedDataTableCellGroupLayout/cellGroupWrapper.
     */
    cellGroupWrapperHeight: PropTypes.number,

    /**
     * Width of the row.
     */
    width: PropTypes.number.isRequired,

    /**
     * The value of the aria-rowindex attribute.
     */
    ariaRowIndex: PropTypes.number,

    /**
     * The value of the aria-rowindex attribute.
     */
    onFilter: PropTypes.func,

    /**
     * user list
     */
    onGetListUsers: PropTypes.func, 

    /**
     * Whether the grid should be in RTL mode
     */
    isRTL: PropTypes.bool,

    /**
     * DOM attributes to be applied to the row.
     */
    attributes: PropTypes.object,
  };

  componentWillMount() {
    this._initialRender = true;
    this._onAddNewGroup = this._onAddNewGroup.bind(this);
    this._onFilterTableData = this._onFilterTableData.bind(this);
    this._onFilterByPeople = this._onFilterByPeople.bind(this);

    this.setState({newItem:''});
  }

  componentDidMount() {
    this._initialRender = false;
  }

  getBodyContent = () => {
    return (
      <>
          <div className="body_content_title_row">
            <div className="body_content_title">
              <h1>{this.props.title}</h1>
            </div>
            <div className="body_content_title_right">
              <div className="body_content_title_right_item">
                <span className="body_content_title_right_label">
                  最后更新时间:&nbsp;
                </span>
                <span className="body_content_title_right_value">
                  2020-04-22 13:57:45
                </span>
              </div>
              <div className="body_content_title_right_separator" />
              <div className="body_content_title_right_item">
                <span className="body_content_title_right_label">
                  更新人:&nbsp;
                </span>
                <span className="body_content_title_right_value">
                  JGZ
                </span>
              </div>
              <div className="body_content_title_right_separator" />
              <div className="body_content_title_right_item">
                <span className="body_content_title_right_label">
                  成员数:&nbsp;
                </span>
                <span className="body_content_title_right_value">
                  8
                </span>
              </div>
              <div className="body_content_title_right_separator" />
              <div className="body_content_title_right_item">
                <span className="body_content_title_right_label">
                  操作历史:&nbsp;
                </span>
                <span className="body_content_title_right_value">
                  58
                </span>
              </div>
              <div className="body_content_title_right_separator" />
              <div className="body_content_title_right_item body_content_title_right_pointer">
                <span className="body_content_title_right_label">
                  <ShareAltOutlined />&nbsp;&nbsp;分享
                </span>
              </div>
            </div>
          </div>
          <div className="body_content_title_desc">
            相关具体的描述
          </div>
      </>
    )
  }

/**
 * 查询/过滤数据
 */
_onFilterTableData (event) {
    if (this.props.onFilter) {
        this.props.onFilter(event.target.value.trim(), null);
    }
}

/**
 * 根据人员过滤数据 
 */
_onFilterByPeople (value) {
    if (this.props.onFilter) {
        this.props.onFilter(value, 'PEOPLE');
    }
}

_onAddNewGroup() {
    if (this.props.onAddNewGroup) {
        this.props.onAddNewGroup();
    }
}

render() /*object*/ {

    const { offsetTop, zIndex, visible, height} = this.props;

    var style = {
      height: height,
      zIndex: (zIndex ? zIndex : 0),
      display: (visible ? 'block' : 'none'),
    };

    FixedDataTableTranslateDOMPosition(style, 0, offsetTop, this._initialRender, this.props.isRTL);

    return (
        <div style={style}>
            <Layout style={{backgroundColor: '#FFFFFF'}}>
            {
                this.getBodyContent()
            }
             <div className="main_table_add_btn_row">
              <Space size="middle">
                <div id="addGroupBtn">
                  <Button
                    onClick={this._onAddNewGroup}
                    className="main_table_add_btn"
                  >
                    <div className="main_table_btn_layout">
                      <span style={{}}>
                        + 新增一行
                      </span>
                      <div className="main_table_add_btn_separator" />
                      <div>
                        <DownOutlined />
                      </div>
                    </div>
                  </Button>
                </div>
                <div>
                  <Select 
                    className="main_table_select_user"
                    placeholder="按人员分组显示"
                    showSearch
                    allowClear
                    onChange={this._onFilterByPeople}
                  >
                    {
                      this.props.onGetListUsers().map(user => {
                        return (
                          <Select.Option
                            key={user.id} 
                            value={user.username}
                          >
                            <Avatar
                              size={20} 
                              style={{background: user.faceColor}}
                            >
                              {user.fname}
                            </Avatar>
                            &emsp;
                            {
                              user.lname + user.fname
                            }
                          </Select.Option>
                        )
                      })
                    }
                  </Select>
                </div>
                <div>
                  <Button className="main_table_filter_btn">
                    <div className="main_table_btn_layout">
                      <img src={filterIcon} />&nbsp;
                    </div>
                  </Button>
                </div>
                <div>
                  <EyeInvisibleOutlined className="main_table_eye" />
                </div>
              </Space>
              <div className="main_table_search_input">
                <Input
                  prefix={<SearchOutlined />}
                  placeholder="搜索工作板内容"
                  onChange={this._onFilterTableData}
                  style={{borderRadius:'15px', width: 240}}
                />
              </div>
            </div>
            </Layout>           
        </div>
    )
  }
}

export default MainTableTitleRow;