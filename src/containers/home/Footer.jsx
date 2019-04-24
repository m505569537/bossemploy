import React, { Component } from 'react';
import { TabBar } from 'antd-mobile'
//因为Footer组件，并没有写在Switch标签中，它并不属于路由组件，只是一般的组件，所以并没有路由组件的history,location以及match属性
//然而我们却需要这些属性，所以可以通过一些方法将此组件封装为路由组件
//使用react-router-dom提供的withRouter方法
import { withRouter } from 'react-router-dom'

const Item = TabBar.Item



class Footer extends Component {

    render() {
        return (
            <div className="footer">
                <TabBar
                >
                    {this.props.list.map(item => <Item
                        title={item.text}
                        key={item.text}
                        icon={{uri: require(`../../assets/image/footer/${item.icon}.jpg`)}}
                        selectedIcon={{uri: require(`../../assets/image/footer/${item.icon}.jpg`)}}
                        selected={this.props.location.pathname===item.path}
                        onPress={() => this.props.history.replace(item.path)}
                        ></Item>)}
                </TabBar>
            </div>
        );
    }
}

export default withRouter(Footer)