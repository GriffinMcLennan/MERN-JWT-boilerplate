import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function App() {
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [userData, setUserData] = useState([]);
    const [errorMsg, setErrorMsg] = useState(null);

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
        } else {
            setLoading(false);
        }
    }, []);

    const login = async () => {
        try {
            const result = await axios.post("http://localhost:5000/login", {
                username: username,
                password: password,
            }, { withCredentials: true });

            console.log(result);

            const secretResult = await axios.post("http://localhost:5000/secret", {}, { withCredentials: true });
            const secretData = secretResult.data;

            setUserData(secretData.uuid);
            setLoggedIn(true);
            setErrorMsg(null);

        }
        catch (err) {
            console.log(err.response);
            setErrorMsg(err.response.data);
        }
    }

    const logout = () => {
        Cookies.remove("isLoggedIn");
        setLoggedIn(false);
    }

    const register = async () => {
        try {
            let result = await axios.post("http://localhost:5000/register", {
                username: username,
                password: password,
            }, { withCredentials: true });

            const uuid = result.data.uuid;
            setUserData(uuid);
            setLoggedIn(true);
        }
        catch (err) {
            console.log(err.response);
            setErrorMsg(err.response.data);
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
                                        <TextField
                                            placeholder="Username"
                                            autoComplete="off"
                                            onChange={(e) => setUsername(e.target.value)}
                                        />

                                        <TextField
                                            placeholder="Password"
                                            type="password"
                                            autoComplete="off"
                                            onChange={(e) => setPassword(e.target.value)}
                                            style={{ marginTop: "15px" }}
                                        />

                                        {
                                            errorMsg ? (
                                                <h4>{errorMsg}</h4>
                                            ) : <></>
                                        }

                                        <div className="app__login__buttons">
                                            <Button variant="contained" color="primary" onClick={login}>Login</Button>
                                            <Button variant="contained" color="secondary" onClick={register} style={{ marginLeft: "10px" }}>Register</Button>
                                        </div>
                                    </div>
                                ) : (
                                        <div className="app__userdata">
                                            <h1>uuid:{userData}</h1>
                                            <Button variant="contained" color="primary" onClick={logout}>Logout</Button>
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
