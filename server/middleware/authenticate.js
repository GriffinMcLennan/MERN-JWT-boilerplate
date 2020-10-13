const jwt = require("jsonwebtoken");
const fs = require("fs");
const privateKey = fs.readFileSync(__dirname + "/../routes/privateKey.key", "utf8");
const publicKey = fs.readFileSync(__dirname + "/../routes/publicKey.key", "utf8");

const auth = async (req, res, next) => {
    const { accessToken, refreshToken } = req.cookies;

    try {
        const payload = jwt.verify(accessToken, publicKey, { algorithm: "RS256" });
        req._id = payload.uuid;
    }
    catch (err1) {
        //can try to use refresh token here
        try {
            const refreshPayload = await jwt.verify(refreshToken, publicKey, { algorithm: "RS256" });
            req._id = refreshPayload.uuid;

            //assign new cookies
            const newAccessToken = await jwt.sign({ uuid: req._id }, privateKey, { algorithm: "RS256", expiresIn: "2000" });
            const newRefreshToken = await jwt.sign({ uuid: req._id }, privateKey, { algorithm: "RS256", expiresIn: "15000" });

            res.cookie("accessToken", newAccessToken);
            res.cookie("refreshToken", newRefreshToken);
        }
        catch (err2) {
            next(new Error(`${err1.message} + ${err2.message}`));
        }
    }

    next();
}

module.exports = auth;