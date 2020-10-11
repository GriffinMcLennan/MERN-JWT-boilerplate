require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const User = require("./../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
let router = express.Router();

const privateKey = fs.readFileSync(__dirname + "/privateKey.key", "utf8");

router.post("/", async (req, res) => {
    const { username, password } = req.body;

    let user = await User.find({ username: username });

    if (!user) {
        return res.status(401).send("Error: User not found");
    }

    user = user[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        return res.status(401).send("Error: Password doesn't match");
    }

    const token = await jwt.sign({ uuid: user._id }, privateKey, { algorithm: "RS256" });

    if (!token) {
        return res.status(400).send("Error: Failed to generate JWT");
    }

    res.cookie("jwt", token, { maxAge: 5 * 60 * 1000, httpOnly: true });


    return res.status(200).send();
});


module.exports = router;