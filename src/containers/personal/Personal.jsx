import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Result, List, Button, Modal } from 'antd-mobile'
import Cookies from 'js-cookie'

import './index.css'
import { updateError } from '../../redux/actions'

const Item = List.Item
const Brief = Item.Brief

class Personal extends Component {

    logout = () => {
        Modal.alert('退出','确认要退出？',[
            { text: '取消' },
            {
                text: '确定',
                onPress: () => {
                    Cookies.remove('userid')
                    this.props.updateError()
                }
            }
        ])
    }

    dashen = () => {
        const { username, header, info, post } = this.props.user
        return (
            <div className='personal'>
                <Result
                    imgUrl={require(`../../assets/image/header/${header[2]}.jpg`)}
                    title={username}
                />
                <List
                    renderHeader={ () => '相关信息' }
                >
                    <Item multipleLine>
                        <Brief>职位:{post}</Brief>
                        <Brief>简介:{info}</Brief>
                    </Item>
                </List>
                <Button type='warning' onClick={this.logout}>退出登录</Button>
            </div>
        )
    }

    laoban = () => {
        const { username, header, info, post, company, salary } = this.props.user
        return (
            <div className='personal'>
                <Result
                    imgUrl={require(`../../assets/image/header/${header[2]}.jpg`)}
                    title={username}
                    message={company}
                />
                <List
                    renderHeader={ () => '相关信息' }
                >
                    <Item multipleLine>
                        <Brief>职位:{post}</Brief>
                        <Brief>要求:{info}</Brief>
                        <Brief>薪资:{salary}</Brief>
                    </Item>
                </List>
                <Button type='warning' onClick={this.logout}>退出登录</Button>
            </div>
        )
    }

    render() {
        const { type } = this.props.user
        return type==='dashen' ? this.dashen() : this.laoban()
    }
}

export default connect(
    state => ({user: state.user}),
    { updateError }
)(Personal)