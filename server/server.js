const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();
const mongoose = require("mongoose");
const User = require("./models/User");
const port = 5000;
const mongoURL = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@mern-jwt.6gmv0.mongodb.net/MERN-JWT?retryWrites=true&w=majority`;
const dbName = "MERN-JWT";
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.once("open", () => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        username: "Peter",
        password: "pw1234",
    });

    user.save();
});

app.use(express.json());
app.use(cookieParser);

app.get("/", (req, res) => {
    res.send("Hello World");
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});