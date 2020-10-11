import React from 'react';
import './App.css';
import axios from 'axios';

function App() {
    const login = async () => {
        let data = await axios.post("http://localhost:5000/login", {
            username: "Tim",
            password: "pim",
        }, { withCredentials: true });

        console.log(data);
    }

    return (
        <div className="app">
            <h1>Welcome</h1>

            <button onClick={() => login()}>Sign in</button>
        </div>
    );
}

export default App;
