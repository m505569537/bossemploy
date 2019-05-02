import React, { Component } from 'react';
import { connect } from 'react-redux'
import { List, Badge } from 'antd-mobile'

const Item = List.Item
const Brief = Item.Brief

function getLastMsgs(chatMsgs) {
    let lastMsgObjs = {}
    chatMsgs.forEach(msg => {
        const chatId = msg.chat_id
        let lastMsg = lastMsgObjs[chatId]
        //如果lastMsg不存在，则说明msg是最新的，若存在，则与msg比较，看谁时间最晚
        if(!lastMsg){
            lastMsgObjs[chatId] = msg
        } else {
            if(lastMsg.create_time<msg.create_time){
                lastMsgObjs[chatId] = msg
            }
        }
    })
    //将lastMsgObjs对象转换为数组，为了好排序
    let lastMsgs = Object.values(lastMsgObjs)
    lastMsgs.sort(function (m1,m2) {
        return m2.create_time - m1.create_time
    })
    return lastMsgs
}

class Message extends Component {
    render() {
        const { user, chat } = this.props
        const { users, chatMsgs } = chat
        //获取最新的消息
        const lastMsgs = getLastMsgs(chatMsgs)
        return (
            <List className='message'>
                {
                    lastMsgs.map( msg => {
                        const targetId = msg.to === user._id ? msg.from : msg.to
                        const targetUser = users[targetId]
                        return (
                            <Item
                                key={msg._id}
                                extra={<Badge text={0} />}
                                thumb={targetUser.header ? require(`../../assets/image/header/${targetUser.header[2]}.jpg`) : null}
                                arrow='horizontal'
                                onClick={() => this.props.history.push(`/home/chat/${targetId}`)}
                            >
                            {msg.msg}
                            <Brief>{targetUser.username}</Brief>
                            </Item>
                        )
                    })
                }
            </List>
        );
    }
}

export default connect(
    state => ({user: state.user,chat: state.chat}),
    {}
)(Message);