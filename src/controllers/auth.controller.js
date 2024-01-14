const userModel = require("../models/user.model")
const bcrypt = require("bcrypt")
const APIError = require("../utils/errors")
const Response = require("../utils/response")

const login = async (req, res) => {
    return res.json(req.body)
}

const register = async (req, res) => {

    const { email } = req.body
    const userCheck = await userModel.findOne({ email: email })

    if (userCheck) {
        throw new APIError("Girilen mail kullanımda.", 401)
    }

    req.body.password = await bcrypt.hash(req.body.password, 10)

    const newUserData = new userModel(req.body)
    await newUserData.save()
        .then((res) => {
            return new Response(res, "Kullanıcı kaydı başarıyla oluştu.").created(res)
        })
        .catch((err) => {
            throw new APIError("Kullanıcı kayıt edilemedi !", 400)
        })

}

module.exports = { login, register }