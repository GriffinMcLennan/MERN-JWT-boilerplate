const express = require("express");
const mongoose = require("mongoose");
const User = require("./../models/user");
const bcrypt = require("bcrypt");
let router = express.Router();

router.post("/", async (req, res) => {
    const { username, password } = req.body;

    let user = await User.find({ username: username });

    if (!user) {
        return res.status(401).send("Error: User not found");
    }

    user = user[0];

    bcrypt.compare(password, user.password, (err, valid) => {
        if (err || !valid) {
            //console.log(err);
            return res.status(400).send("Failed to login");
        }

        return res.status(200).send("Successfully logged in");
    });

    return res.status(200);
});


module.exports = router;