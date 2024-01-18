const userModel = require("../models/user.model")
const bcrypt = require("bcrypt")
const APIError = require("../utils/errors")
const Response = require("../utils/response")
const { createToken } = require("../middelwares/auth")

const login = async (req, res) => {
    const { email, password } = req.body

    const userInfo = await userModel.findOne({ email })

    if (!userInfo) {
        throw new APIError("Email veya şifre hatalı!", 401)
    }

    const comparePassword = await bcrypt.compare(password, userInfo.password)

    if (!comparePassword) {
        throw new APIError("Email veya şifre hatalı!", 401)
    }

    createToken(userInfo, res)
}

const register = async (req, res) => {

    const { email } = req.body
    const userCheck = await userModel.findOne({ email: email })

    if (userCheck) {
        throw new APIError("Girilen mail kullanımda.", 401)
    }

    req.body.password = await bcrypt.hash(req.body.password, 10)

    const newUserData = new userModel(req.body);

    try {
        const savedUserData = await newUserData.save();
        return new Response(savedUserData, "Kullanıcı kaydı başarıyla oluştu.").created(res);
    } catch (err) {
        throw new APIError("Kullanıcı kayıt edilemedi !", 400);
    }

}

const me = async (req, res) => {
    return new Response(req.user).success(res)
}

module.exports = { login, register, me }