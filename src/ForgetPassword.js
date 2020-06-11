import React, { Component, createRef } from 'react'
import './ForgetPassword.less'
import { Input, Button, Spin, message } from 'antd'
import { Auth } from 'aws-amplify'
import ErrorMsg from './ErrorMsg'

import { withRouter } from 'react-router-dom'
import { checkStrWithPassword } from './CheckFunction'

const defaultColor = '#1890ff'
const errorColor = '#f5222d'

@withRouter
class ForgetPassword extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      userNameCodeBorderColor: defaultColor,
      userNameCodeErrorMsg: '',
      passwordBorderColor: defaultColor,
      passwordErrorMsg: '',
      password: null,
      confirmPasswordBorderColor: defaultColor,
      confirmPasswordErrorMsg: '',
      confirmPassword: null,
      validateCodeBorderColor: defaultColor,
      validateCodeErrorMsg: '',
      isNext: false
    }

    this.userNameRef = createRef()
    this.validateCodeRef = createRef()
  }

  componentDidMount() {
    window.addEventListener('keyup', this.handleKeyUp);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleKeyUp);
  }

  handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      if (this.state.isNext) {
        this.confirmUpdatePassword()
      }
      else {
        this.goToNextStep()
      }
    }
  }

  goToNextStep = () => {
    this.setState({
      isLoading: true
    })
    let userName = this.userNameRef.current.input.value

    if (!userName) {
      this.setState({
        isLoading: false,
        userNameCodeBorderColor: errorColor,
        userNameCodeErrorMsg: ErrorMsg.userName_is_empty
      })
    }
    else {
      this.sendValidateCode(userName)
    }
  }

  handleUserNameChange = () => {
    if (this.state.userNameCodeBorderColor === errorColor) {
      this.setState({
        userNameCodeBorderColor: defaultColor,
        userNameCodeErrorMsg: '',
      })
    }
  }

  handlePasswordChange = (e) => {
    let password = e.target.value
    if (checkStrWithPassword(password)) {
      this.setState({
        passwordBorderColor: defaultColor,
        passwordErrorMsg: '',
        password
      })
    }
    else {
      this.setState({
        passwordBorderColor: errorColor,
        passwordErrorMsg: ErrorMsg.password_rule,
        password
      })
    }
  }

  handleConfirmPasswordChange = (e) => {
    let confirmPassword = e.target.value
    if (confirmPassword === this.state.password) {
      this.setState({
        confirmPasswordBorderColor: defaultColor,
        confirmPasswordErrorMsg: '',
        confirmPassword
      })
    }
    else {
      this.setState({
        confirmPasswordBorderColor: errorColor,
        confirmPasswordErrorMsg: ErrorMsg.confirm_password_error,
        confirmPassword
      })
    }
  }

  sendValidateCode = (userName) => {
    Auth.forgotPassword(userName)
      .then(data => {
          this.setState({
            isLoading: false,
            isNext: true
          }, () => {
            message.info('验证码已发送')
          })
        }
      )
      .catch(error => {
          this.setState({
            isLoading: false,
            userNameCodeBorderColor: errorColor,
            userNameCodeErrorMsg: ErrorMsg.user_not_exist
          })
        }
      )
  }

  reSendValidateCode = () => {
    this.setState({
      isLoading: true
    })
    let userName = this.userNameRef.current.input.value
    this.sendValidateCode(userName)
  }

  confirmUpdatePassword = () => {
    let userName = this.userNameRef.current.input.value
    let code = this.validateCodeRef.current.input.value
    const { password, confirmPassword } = this.state

    if (!password || !confirmPassword || !code) {
      if (!password) {
        this.setState({
          passwordBorderColor: errorColor,
          passwordErrorMsg: ErrorMsg.password_is_empty
        })
      }

      if (!confirmPassword) {
        this.setState({
          confirmPasswordBorderColor: errorColor,
          confirmPasswordErrorMsg: ErrorMsg.confirm_password_is_empty
        })
      }

      if (!code) {
        this.setState({
          validateCodeBorderColor: errorColor,
          validateCodeErrorMsg: ErrorMsg.validate_code_is_empty
        })
      }
    }
    else {
      this.setState({
        isLoading: true
      })
      Auth.forgotPasswordSubmit(userName, code, password)
      .then(data => {
        this.props.history.push({
          pathname: '/login',
          state: {
            userName
          }
        })
      })
      .catch(err => {
        this.setState({
          isLoading: false,
          validateCodeBorderColor: errorColor,
          validateCodeErrorMsg: ErrorMsg.validate_code_error
        })
      })
    }
  }

  render() {
    const { isLoading, isNext,
      userNameCodeBorderColor, userNameCodeErrorMsg,
      passwordBorderColor, passwordErrorMsg,
      confirmPasswordBorderColor, confirmPasswordErrorMsg,
      validateCodeBorderColor, validateCodeErrorMsg } = this.state

    return (
      <div className="forget_layout" style={{height: isNext ? 500 : 300}}>
        <Spin spinning={isLoading}>
          <div className="forget_header_component">
            <span className="forget_header">欢迎使用 Pynbo 拼板</span>
          </div>
          <div className="forget_body_component">
            <div className="forget_item">
              <span className="forget_label">用户名：</span>
              <Input
                ref={this.userNameRef}
                style={{borderColor: userNameCodeBorderColor}}
                onChange={this.handleUserNameChange}
                disabled={isNext}
                placeholder='请输入用户名'
              />
            </div>
            {
              isNext
              ?
              <>
                <br />
                <div className="forget_item">
                  <span className="forget_label"><span className="forget_required">*</span> 新密码：</span>
                  <Input.Password
                    style={{borderColor: passwordBorderColor}}
                    onChange={this.handlePasswordChange}
                    placeholder='请输入新密码'
                  />
                </div>
                <div className="forget_error_item">
                  <span className="forget_error_message">{passwordErrorMsg}</span>
                </div>
                <div className="forget_item">
                  <span className="forget_label"><span className="forget_required">*</span> 确认新密码：</span>
                  <Input.Password 
                    style={{borderColor: confirmPasswordBorderColor}} 
                    placeholder='请确认新密码'
                    onChange={this.handleConfirmPasswordChange}
                  />
                </div>
                <div className="forget_error_item">
                  <span className="forget_error_message">{confirmPasswordErrorMsg}</span>
                </div>
                <div className="forget_item">
                  <span className="forget_label">验证码：</span>
                  <Input
                    ref={this.validateCodeRef}
                    style={{borderColor: validateCodeBorderColor}}
                    placeholder='请输入发送至邮箱的验证码'
                  />
                </div>
                <div className="forget_error_item">
                  <span className="forget_error_message">{validateCodeErrorMsg}</span>
                </div>
                <br />
                <div className="forget_forget_item">
                  <div className="forget_link_left"><Button onClick={this.reSendValidateCode}>重新发送验证码</Button></div>
                  <div className="forget_link_right"><Button type='primary' onClick={this.confirmUpdatePassword}>确认重置密码</Button></div>
                </div>
              </>
              :
              <>
                <div className="forget_error_item">
                  <span className="forget_error_message">{userNameCodeErrorMsg}</span>
                </div>
                <br />
                <div className="forget_item">
                  <Button 
                    style={{width: 360, borderRadius: 12}} 
                    type='primary'
                    onClick={this.goToNextStep}
                  >
                    下一步
                  </Button>
                </div>
              </>
            }
          </div>
        </Spin>
      </div>
    );
  }
}

export {
  ForgetPassword
}