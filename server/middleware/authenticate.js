const jwt = require("jsonwebtoken");
const fs = require("fs");
const publicKey = fs.readFileSync(__dirname + "/../routes/publicKey.key", "utf8");

const auth = (req, res, next) => {
    const { accessToken, refreshToken } = req.cookies;

    jwt.verify(accessToken, publicKey, { algorithm: "RS256" }, (err, valid) => {
        if (err) {
            return res.send({ result: err.message });
        }

        req._id = valid.uuid;

        next();
    });
}

module.exports = auth;