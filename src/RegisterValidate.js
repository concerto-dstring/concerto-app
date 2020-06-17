import React, {Component, createRef} from 'react';
import './RegisterValidate.less';
import {Input, Button, Spin, message} from 'antd';
import {Auth} from 'aws-amplify';
import ErrorMsg from './ErrorMsg';

import {withRouter} from 'react-router-dom';

const defaultColor = '#1890ff';
const errorColor = '#f5222d';

@withRouter
class RegisterValidate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      validateCodeBorderColor: defaultColor,
      validateCodeErrorMsg: '',
      userName: this.getUserName(props),
    };

    this.validateCodeRef = createRef();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      userName: this.getUserName(nextProps),
    });
  }

  componentDidMount() {
    if (!this.getUserName(this.props)) {
      this.props.history.push('/login');
    } else {
      window.addEventListener('keyup', this.completeRegisterByKey);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.completeRegisterByKey);
  }

  completeRegisterByKey = (e) => {
    if (e.key === 'Enter') {
      this.completeRegister();
    }
  };

  getUserName = (props) => {
    if (props.location && props.location.state && Object.keys(props.location.state).indexOf('userName') !== -1) {
      return props.location.state.userName;
    }
    return '';
  };

  reSendValidateCode = async () => {
    try {
      await Auth.resendSignUp(this.state.userName);
      message.info(ErrorMsg.validate_code_resend)
    } catch (err) {
      console.log('error resending code: ', err);
    }
  };

  completeRegister = async () => {
    this.setState({
      isLoading: true,
    });

    let code = this.validateCodeRef.current.input.value;
    if (code) {
      try {
        await Auth.confirmSignUp(this.state.userName, code);
        this.props.history.push({
          pathname: '/login',
          state: {
            userName: this.state.userName,
          },
        });
      } catch (error) {
        this.setState({
          isLoading: false,
          validateCodeBorderColor: errorColor,
          validateCodeErrorMsg: ErrorMsg.validate_code_error,
        });
      }
    } else {
      this.setState({
        isLoading: false,
        validateCodeBorderColor: errorColor,
        validateCodeErrorMsg: ErrorMsg.validate_code_is_empty,
      });
    }
  };

  render() {
    const {isLoading, validateCodeBorderColor, validateCodeErrorMsg, userName} = this.state;

    return (
      <div className="validate_layout">
        <Spin spinning={isLoading}>
          <div className="validate_header_component">
            <span className="validate_header">欢迎注册 Pynbo 拼板</span>
          </div>
          <div className="validate_body_component">
            <div className="validate_item">
              <span className="validate_label">用户名：</span>
              <Input value={userName} disabled={true} />
            </div>
            <br />
            <div className="validate_item">
              <span className="validate_label">验证码：</span>
              <Input
                ref={this.validateCodeRef}
                style={{borderColor: validateCodeBorderColor}}
                placeholder="请输入邮件中的验证码"
                onChange={this.handlevalidateCodeChange}
              />
            </div>
            <div className="validate_error_item">
              <span className="validate_error_message">{validateCodeErrorMsg}</span>
            </div>
            <br />
            <div className="validate_register_item">
              <div className="validate_link_left">
                <Button onClick={this.reSendValidateCode}>重新发送验证码</Button>
              </div>
              <div className="validate_link_right">
                <Button type="primary" onClick={this.completeRegister}>
                  完成注册
                </Button>
              </div>
            </div>
          </div>
        </Spin>
      </div>
    );
  }
}

export default RegisterValidate;
