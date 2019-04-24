import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { InputItem, TextareaItem, Button, List } from 'antd-mobile'

import HeadSelect from '../../components/head-select/HeadSelect'
import { updateUser } from '../../redux/actions'

class Dsinfo extends Component {

    state = {
        //一定要注意后台服务器设置的参数名约束，如果参数名错误，那数据库中也不会显示
        //很坑！！！
        header:'',
        post:'',
        info:''
    }

    getDashenHeader = (header) => {
        this.setState({
            header
        })
    }

    handleChange = (name, val) => {
        this.setState({
            [name]: val
        })
    }

    submit = () => {
      /*   const { _id, username, type } = this.props.user
        const { header, aidjob, perind } = this.state */
        // console.log(user);
        this.props.updateUser(this.state)
    }

    render() {
        const { header } = this.props.user
        if(header) {
            return (<Redirect to='/home/dashen' />)
        }
        return (
            <div>
                <HeadSelect getHeader={this.getDashenHeader} />
                <List>
                    <InputItem onChange={val => this.handleChange('post', val)}>求职岗位：</InputItem>
                    <TextareaItem
                        title='个人介绍'
                        rows={3}
                        onChange={ val => this.handleChange('info', val)}
                    />
                </List>
                <Button type='primary' onClick={this.submit}>提交</Button>
            </div>
        );
    }
}

export default connect(
    state => ({ user: state.user }),
    { updateUser }
)(Dsinfo)