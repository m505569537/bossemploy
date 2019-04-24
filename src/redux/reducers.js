import { combineReducers } from 'redux'

import {
    AUTH_SUCCESS,
    ERROR_MSG,
    UPDATE_SUCCESS,
    UPDATE_ERROR
} from './action-types'

import { redirectTo } from '../utils'

const initUser = {
    username: '',  // 用户名
    type: '',  //用户类型
    msg: '',   // 错误提示信息
}

// user是state中的一个属性  state ={ user }
function user(state=initUser, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            // ...state先将state中的东西结构出来，再把action.data结构出的东西将state对应属性覆盖
            // return {...action.data, redirectTo: '/'}
            const { type, header } = action.data
            return {...action.data, redirectTo: redirectTo(type,header)}
        case ERROR_MSG:
            return {...state,msg:action.data}
        case UPDATE_SUCCESS:
            return action.data
        case UPDATE_ERROR:
            return {...initUser, msg:action.data}
        default:
            return state
    }
}

export default combineReducers({
    user
})