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

    try {
        const user = await User.findOne({ username: username });

        if (!user) {
            return res.status(401).send("Error: User not found");
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).send("Error: Password doesn't match");
        }

        const accessToken = await jwt.sign({ uuid: user._id }, privateKey, { algorithm: "RS256", expiresIn: "2000" });
        const refreshToken = await jwt.sign({ uuid: user._id }, privateKey, { algorithm: "RS256", expiresIn: "15000" });

        res.cookie("accessToken", accessToken, { maxAge: 30 * 60 * 1000, httpOnly: true, sameSite: "strict" });
        res.cookie("refreshToken", refreshToken, { maxAge: 30 * 60 * 1000, httpOnly: true, sameSite: "strict" });
        res.cookie("isLoggedIn", true);

        return res.status(200).send({ msg: "Successfully logged in", uuid: user._id });
    }
    catch (err) {
        console.log("Error:", err.message);
        return res.status(400).send();
    }
});


module.exports = router;