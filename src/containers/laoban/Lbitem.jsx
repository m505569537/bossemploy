import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Card } from 'antd-mobile'
import { withRouter } from 'react-router-dom'

class Lbitem extends Component {

    static propTypes = {
        user: PropTypes.object
    }

    render() {
        const { header, info, post, username, _id} = this.props.user
        // console.log(header[2]);
        return (
            <Card full onClick={() => this.props.history.push(`/home/chat/${_id}`)}>
                <Card.Header
                    thumb={require(`../../assets/image/header/${header[2]}.jpg`)}
                    thumbStyle={{width:'60px',borderRadius:'50%'}}
                    extra={<span>{username}</span>}
                />
                <Card.Body>
                    <div>
                        <p>求职岗位：{ post }</p>
                        <p>个人介绍：{ info }</p>
                    </div>
                </Card.Body>
            </Card>
        );
    }
}

export default withRouter(Lbitem)