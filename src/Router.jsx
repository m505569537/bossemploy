import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import Home from './containers/home/Home'
import Login from './containers/login/Login'
import Register from './containers/register/Register'

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/home" component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                </Switch>
            </Router>
        );
    }
}

export default App;