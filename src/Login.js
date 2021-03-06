import React, {PureComponent, createRef} from 'react';
import {Input, Button, Spin, message} from 'antd';
import {Auth} from 'aws-amplify';
import ErrorMsg from './ErrorMsg';
import './Login.less';

import {withRouter, Link} from 'react-router-dom';
import TooltipMsg from './TooltipMsg';

const defaultColor = '#009AFF';
const errorColor = '#f5222d';

@withRouter
class Login extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      userNameBorderColor: defaultColor,
      passwordBorderColor: defaultColor,
      userNameErrorMsg: '',
      passwordErrorMsg: '',
      defaultUserName: this.getUserName(props),
    };

    this.userNameRef = createRef();
    this.passwordRef = createRef();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      defaultUserName: this.getUserName(nextProps),
    });
  }

  componentDidMount() {
    window.addEventListener('keyup', this.loginAppByKey);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.loginAppByKey);
  }

  getUserName = (props) => {
    if (props.location && props.location.state && Object.keys(props.location.state).indexOf('userName') !== -1) {
      return props.location.state.userName;
    }
    return '';
  };

  loginApp = async () => {
    this.setState({
      isLoading: true,
    });
    let userName = this.userNameRef.current.input.value;
    let password = this.passwordRef.current.input.value;
    if (!userName && password) {
      this.setState({
        isLoading: false,
        userNameBorderColor: errorColor,
        userNameErrorMsg: ErrorMsg.userName_is_empty,
      });
    } else if (userName && !password) {
      this.setState({
        isLoading: false,
        passwordBorderColor: errorColor,
        passwordErrorMsg: ErrorMsg.password_is_empty,
      });
    } else if (!userName && !password) {
      this.setState({
        isLoading: false,
        userNameBorderColor: errorColor,
        passwordBorderColor: errorColor,
        userNameErrorMsg: ErrorMsg.userName_is_empty,
        passwordErrorMsg: ErrorMsg.password_is_empty,
      });
    } else {
      try {
        const user = await Auth.signIn(userName, password);
        localStorage.setItem('CurrentUserId', user.attributes.sub);
        this.props.history.push('/board');
      } catch (error) {
        if (error.code === 'UserNotFoundException') {
          this.setState({
            isLoading: false,
            userNameBorderColor: errorColor,
            userNameErrorMsg: ErrorMsg.user_not_exist,
          });
        } else if (error.code === 'NotAuthorizedException') {
          this.setState({
            isLoading: false,
            passwordBorderColor: errorColor,
            passwordErrorMsg: ErrorMsg.password_error,
          });
        } else if (error.code === 'UserNotConfirmedException') {
          message.warning(ErrorMsg.user_not_validate);
          await Auth.resendSignUp(userName);
          this.props.history.push({
            pathname: '/register/validate',
            state: {userName},
          });
        } else {
          console.log(error);
          this.setState({
            isLoading: false,
          });
        }
      }
    }
  };

  loginAppByKey = (e) => {
    if (e.key === 'Enter') {
      this.loginApp();
    }
  };

  handleUserNameChange = () => {
    if (this.state.userNameBorderColor === errorColor) {
      this.setState({
        userNameBorderColor: defaultColor,
        userNameErrorMsg: '',
      });
    }
  };

  handlePasswordChange = () => {
    if (this.state.passwordBorderColor === errorColor) {
      this.setState({
        passwordBorderColor: defaultColor,
        passwordErrorMsg: '',
      });
    }
  };

  render() {
    const {
      isLoading,
      defaultUserName,
      userNameBorderColor,
      passwordBorderColor,
      userNameErrorMsg,
      passwordErrorMsg,
    } = this.state;
    return (
      <div className="login_layout">
        <Spin spinning={isLoading}>
          <div className="login_header_component">
            <span className="login_header_title">{TooltipMsg.welcome_to_use_app}</span>
            <img  className="login_header_small" src="../logo.png" />
            <span className="login_header_last">{TooltipMsg.welcome_to_use_app_last}</span>
          </div>
          <div className="login_body_component">
            <div className="login_item">
              <span className="login_label">{TooltipMsg.username_label}</span>
              <Input
                ref={this.userNameRef}
                style={{borderColor: userNameBorderColor}}
                placeholder={TooltipMsg.username_placeholder}
                onChange={this.handleUserNameChange}
                defaultValue={defaultUserName}
              />
            </div>
            <div className="login_error_item">
              <span className="login_error_message">{userNameErrorMsg}</span>
            </div>
            <div className="login_item">
              <span className="login_label">{TooltipMsg.password_label}</span>
              <Input.Password
                ref={this.passwordRef}
                style={{borderColor: passwordBorderColor}}
                placeholder={TooltipMsg.password_placeholder}
                onChange={this.handlePasswordChange}
              />
            </div>
            <div className="login_error_item">
              <span className="login_error_message">{passwordErrorMsg}</span>
            </div>
            <br />
            <div className="login_item">
              <Button className="login_btn" type="primary" onClick={this.loginApp}>
                {TooltipMsg.login_btn}
              </Button>
            </div>
            <br />
            <div className="login_register_item">
              <div className="login_link_left">
                <Link to="/register">{TooltipMsg.link_register}</Link>
              </div>
              <div className="login_link_right">
                <Link to="/forget">{TooltipMsg.link_forget_password}</Link>
              </div>
            </div>
          </div>
        </Spin>
      </div>
    );
  }
}

export default Login;
