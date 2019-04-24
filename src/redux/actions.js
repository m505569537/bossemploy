
//引入action-types
import {
    AUTH_SUCCESS,
    ERROR_MSG,
    UPDATE_SUCCESS,
    UPDATE_ERROR
} from './action-types'

//要发送ajax请求，首先引入定义的接口请求方式
import { 
    reqRegister,
    reqLogin,
    reqUpdateUser,
    reqUser
 } from '../api/index'

//授权成功的同步action
//登录/注册可以使用不同的同步action，但这里参数相同，所以使用相同的action
const authSuccess = (user) => ({type:AUTH_SUCCESS, data:user})
const errorMsg = (msg) => ({type:ERROR_MSG, data:msg})

//同步更新action
const updateSuccess = (user) => ({type:UPDATE_SUCCESS, data: user})
const updateError = (msg) => ({type:UPDATE_ERROR, data:msg})

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
                dispatch(authSuccess(result.data))
            } else {
                //失败,分发失败的action
                //服务器返回值为{code:1,msg:''}
                dispatch(errorMsg(result.msg))
            }
        }
    }
}

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
            dispatch(updateSuccess(result.data))
        } else {
            dispatch(updateError(result.msg))
        }
    }
}