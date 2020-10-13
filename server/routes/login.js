const express = require("express");
const mongoose = require("mongoose");
const User = require("./../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const user = require("./../models/user");
let router = express.Router();

const privateKey = fs.readFileSync(__dirname + "/privateKey.key", "utf8");

router.post("/", async (req, res) => {
    const { username, password } = req.body;
    //add try catch to this.

    let users = await User.find({ username: username });
    const userExists = users.length > 0;

    if (!userExists) {
        return res.status(401).send("Error: User not found");
    }

    const user = users[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        return res.status(401).send("Error: Password doesn't match");
    }

    const accessToken = await jwt.sign({ uuid: user._id }, privateKey, { algorithm: "RS256", expiresIn: "2000" });
    const refreshToken = await jwt.sign({ uuid: user._id }, privateKey, { algorithm: "RS256", expiresIn: "15000" });


    //30 * 60 * 1000
    res.cookie("accessToken", accessToken, { maxAge: 30 * 60 * 1000, httpOnly: true, sameSite: "strict" });
    res.cookie("refreshToken", refreshToken, { maxAge: 30 * 60 * 1000, httpOnly: true, sameSite: "strict" });


    return res.status(200).send();
});


module.exports = router;