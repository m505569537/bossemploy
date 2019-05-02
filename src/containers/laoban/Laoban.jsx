import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Lbitem from './Lbitem'
import { reqIndex } from '../../api/index'

class Laoban extends Component {

    state = {
        dslist:[]
    }

    async componentDidMount () {
        //本人是老板，那么自然想要获得大神列表了
        const res = await reqIndex('laoban')
        const result = res.data
        this.setState({
            dslist: result.data
        })
    }

    noDashen = () => 
        (
            <div className='loading'>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
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