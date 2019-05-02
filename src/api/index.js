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

//这两个请求可以用一个函数，也可以分两个，所以这里有两种写法
//1. 分为两个，分别请求
//请求类型为dashen的所有数据
export const reqDashen = () => ajax('/dashen')

//请求类型为laoban的所有数据
export const reqLaoban = () => ajax('/laoban')

//2. 写一个函数
//使用查询字符串的形式来获取数据
export const reqIndex = (type) => ajax(`/index?type=${type}`)

//获取当前用户的聊天消息列表
export const reqChatMsgList = () => ajax('/msglist')

//修改指定消息为已读
export const reqReadMsg = (from) => ajax('/readmsg',{from},'POST')