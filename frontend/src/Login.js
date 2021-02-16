import React, { useState } from 'react';
import { Redirect } from '@reach/router';
import './App.css';
import LoginWithGithub from './services/login';

function Login() {

    const [token, setToken] = useState(null);

    window.onload = () => {
        if (window.location.href.includes("?code=")) {
            const code = window.location.href.split("?code=")[1];
            LoginWithGithub(code).then(res => {
                if (res.status === 200) {
                    console.log(res.status)
                    let sessionId = res.data['sessionId'];
                    if (sessionId) {
                        console.log("Successful login");
                        setToken(sessionId);
                    }
                } else {
                    alert('Login Failed');
                }
            });
        }
    }


    if (token != null) {
        return <Redirect to={{
            pathname: "/home",
            state: { token: token}
        }} />
    } else {
        return (
            <>
            </>
        );
    }
}

export default Login;
