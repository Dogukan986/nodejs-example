const { login, register } = require("../controllers/auth.controller")
const authValidation = require("../middelwares/validations/auth.validation")

const router = require("express").Router()

router.post("/login", authValidation.login, login)
router.post("/register", authValidation.register, register)

module.exports = router