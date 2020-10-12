const express = require("express");
const mongoose = require("mongoose");
const User = require("./../models/user");
const bcrypt = require("bcrypt");
let router = express.Router();

const saltRounds = 10;

router.post("/", async (req, res) => {
    const { username, password } = req.body;
    var user;

    const users = await User.find({ username: username });
    const usernameTaken = users.length > 0;

    if (usernameTaken) {
        return res.status(401).send("Error: Username taken");
    }

    const hash = await bcrypt.hash(password, saltRounds);

    user = new User({
        _id: new mongoose.Types.ObjectId(),
        username: username,
        password: hash,
    });

    user.save();

    return res.status(200).send("Successfully registered");
})

module.exports = router;