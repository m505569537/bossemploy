import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Lbitem from './Lbitem'
import { reqDashen } from '../../api/index'
import './index.css'

class Laoban extends Component {

    state = {
        dslist:[]
    }

    async componentDidMount () {
        //本人是老板，那么自然想要获得大神列表了
        const res = await reqDashen()
        const result = res.data
        this.setState({
            dslist: result.data
        })
    }

    noDashen = () => 
        (
            <div>大神跟着小学妹跑啦</div>
        )

    qifei = () => 
        (
            <div className='laoban'>
                {this.state.dslist.map(item => <Lbitem user={item} key={item._id} />)}
            </div>
        )

    render() {
        const { type } = this.props.user
        const { dslist } = this.state
        if(type==='dashen'){
            return (<Redirect to='/home/dashen' />)
        }
        return dslist.length === 0 ? this.noDashen() : this.qifei()
    }
}

export default connect(
    state => ({user:state.user}),
    {}
)(Laoban)