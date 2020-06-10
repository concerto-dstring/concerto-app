import React, { PureComponent, createRef } from 'react'
import { Input, Button, Spin } from 'antd'
import { Auth } from 'aws-amplify'
import ErrorMsg from './ErrorMsg'
import './Register.less'

import { withRouter, Link } from 'react-router-dom'
import { checkStrWithUserName, checkStrWithPassword, checkStrWithEmail, checkStrWithPhone } from './CheckFunction'

const defaultColor = '#1890ff'
const errorColor = '#f5222d'

@withRouter
class Register extends PureComponent {
  constructor() {
    super()

    this.state = {
      isLoading: false,
      userNameBorderColor: defaultColor,
      userNameErrorMsg: '',
      userName: null,
      passwordBorderColor: defaultColor,
      passwordErrorMsg: '',
      password: null,
      confirmPasswordBorderColor: defaultColor,
      confirmPasswordErrorMsg: '',
      confirmPassword: null,
      emailBorderColor: defaultColor,
      emailErrorMsg: '',
      email: null,
      phoneBorderColor: defaultColor,
      phoneErrorMsg: '',
      phone: null
    }
  }

  componentDidMount() {
    window.addEventListener('keyup', this.registerUserByKey);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.registerUserByKey);
  }

  registerUserByKey = (e) => {
    if (e.key === 'Enter') {
      this.registerUser()
    }
  }

  registerUser = async() => {
    const { userName, password, confirmPassword, email, phone } = this.state
    
    if (!userName || !password || !confirmPassword || !email || !phone) {
      if (!userName) {
        this.setState({
          userNameBorderColor: errorColor,
          userNameErrorMsg: ErrorMsg.userName_is_empty
        })
      }

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

      if (!email) {
        this.setState({
          emailBorderColor: errorColor,
          emailErrorMsg: ErrorMsg.email_is_empty
        })
      }

      if (!phone) {
        this.setState({
          phoneBorderColor: errorColor,
          phoneErrorMsg: ErrorMsg.phone_is_empty
        })
      }
    }
    else {
      this.setState({
        isLoading: true
      })
      try {
        const user = await Auth.signUp({
          username: userName,
          password,
          attributes: {
              email,          // optional
              phone_number: '+86' + phone,   // optional - E.164 number convention
              // other custom attributes 
          }
        })
        this.props.history.push({
          pathname: '/register/validate',
          state: { userName }
        })
      } catch (error) {
        if (error.code === 'UsernameExistsException') {
          this.setState({
            isLoading: false,
            userNameBorderColor: errorColor,
            userNameErrorMsg: ErrorMsg.user_exist,
          })
        }
        else if (error.code === 'NotAuthorizedException') {
          this.setState({
            isLoading: false,
            passwordBorderColor: errorColor,
            passwordErrorMsg: ErrorMsg.password_error
          })
        }
        else {
          console.log(error)
          this.setState({
            isLoading: false,
          })
        }
      }
    }
  }

  handleUserNameChange = (e) => {
    let userName = e.target.value
    if (checkStrWithUserName(userName)) {
      this.setState({
        userNameBorderColor: defaultColor,
        userNameErrorMsg: '',
        userName
      })
    }
    else {
      this.setState({
        userNameBorderColor: errorColor,
        userNameErrorMsg: ErrorMsg.userName_rule,
        userName
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

  handleEmailChange = (e) => {
    let email = e.target.value
    if (checkStrWithEmail(email)) {
      this.setState({
        emailBorderColor: defaultColor,
        emailErrorMsg: '',
        email
      })
    }
    else {
      this.setState({
        emailBorderColor: errorColor,
        emailErrorMsg: ErrorMsg.email_error,
        email
      })
    }
  }

  handlePhoneChange = (e) => {
    let phone = e.target.value
    if (checkStrWithPhone(phone)) {
      this.setState({
        phoneBorderColor: defaultColor,
        phoneErrorMsg: '',
        phone
      })
    }
    else {
      this.setState({
        phoneBorderColor: errorColor,
        phoneErrorMsg: ErrorMsg.phone_error,
        phone
      })
    }
  }

  render() {
    const { isLoading, 
      userNameBorderColor, userNameErrorMsg, 
      passwordBorderColor, passwordErrorMsg,
      confirmPasswordBorderColor, confirmPasswordErrorMsg,
      emailBorderColor, emailErrorMsg,
      phoneBorderColor, phoneErrorMsg
     } = this.state

    return (
      <div className="register_layout">
        <Spin spinning={isLoading}>
          <div className="register_header_component">
            <span className="register_header">欢迎注册 Pynbo 拼板</span>
          </div>
          <div className="register_body_component">
            <div className="register_item">
              <span className="register_label"><span className="register_required">*</span> 用户名：</span>
              <Input
                style={{borderColor: userNameBorderColor}}
                placeholder='请输入用户名'
                onChange={this.handleUserNameChange}
              />
            </div>
            <div className="register_error_item">
              <span className="register_error_message">{userNameErrorMsg}</span>
            </div>
            <div className="register_item">
              <span className="register_label"><span className="register_required">*</span> 密码：</span>
              <Input.Password 
                style={{borderColor: passwordBorderColor}} 
                placeholder='请输入密码'
                onChange={this.handlePasswordChange}
              />
            </div>
            <div className="register_error_item">
              <span className="register_error_message">{passwordErrorMsg}</span>
            </div>
            <div className="register_item">
              <span className="register_label"><span className="register_required">*</span> 确认密码：</span>
              <Input.Password 
                style={{borderColor: confirmPasswordBorderColor}} 
                placeholder='请确认密码'
                onChange={this.handleConfirmPasswordChange}
              />
            </div>
            <div className="register_error_item">
              <span className="register_error_message">{confirmPasswordErrorMsg}</span>
            </div>
            <div className="register_item">
              <span className="register_label"><span className="register_required">*</span> 邮箱地址：</span>
              <Input
                style={{borderColor: emailBorderColor}} 
                placeholder='请输入邮箱地址'
                onChange={this.handleEmailChange}
              />
            </div>
            <div className="register_error_item">
              <span className="register_error_message">{emailErrorMsg}</span>
            </div>
            <div className="register_item">
              <span className="register_label"><span className="register_required">*</span> 手机号码：</span>
              <Input
                style={{borderColor: phoneBorderColor}} 
                placeholder='请输入手机号码'
                onChange={this.handlePhoneChange}
              />
            </div>
            <div className="register_error_item">
              <span className="register_error_message">{phoneErrorMsg}</span>
            </div>
            <br />
            <div className="register_register_item">
              <div className="register_link_left"><Link to="/login">登 录</Link></div>
              <div className="register_link_right">
                <Button
                  type='primary'
                  style={{width: 120}}
                  onClick={this.registerUser}
                >
                  注&emsp;&emsp;册
                </Button>
              </div>
            </div>
          </div>
        </Spin>
      </div>
    );
  }
}

export default Register;