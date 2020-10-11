const express = require("express");
const mongoose = require("mongoose");
const User = require("./../models/user");
let router = express.Router();

router.post("/", (req, res) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        username: "Peter",
        password: "pw1234",
    });

    user.save();
})

module.exports = router;