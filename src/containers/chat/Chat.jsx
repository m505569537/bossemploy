import React, { Component } from 'react';
import { List,InputItem } from 'antd-mobile'
import { connect } from 'react-redux'

import './index.css'
import { sendMsg } from '../../redux/actions'

const Item = List.Item
class Chat extends Component {

    state = {
        msg:'',
    }

    componentDidMount () {
        //通过此方法，使得每次进入聊天界面的时候都是滑倒最底部的，显示最新的消息
        window.scrollTo(0,document.body.scrollHeight)
    }

    componentDidUpdate () {
        window.scrollTo(0,document.body.scrollHeight)
    }

    handleSend = () => {
        const from = this.props.user._id
        const to = this.props.match.params.userid
        const msg  = this.state.msg
        if(msg) {
            this.props.sendMsg({from, to, msg})
        }
        this.setState({
            msg:''
        })
    }

    back = () => {
        this.props.history.goBack()
    }

    render() {
        const { user, chat } = this.props
        const { users, chatMsgs } = chat
        // console.log(chatMsgs);
        const targetid = this.props.match.params.userid
        if(!users[targetid]){
            return null
        }
        const other = users[targetid]
        const now_chat = [user._id, targetid].sort().join('_')
        const list = chatMsgs.filter( msg => now_chat===msg.chat_id)
        const { username, header } = other
        const img = header ? require(`../../assets/image/header/${header[2]}.jpg`) : null
        const back = '<'
        return (
            <div className='chat'>
                <header>
                    <span onClick={this.back}>
                        {back}
                    </span>
                    <h2>{username}</h2>
                </header>
                <section>
                    {
                        list.map( item => {
                            item.read = true
                            if(item.from===targetid){
                                return (
                                    <Item
                                        key={item._id}
                                        thumb={img}
                                    >{item.msg}</Item>
                                )
                            } else {
                                return (
                                    <Item
                                        key={item._id}
                                        extra='我'
                                        className='chat-me'
                                    >{item.msg}</Item>
                                )
                            }
                        })
                    }
                </section>
                <footer>
                    <List>
                        <InputItem
                            placeholder='请输入'
                            value={this.state.msg}
                            onChange={val => this.setState({msg:val})}
                            extra={
                                <span className='sendMsg' onClick={this.handleSend}>发送</span>
                            }
                        />
                    </List>
                </footer>
            </div>
        );
    }
}

export default connect(
    state => ({user:state.user, chat: state.chat}),
    { sendMsg }
)(Chat)