// Polyfills
import './polyfills';

import App from './app';
import React from 'react';
// import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import allReducers from './reducers';
import { BrowserRouter as Router, Route } from 'react-router-dom';

let store = createStore(allReducers);

const Root = () => (
    <Provider store={store}>
        <Router>
            <Route path="/" component={App} />
        </Router>
    </Provider>
);

export default Root;
