const { login, register, me } = require("../controllers/auth.controller")
const { tokenCheck } = require("../middelwares/auth")
const authValidation = require("../middelwares/validations/auth.validation")

const router = require("express").Router()

router.post("/login", authValidation.login, login)
router.post("/register", authValidation.register, register)
router.get("/me", tokenCheck, me)

module.exports = router