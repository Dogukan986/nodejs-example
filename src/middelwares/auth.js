const jwt = require("jsonwebtoken")
const APIError = require("../utils/errors")
const UserModel = require("../models/user.model")

const createToken = async (user, res) => {

    const payload = {
        sub: user._id,
        name: user.name
    }

    const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        algorithm: "HS512",
        expiresIn: process.env.JWT_EXPIRES_KEY
    })
    return res.status(201).json({ success: true, token, message: "Başarılı" })
}

const tokenCheck = async (req, res, next) => {

    const bearerToken = req.headers.authorization
    const headerToken = bearerToken && bearerToken.startsWith("Bearer ")

    if (!headerToken) {
        throw new APIError("Lütfen oturum açınız.", 401)
    }

    const token = bearerToken.split(" ")[1]

    await jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {

        if (err) {
            throw new APIError("Geçersiz token.", 401)
        }

        const userInfo = await UserModel.findById(decoded.sub).select("_id name lastName email")

        if (!userInfo) {
            throw new APIError("Geçersiz token.", 401)
        }
        req.user = userInfo

        next()
    })
}

module.exports = {
    createToken,
    tokenCheck
}