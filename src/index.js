import ReactDOM from 'react-dom'
import React from "react";
import { App } from "./app.jsx";
import { Provider } from 'react-redux';
import store from './store.js';
import theme from './css/style.js';
import { ThemeProvider } from '@mui/material';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </Provider>
    </React.StrictMode>
    , document.getElementById('app'))