import React, { Component } from 'react';

class NoMatch extends Component {
    //当并没有匹配到路由路径时，渲染组件，表示未找到相应的结果
    render() {
        return (
            <div>
                404
            </div>
        );
    }
}

export default NoMatch;