// 注册界面  /register
import React, { Component } from 'react';
import { Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import './index.css'
import Logo from '../../assets/image/1.jpg'
import { register } from '../../redux/actions'

class Register extends Component {

    state = {
        psd: '',
        radio:'dashen'
    }

    register = (e) => {
        // e.preventDefault();
        // alert(`用户名为${this.username.value},密码为${this.state.psd}`)
        const user = {
            username: this.username.value, 
            password: this.state.psd,
            password2: this.password2.value,
            type: this.state.radio
        }
        this.props.register(user)
    }

    //非受控组件使用refs，受控组件使用onChange事件
    handleChange = (e) => {
        this.setState({
            psd:  e.target.value
        })
    }

    radioValue = (e) => {
        this.setState({
            radio: e.target.value
        })
    }

    render() {
        const { msg, redirectTo } = this.props.user
        if(redirectTo){
            return <Redirect to={redirectTo} />
        }
        return (
            <div className='register'>
                <p className='title'>硅谷直聘</p>
                <div className="img">
                    <img src={Logo} alt="df"/>
                </div>
                <form action="">
                    <div className="input-item">
                        <label htmlFor="">用户名</label>
                        <input type="text" ref={input => this.username = input} />
                    </div>
                    <div className="input-item">
                        <label htmlFor="">密码</label>
                        <input type="password" onChange={this.handleChange} />
                    </div>
                    <div className="input-item">
                        <label htmlFor="">确认密码</label>
                        <input type="password" ref={input => this.password2 = input} />
                    </div>
                    <div className="radio">
                        <div className="type">用户类型</div>
                        <div className='radio-group'>
                            <div className="radio-item">
                                <input type="radio" defaultChecked name='type' value='dashen' onChange={this.radioValue} /> 大神
                            </div>
                            <div className="radio-item">
                                <input type="radio" name='type' value='laoban' onChange={this.radioValue} /> 老板
                            </div>
                        </div>
                    </div>
                    <Button type="primary" onClick={this.register}>注册</Button>
                </form>
                <Button type="ghost" href="#/login">已有账户</Button>
                { msg ? <div className='error_msg'>{msg}</div> : null}
            </div>
        );
    }
}

export default connect(
    state => ({user: state.user}),
    {register}
)(Register)