import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function App() {
    const [isLoggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        Cookies.set("TestCookie", 30);
    }, []);

    const login = async () => {
        try {
            let result = await axios.post("http://localhost:5000/login", {
                username: "Tim",
                password: "pim",
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
            {
                !isLoggedIn ? (
                    <div className="app__login">
                        <TextField id="standard-basic" placeholder="Username" autoComplete="off" />
                        <TextField id="standard-basic" placeholder="Password" autoComplete="off" style={{ marginTop: "15px" }} />

                        <div className="app__login__buttons">
                            <Button variant="contained" color="primary">Login</Button>
                            <Button variant="contained" color="secondary" style={{ marginLeft: "10px" }}>Register</Button>
                        </div>
                    </div>
                ) : (
                        <></>
                    )
            }

        </div>
    );
}

export default App;
