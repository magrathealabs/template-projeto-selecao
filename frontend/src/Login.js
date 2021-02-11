import React, { useEffect } from 'react';
import './App.css';
import LoginWithGithub from './services/login';

function App() {

    useEffect(() => {
        if (window.location.href.includes("?code=")) {
            const code = window.location.href.split("?code=")[1];
            LoginWithGithub(code).then(res => {
                let sessionId = res.data['sessionId'];
                if (sessionId) {
                    console.log("Successful login");
                    localStorage.setItem('gttk', sessionId);
                    window.location.href = "http://localhost:3000/";
                }
            });
        }
    });

    return (
        <div className="Login">
        </div>
    );
}

export default App;
