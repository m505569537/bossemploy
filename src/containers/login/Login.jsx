//登录界面  /login
import React, { Component } from 'react';
import { Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import './index.css'
import Logo from '../../assets/image/1.jpg'
import { login } from '../../redux/actions'

class Login extends Component {

    login = () => {
        const user = {
            username: this.username.value,
            password: this.psd.value
        }
        this.props.login(user)
    }

    render() {
        const { msg, redirectTo } = this.props.user
        if(redirectTo){
            return <Redirect to={redirectTo} />
        }
        return (
            <div className='login'>
                <p className="title">硅谷直聘</p>
                <div className="img">
                    <img src={Logo} alt="df"/>
                </div>
                { msg ? <div className="error_msg">{msg}</div>:null }
                <form action="">
                    <div className="input-item">
                        <label htmlFor="">用户名</label>
                        <input type="text" ref={input => this.username = input} />
                    </div>
                    <div className="input-item">
                        <label htmlFor="">密码</label>
                        <input type="password" ref={input => this.psd = input} />
                    </div>
                    <Button type="primary" onClick={this.login}>登录</Button>
                </form>
                <Button type="ghost" href="#/register">还没有账户</Button>
            </div>
        );
    }
}

export default connect(
    state => ({user: state.user}),
    { login }
)(Login)