import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.scss';
import App from './components/app/app';
import Store from './redux/store';

ReactDOM.render(
    <BrowserRouter>
        <Provider store={Store}>
            <App />
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);

