const user = require("../models/user.model")
const bcrypt = require("bcrypt")

const login = async (req, res) => {
    console.log("login", req.body)
    return res.json(req.body)
}

const register = async (req, res) => {

    const { email } = req.body

    const userCheck = await user.finOne({ email: email })

    if (userCheck) {
        console.log("Girilen mail kullanımda.")
    }

    req.body.password = await bcrypt.hash(req.body.password, 10)

    console.log("pasworx", req.body.password)

    try {
        const newUserData = new user(req.body)

        await newUserData.save()
            .then((res) => {
                return res.status(201).json({
                    success: true,
                    data: res,
                    message: "Kayıt başarılı"
                })
            })
            .catch((err) => {
                console.log("Kayıt başarısız", err)
            })


    } catch (error) {
        console.log("error", error)
    }
}

module.exports = { login, register }