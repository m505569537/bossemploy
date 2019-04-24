import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Dsitem from './Dsitem'
import { reqLaoban } from '../../api/index'
import './index.css'

class Dashen extends Component {

    state = {
        lblist:[]
    }

    async componentDidMount () {
        //本人是大神，那么自然想要获得老板列表了
        const res = await reqLaoban()
        const result = res.data
        this.setState({
            lblist: result.data
        })
    }

    noLaoban = () => 
        (
            <div>老板们都带着小姨子跑啦</div>
        )

    meipao = () => 
        (
            <div className='dashen'>
                {this.state.lblist.map(item => <Dsitem key={item._id} user={item} />)}
            </div>
        )

    render() {
        const { type } = this.props.user
        const { lblist } = this.state
        if(type==='laoban'){
            return (<Redirect to='/home/laoban' />)
        }
        return lblist.length === 0 ? this.noLaoban() : this.meipao()            
        
    }
}

export default connect(
    state => ({user: state.user}),
    {}
)(Dashen)