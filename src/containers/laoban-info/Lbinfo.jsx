import React, { Component } from 'react';
import { connect } from 'react-redux'
import { InputItem, TextareaItem, Button, List } from 'antd-mobile'
import { Redirect } from 'react-router-dom'

import HeadSelect from '../../components/head-select/HeadSelect'
import { updateUser } from '../../redux/actions'

class Lbinfo extends Component {

    state = {
        header:'',
        post:'',
        company:'',
        salary:'',
        info:''
    }

    getLaobanHeader = (header) => {
        this.setState({
            header
            
        })
    }

    handleChange = (name,val) => {
        this.setState({
            [name]: val
        })
    }

    submit = () => {
        // console.log(this.state.header);
        this.props.updateUser(this.state)
    }

    render() {
        const { header } = this.props.user
        if(header) {
            return (<Redirect to='/home/laoban' />)
        }
        return (
            <div>
                <HeadSelect getHeader={this.getLaobanHeader} />
                <List>
                    <InputItem onChange={val => this.handleChange('post',val)}>招聘职位：</InputItem>
                    <InputItem onChange={val => this.handleChange('company', val)}>公司名称：</InputItem>
                    <InputItem onChange={val => this.handleChange('salary', val)}>职位薪资：</InputItem>
                    <TextareaItem
                        title="职位要求"
                        rows={2}
                        onChange={val => this.handleChange('info', val)}
                    ></TextareaItem>
                </List>
                <Button type='primary' onClick={this.submit}>提交</Button>
            </div>
        );
    }
}

export default connect(
    state => ({user: state.user}),
    { updateUser }
)(Lbinfo)