import React from 'react';
import './App.css';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';

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
            <TextField id="standard-basic" placeholder="Username" />
            <TextField id="standard-basic" placeholder="Password" />
        </div>
    );
}

export default App;
