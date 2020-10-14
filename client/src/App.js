import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function App() {
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const queryUserData = async () => {
            try {
                const secretResult = await axios.post("http://localhost:5000/secret", {}, { withCredentials: true });
                const secretData = secretResult.data;

                setUserData(secretData.uuid);
                setLoggedIn(true);
            }
            catch (err) {
                Cookies.remove("isLoggedIn");
                console.log(err.response);
            }

            setLoading(false);
        };

        const wasLoggedIn = Cookies.get("isLoggedIn");

        if (wasLoggedIn) {
            //try to query the homepage info
            queryUserData();
        }
    }, []);

    const login = async () => {
        try {
            const result = await axios.post("http://localhost:5000/login", {
                username: "Tim",
                password: "pim",
            }, { withCredentials: true });

            const secretResult = await axios.post("http://localhost:5000/secret", {}, { withCredentials: true });
            const secretData = secretResult.data;

            setUserData(secretData.uuid);
            setLoggedIn(true);

        }
        catch (err) {
            console.log(err.response);
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
                loading ? (
                    <></>
                ) : (
                        <>
                            {
                                !isLoggedIn ? (
                                    <div className="app__login">
                                        <TextField placeholder="Username" autoComplete="off" />
                                        <TextField placeholder="Password" autoComplete="off" style={{ marginTop: "15px" }} />

                                        <div className="app__login__buttons">
                                            <Button variant="contained" color="primary" onClick={() => login()}>Login</Button>
                                            <Button variant="contained" color="secondary" style={{ marginLeft: "10px" }}>Register</Button>
                                        </div>
                                    </div>
                                ) : (
                                        <div className="app__userdata">
                                            <h1>uuid:{userData}</h1>
                                        </div>
                                    )
                            }
                        </>
                    )
            }

        </div>
    );
}

export default App;
