const express = require("express");
const jwt = require("jsonwebtoken");
var cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();
const mongoose = require("mongoose");
const User = require("./models/user"); //remove this
const port = 5000;
const mongoURL = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@mern-jwt.6gmv0.mongodb.net/MERN-JWT?retryWrites=true&w=majority`;
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const dbName = "MERN-JWT";

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use("/register", registerRoute);

app.use("/login", loginRoute);


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});