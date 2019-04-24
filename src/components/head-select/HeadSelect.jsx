import React, { Component } from 'react';
import { Grid, List } from 'antd-mobile'

class HeadSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            icon: null
        }
        this.headerlist = []
        for (let i = 0; i < 20; i++) {
            this.headerlist.push({
                icon: require(`../../assets/image/header/${i+1}.jpg`),
                text: `头像${i+1}`
            })
            
        }
    }

    setHeader = (el) => {
        const { getHeader } = this.props
        getHeader(el.text)
        this.setState({
            icon: el.icon
        })
    }

    render() {
        const { icon } = this.state
        const headertitle = !icon ? '请选择头像' : (
            <div>
                已选择头像: <img src={icon} width="100px" alt=""/>
            </div>
        )
        return (
            <div>
                <List renderHeader={() => headertitle}>
                    <Grid
                        data={this.headerlist}
                        columnNum={5}
                        onClick={el => this.setHeader(el)}
                    />
                </List>
            </div>
        );
    }
}

export default HeadSelect;