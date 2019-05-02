import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Card } from 'antd-mobile'
import { withRouter } from 'react-router-dom'

class Dsitem extends Component {

    static propTypes = {
        user: PropTypes.object
    }

    render() {
        const { header, info, post, username, company, salary, _id } = this.props.user
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
                        <p>职位：{ post }</p>
                        <p>公司：{ company }</p>
                        <p>月薪：{ salary }</p>
                        <p>描述：{ info }</p>
                    </div>
                </Card.Body>
            </Card>
        );
    }
}

export default withRouter(Dsitem);