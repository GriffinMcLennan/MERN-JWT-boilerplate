require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const port = 5000;
const mongoURL = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@mern-jwt.6gmv0.mongodb.net/MERN-JWT?retryWrites=true&w=majority`;
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const auth = require("./middleware/authenticate");

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

const whitelist = ['http://localhost:3000',];
const corsOptions = {
    credentials: true,
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use("/register", registerRoute, loginRoute);

app.use("/login", loginRoute);

app.post("/secret", auth, (req, res) => {
    res.status(200).send({ uuid: req._id });
});

app.use((err, req, res, next) => {
    res.status(401).send(err.message);
    console.log("Error:", err.message);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});