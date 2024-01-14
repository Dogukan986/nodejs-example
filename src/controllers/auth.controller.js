const userModel = require("../models/user.model")
const bcrypt = require("bcrypt")
const APIError = require("../utils/errors")

const login = async (req, res) => {
    console.log("login", req.body)
    return res.json(req.body)
}

const register = async (req, res) => {

    const { email } = req.body
    const userCheck = await userModel.find({ email: email })

    if (userCheck) {
        throw new APIError("Girilen mail kullanımda.", 401)
    }

    req.body.password = await bcrypt.hash(req.body.password, 10)

    try {

        const newUserData = new userModel(req.body)
        const savedUser = await newUserData.save();
        return res.status(201).json({
            success: true,
            data: savedUser,
            message: "Kayıt başarılı"
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });

    }
}

module.exports = { login, register }