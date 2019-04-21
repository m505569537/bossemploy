import { combineReducers } from 'redux'

import {
    AUTH_SUCCESS,
    ERROR_MSG
} from './action-types'

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
            window.location.href = 'http://localhost:3000/#/home'
            return {...action.data}
        case ERROR_MSG:
            return {...state,msg:action.data}
        default:
            return state
    }
}

export default combineReducers({
    user
})