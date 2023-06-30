import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import authReducer from './state/index';
import { ToastContainer } from 'react-toastify';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import store from './state/store';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <ToastContainer/>
        <App />
    </Provider>
);


