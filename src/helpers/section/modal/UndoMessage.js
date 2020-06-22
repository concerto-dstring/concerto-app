import React, {PureComponent} from 'react';
import {Button} from 'antd';
import {CloseOutlined} from '@ant-design/icons';
import '../../../maintable/css/style/MoveToSectionMenu.less';
import {VISIBILITY, COLOR, DISPLAY} from '../header/StyleValues';

import {connect} from 'react-redux';
import {dealRowMoveModal, dealRowUndoDeleteMessage} from '../../../maintable/actions/rowActions';
import {dealSectionUndoDeleteMessage} from '../../../maintable/actions/SectionActions';
import {mapRowActionStateToProps} from '../../../maintable/data/mapStateToProps';
import TooltipMsg from '../../../TooltipMsg';
import {UndoType} from '../../../maintable/data/MainTableType';

let intervalTimer;

@connect(mapRowActionStateToProps, {dealRowMoveModal, dealSectionUndoDeleteMessage, dealRowUndoDeleteMessage})
class UndoMessage extends PureComponent {
  constructor() {
    super();

    this.state = {
      countdown: 10,
      isShowUndoModal: false,
    };
  }

  handleCancelClick = () => {
    clearInterval(intervalTimer);
    const {undoType} = this.props;

    if (undoType === UndoType.SECTION_UNDO_DELETE) {
      this.props.dealSectionUndoDeleteMessage({
        isShowUndoModal: false,
      });
    } else if (undoType === UndoType.ROW_UNDO_MOVE) {
      this.props.dealRowMoveModal({
        isShowUndoModal: false,
      });
    } else if (undoType === UndoType.ROW_UNDO_DELETE) {
      this.props.dealRowUndoDeleteMessage({
        isShowUndoModal: false,
      });
    }
  };

  componentWillUnmount() {
    this.clearComponent();
  }

  clearComponent = () => {
    // 清除异步操作
    this.setState = (state, callback) => {
      return;
    };

    // 清除定时
    clearInterval(intervalTimer);
  };

  // 撤销相关操作
  cancelAction = () => {
    const {
      tableData,
      sourceGroupKey,
      targetGroupKey,
      rowKey,
      oldSourceRow,
      undoType,
      group,
      groupIndex,
      groupKey,
      groupRowIndex,
      rowData,
    } = this.props;

    if (undoType === UndoType.SECTION_UNDO_DELETE) {
      // 撤销删除分区
      tableData.undoRemoveGroup(groupIndex, group);
    } else if (undoType === UndoType.ROW_UNDO_MOVE) {
      // 撤销移动行
      tableData.moveRow(targetGroupKey, sourceGroupKey, rowKey, oldSourceRow);
    } else if (undoType === UndoType.ROW_UNDO_DELETE) {
      // 撤销删除行
      tableData.undoRemoveRow(groupKey, rowKey, groupRowIndex, rowData);
    }

    this.handleCancelClick();
  };

  getSuccessMsg = () => {
    const {undoType} = this.props;

    if (undoType === UndoType.SECTION_UNDO_DELETE) {
      return TooltipMsg.delete_success;
    } else if (undoType === UndoType.ROW_UNDO_MOVE) {
      return TooltipMsg.move_success;
    } else if (undoType === UndoType.ROW_UNDO_DELETE) {
      return TooltipMsg.delete_success;
    }
  };

  componentWillReceiveProps(props) {
    const {isShowUndoModal} = props;
    if (isShowUndoModal) {
      this.setState({
        countdown: 10,
      });
    }
    this.setState({
      isShowUndoModal: isShowUndoModal,
    });
  }

  render() {
    // 更新时若isShowUndoModal为true则倒计时
    if (this.state.isShowUndoModal) {
      let countdown = this.state.countdown;
      clearInterval(intervalTimer);
      intervalTimer = setInterval(() => {
        if (countdown > 0) {
          countdown -= 1;
          this.setState({
            countdown: countdown,
          });
        } else {
          // 自动关闭组件
          this.handleCancelClick();
        }
      }, 1000);
    }

    return (
      <div className="undo_message" style={{display: this.state.isShowUndoModal ? DISPLAY.BLOCK : DISPLAY.NONE}}>
        <div className="undo_message_content">
          <span style={{margin: '10px 0px'}}>&emsp;&emsp;{this.getSuccessMsg()}</span>
          <Button
            shape="round"
            type="primary"
            style={{margin: '10px 10px 10px 110px', width: 92, backgroundColor: COLOR.UNDO, borderColor: COLOR.WHITE}}
            onClick={this.cancelAction}
          >
            <span>{TooltipMsg.undo_text}&emsp;</span>
            <span style={{width: 12}}>{this.state.countdown}</span>
          </Button>
          <Button
            icon={<CloseOutlined />}
            type="link"
            style={{margin: '10px 10px 10px 16px'}}
            onClick={this.handleCancelClick}
          />
        </div>
      </div>
    );
  }
}

export default UndoMessage;
