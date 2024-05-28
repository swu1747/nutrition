import ReactDOM from 'react-dom'
import React from "react";
import { App } from "./app.jsx";
import { Provider } from 'react-redux';
import store from './store.js';

ReactDOM.render(<React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
</React.StrictMode>, document.getElementById('app'))