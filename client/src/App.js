import React from 'react';
import './App.css';
import axios from 'axios';

function App() {
    const login = async () => {
        let result = await axios.post("http://localhost:5000/login", {
            username: "Tim",
            password: "pim",
        }, { withCredentials: true });

        console.log(result);
    }

    const test = async () => {
        /*
        let result = await axios.post("http://localhost:5000/test", {}, { withCredentials: true });

        if (result.data.result === "jwt expired") {
            let refreshData = await generateRefreshToken();

            if (refreshData.data.result === "Success") {
                console.log("Successfully updated accesss token & refresh token");
            }
            else {
                console.log("Failed to update access & refresh token");
            }
        }
        */

        try {
            let data = await axios.post("http://localhost:5000/secret", {}, { withCredentials: true });

            console.log(data);
        }
        catch (e) {
            console.log(e.message);
        }
    }

    const generateRefreshToken = async () => {
        let data = await axios.post("http://localhost:5000/refresh", {}, { withCredentials: true });

        return data;
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
