// 主界面路由   /   和  /home
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import  Cookies from 'js-cookie'

import { redirectTo } from '../../utils'
import { getUser } from '../../redux/actions'

import Footer from './Footer'
import Lbinfo from '../laoban-info/Lbinfo'
import Dsinfo from '../dashen-info/Dsinfo'
import Personal from '../personal/Personal';
import Dashen from '../dashen/Dashen';
import Laoban from '../laoban/Laoban';
import Message from '../message/Message';
import Chat from '../chat/Chat';

class Home extends Component {


    componentDidMount () {
        //当cookie存在，而用户为登陆时，向后台请求user数据
        const userid = Cookies.get('userid')
        const { _id } = this.props.user

        if(userid&&!_id){
            this.props.getUser()
        }
    }

    render() {
        //要实现自动登陆
        //首先运行项目后，页面打开路径为 '/'，导向Home组件，所以在此组件中进行自动登陆
        //使用cookie实现自动登陆
        // 1. 判断cookie是否存在
        const userid = Cookies.get('userid')
        if(!userid) {
            //cookie不存在，跳转到login页面
            return (<Redirect to='/login' />)
        }
        //若存在，判断用户是否已经处于登陆状态
        const { user } = this.props
        if(!user._id){
            //若用户未登录，那么向服务器发送ajax请求获取user信息
            //因为这是在组件初始化的时候执行的任务，所以可以在生命周期中完成

            //此时可以显示 loading....
            return null
        } else {
            //如果已经登陆了，按照正常路由，应用是不会进入到'/'或者'/home'这两个路由路径的
            //但用户却也可以直接修改页面url进入到此页面，而此页面里面没有内容，我们还是应该将页面导入正确的路由
            //此时，再通过重定向根据type类型将页面导入对应页面中
            let routePath = this.props.location.pathname
            if(routePath==='/'||routePath==='/home'||routePath==='/home/'){
                routePath = redirectTo(user.type, user.header)
                return (<Redirect to={routePath}/>)
            }
        }
        let aimPeople = this.props.user.type ==='dashen' ? {path:'/home/dashen',icon:'laoban',text:'老板',title:'老板列表'}:{
            path: '/home/laoban',
            icon:'dashen',
            text: '大神',
            title:'大神列表'
        }    
        let list = [
                aimPeople,
                {
                    path:'/home/message',
                    icon:'message',
                    text:'消息',
                    title:'消息列表'
                },
                {
                    path:'/home/personal',
                    icon:'personal',
                    text:'个人',
                    title:'个人详情'
                }
            ]
        // console.log(list);
        // console.log(this.props.location.pathname);
        const headtitle = list.find(item => item.path===this.props.location.pathname)

        // console.log(headtitle); 
        return (
            <div className="container">
                
                {headtitle ? (<header>
                    <h2>{headtitle.title}</h2>
                </header>): null}
                <Switch>
                    <Route path='/home/laoban-info' component={Lbinfo} />
                    <Route path="/home/dashen-info" component={Dsinfo} />
                    <Route path='/home/personal' component={Personal} />
                    <Route path='/home/dashen' component={Dashen} />
                    <Route path='/home/laoban' component={Laoban} />
                    <Route path='/home/message' component={Message} />
                    <Route path='/home/chat/:userid' component={Chat} />
                </Switch>
                {headtitle ? (<Footer list={list} />) : null}
            </div>
        );
    }
}

export default connect(
    state => ({user: state.user}),
    { getUser }
)(Home)