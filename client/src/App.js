import React from 'react';
import './App.css';
import axios from 'axios';

function App() {
    const login = async () => {
        try {
            let result = await axios.post("http://localhost:5000/login", {
                username: "Tim",
                password: "pim",
                //password: "tester",
            }, { withCredentials: true });

            console.log(result);
        }
        catch (err) {
            console.log(err.response);
        }
    }

    const test = async () => {
        try {
            let data = await axios.post("http://localhost:5000/secret", {}, { withCredentials: true });

            console.log(data);
        }
        catch (e) {
            console.log(e.message);
        }
    }

    const register = async () => {
        try {
            let data = await axios.post("http://localhost:5000/register", {
                username: "Tim",
                password: "pim",
            }, { withCredentials: true });

            console.log(data);
        }
        catch (e) {
            console.log(e.message);
        }
    }

    return (
        <div className="app">
            <h1>Welcome</h1>

            <button onClick={() => login()}>Sign in</button>
            <button onClick={() => test()}>Test Cookies</button>
            <button onClick={() => register()}>Register</button>
        </div>
    );
}

export default App;
