import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './Redux/store';
import App from 'App';

render(
    <Router>
        <Provider store={configureStore()}>
            <App />
        </Provider>
    </Router>,
    document.getElementById('root')
);
