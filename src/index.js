import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux'

import Router from './Router'
import store from './redux/store'
import './assets/css/index.css'

ReactDOM.render(
    <Provider store={store}>
        <Router />
    </Provider>, document.getElementById('root'));
