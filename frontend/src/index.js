import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from '@reach/router';
import './index.css';
import App from './App';
import Login from './Login';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './context/authContext';


ReactDOM.render(
    <AuthProvider>
        <React.StrictMode>
            <Router>
                <App path="/" />
                <App path="/home" />
                <Login path="/login" />
            </Router>
        </React.StrictMode>
    </AuthProvider>,
    
    document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
