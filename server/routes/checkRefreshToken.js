const express = require("express");
const jwt = require("jsonwebtoken");
const fs = require("fs");
let router = express.Router();
const privateKey = fs.readFileSync(__dirname + "/../routes/privateKey.key", "utf8");
const publicKey = fs.readFileSync(__dirname + "/../routes/publicKey.key", "utf8");

router.post("/", (req, res) => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
        return res.send({ result: "Failed" });
    }

    jwt.verify(refreshToken, publicKey, { algorithm: "RS256" }, async (err, valid) => {
        if (err) {
            return res.send({ result: "Failed" });
        }

        if (valid) {
            const uuid = valid.uuid;
            const newAccessToken = await jwt.sign({ uuid: uuid }, privateKey, { algorithm: "RS256", expiresIn: "2000" });

            if (!newAccessToken) {
                return res.status(400).send("Error: Failed to generate JWT");
            }

            const newRefreshToken = await jwt.sign({ uuid: uuid }, privateKey, { algorithm: "RS256", expiresIn: "15000" });

            if (!newRefreshToken) {
                return res.status(400).send("Error: Failed to generate JWT");
            }

            res.cookie("accessToken", newAccessToken, { maxAge: 30 * 60 * 1000, httpOnly: true, sameSite: "strict" });
            res.cookie("refreshToken", newRefreshToken, { maxAge: 30 * 60 * 1000, httpOnly: true, sameSite: "strict" });
            res.status(200).send({ result: "Success" });
        }
        else {
            res.status(200).send({ result: "Failed" });
        }
    });
});

module.exports = router;