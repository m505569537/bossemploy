/* 包含了多个接口请求的函数模块 */

import ajax from './ajax'

//注册接口
export const reqRegister = (user) => ajax('/register',user,'POST')

//登录接口
export const reqLogin = (user) => ajax('/login',user, 'POST')

//更新用户接口
export const reqUpdateUser = (user) => ajax('/update',user, 'POST')

//请求用户数据
export const reqUser = () => ajax('/user')

//这两个请求可以用一个函数，也可以分两个，这里分两个写，因为不想传参数type
//请求类型为dashen的所有数据
export const reqDashen = () => ajax('/dashen')

//请求类型为laoban的所有数据
export const reqLaoban = () => ajax('/laoban')