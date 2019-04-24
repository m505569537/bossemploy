import React, { Component } from 'react';
import { connect } from 'react-redux'

class Personal extends Component {
    render() {
        return (
            <div>
                {this.props.user._id}
            </div>
        );
    }
}

export default connect(
    state => ({user: state.user}),
    {}
)(Personal)