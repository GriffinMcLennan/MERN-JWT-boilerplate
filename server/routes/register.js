const express = require("express");
const mongoose = require("mongoose");
const User = require("./../models/user");
const bcrypt = require("bcrypt");
let router = express.Router();

const saltRounds = 10;

router.post("/", (req, res) => {
    const { username, password } = req.body;
    var user;

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err);
            return res.status(400).send("Error hashing password");
        }

        user = new User({
            _id: new mongoose.Types.ObjectId(),
            username: username,
            password: hash,
        });

        user.save();
        return res.status(200).send("Successful registration");
    })
})

module.exports = router;