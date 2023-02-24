import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from "axios";
import { store } from './store/store';
import {Provider} from "react-redux";
import {BrowserRouter as Router} from 'react-router-dom'

axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem("token");
    if (token)
        config.headers.Authorization = "Basic " + token;
    return config;
}, (error) => {
    if (error.response.status === 401) {
        localStorage.removeItem("token");
    }
});

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    </React.StrictMode>,

    document.getElementById('root')
);
