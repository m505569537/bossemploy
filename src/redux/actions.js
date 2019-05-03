import io from 'socket.io-client';
//引入action-types
import {
    AUTH_SUCCESS,
    ERROR_MSG,
    UPDATE_SUCCESS,
    UPDATE_ERROR,
    RECEIVE_MSG_LIST,
    RECEIVE_MSG
} from './action-types'

//要发送ajax请求，首先引入定义的接口请求方式
import { 
    reqRegister,
    reqLogin,
    reqUpdateUser,
    reqUser,
    reqChatMsgList
 } from '../api/index'

//授权成功的同步action
//登录/注册可以使用不同的同步action，但这里参数相同，所以使用相同的action
const authSuccess = (user) => ({type:AUTH_SUCCESS, data:user})
const errorMsg = (msg) => ({type:ERROR_MSG, data:msg})

//同步更新action
const updateSuccess = (user) => ({type:UPDATE_SUCCESS, data: user})
export const updateError = (msg) => ({type:UPDATE_ERROR, data:msg})

//接收消息列表的同步action
const receiveMsgList = (data) => ({ type: RECEIVE_MSG_LIST, data })
//接收一条在线消息的同步action
const receiveMsg = (data) => ({type:RECEIVE_MSG, data})

//注册异步action
export const register = (user) => {
    const { username, password, password2, type } = user

    return async dispatch => {
        if(!username||!password){
            dispatch(errorMsg('信息不能为空'))
        } else if(password!==password2) {
            dispatch(errorMsg('2次密码不一致'))
        } else {
            //reqRegister()返回的是一个Promise，想要直接拿到结果，可以使用async/await
            const res = await reqRegister({username, password, type})
            const result = res.data
            if(result.code === 0){
                //成功,分发成功的action
                //服务器返回值为{code:0,data:user}
                getMsgList(dispatch,result.data._id)
                dispatch(authSuccess(result.data))
            } else {
                //失败,分发失败的action
                //服务器返回值为{code:1,msg:''}
                dispatch(errorMsg(result.msg))
            }
        }
    }
}

//登录异步action
export const login = (user) => {

    const { username, password } = user

    return async dispatch => {

        if(!username||!password){
            dispatch(errorMsg('信息不能为空'))
        } else {
            const res = await reqLogin(user)
            const result = res.data
            if(result.code === 0){
                //成功,分发成功的action
                //服务器返回值为{code:0,data:user}
                getMsgList(dispatch,result.data._id)
                dispatch(authSuccess(result.data))
            } else {
                //失败,分发失败的action
                //服务器返回值为{code:1,msg:''}
                dispatch(errorMsg(result.msg))
            }
        }
    }
}

//更新用户信息
export const updateUser = (user) => {

    return async dispatch => {
        const res = await reqUpdateUser(user)
        const result = res.data
        if(result.code===0){
            dispatch(updateSuccess(result.data))
        } else {
            dispatch(updateError(result.msg))
        }
    }
}

//获取用户信息用于自动登陆
export const getUser = () =>{

    return async dispatch => {
        const res = await reqUser()
        const result = res.data
        if(result.code===0){
            getMsgList(dispatch, result.data._id)
            dispatch(updateSuccess(result.data))
        } else {
            dispatch(updateError(result.msg))
        }
    }
}


function initIO (dispatch,userid) {
    //如果socket对象不存在，则创建连接，否则不重新创建连接对象
    if(!io.socket){
        //连接服务器，创建socket对象
        io.socket = io('ws://106.13.144.87:8089')
        //绑定监听，接收服务器发送的消息
        io.socket.on('receiveMsg', function (data) {
            // console.log('客户端接受服务器发送的消息', data);
            if(userid===data.from||userid===data.to){
            // console.log('客户端接受服务器发送的消息', data);
                dispatch(receiveMsg(data))
            }
        })
    }
}

//发送消息的异步action
//并没有涉及到操作state，感觉并不需要写在redux中
export const sendMsg = (msg) => {

    return dispatch => {
        // console.log('发送消息', msg);
        io.socket.emit('sendMsg', msg)
    }
}

//获取消息列表
//要保证只有当用户处于登陆状态时才会请求数据
//所以不能直接写在Home的componentDidMount中
async function getMsgList  (dispatch,userid)  {
    initIO(dispatch,userid)
    const res = await reqChatMsgList()
    const result = res.data
    if(result.code===0){
        // console.log(result.data);
        dispatch(receiveMsgList(result.data))
    } else {

    }
}