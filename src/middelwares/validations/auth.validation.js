const joi = require("joi")
const APIError = require("../../utils/errors")

class authValidation {
    static register = async (req, res, next) => {
        try {
            await joi.object({
                name: joi.string().trim().min(3).max(100).required().messages({
                    "string.base": "İsim alanı normal metin olmalıdır.",
                    "string.empty": "İsim alanı boş olamaz.",
                    "string.min": "İsim alanı en az 3 karakter olmalıdır.",
                    "string.max": "İsim alanı en fazla 100 karakter olmalıdır.",
                    "string.required": "isim alanı zorunludur"
                }),
                lastName: joi.string().trim().min(3).max(100).required().messages({
                    "string.base": "Soyad alanı normal metin olmalıdır.",
                    "string.empty": "Soyad alanı boş olamaz.",
                    "string.min": "Soyad alanı en az 3 karakter olmalıdır.",
                    "string.max": "Soyad alanı en fazla 100 karakter olmalıdır.",
                    "string.required": "Soyad alanı zorunludur"
                }),
                email: joi.string().email().trim().min(3).max(100).required().messages({
                    "string.base": "E-posta alanı normal metin olmalıdır.",
                    "string.empty": "E-posta alanı boş olamaz.",
                    "string.email": "Lütfen geçerli bir e-posta giriniz.",
                    "string.min": "E-posta alanı en az 3 karakter olmalıdır.",
                    "string.max": "E-posta alanı en fazla 100 karakter olmalıdır.",
                    "string.required": "E-posta alanı zorunludur"
                }),
                password: joi.string().trim().min(6).max(36).required().messages({
                    "string.base": "Şifre alanı normal metin olmalıdır.",
                    "string.empty": "Şifre alanı boş olamaz.",
                    "string.min": "Şifre alanı en az 6 karakter olmalıdır.",
                    "string.max": "Şifre alanı en fazla 36 karakter olmalıdır.",
                    "string.required": "Şifre alanı zorunludur"
                })
            }).validateAsync(req.body)
        } catch (error) {
            throw new APIError(error.details[0].message, 400)
        }
        next()
    }

    static login = async (req, res, next) => {
        try {
            await joi.object({
                email: joi.string().email().trim().min(3).max(100).required().messages({
                    "string.base": "E-posta alanı normal metin olmalıdır.",
                    "string.empty": "E-posta alanı boş olamaz.",
                    "string.email": "Lütfen geçerli bir e-posta giriniz.",
                    "string.min": "E-posta alanı en az 3 karakter olmalıdır.",
                    "string.max": "E-posta alanı en fazla 100 karakter olmalıdır.",
                    "string.required": "E-posta alanı zorunludur"
                }),
                password: joi.string().trim().min(6).max(36).required().messages({
                    "string.base": "Şifre alanı normal metin olmalıdır.",
                    "string.empty": "Şifre alanı boş olamaz.",
                    "string.min": "Şifre alanı en az 6 karakter olmalıdır.",
                    "string.max": "Şifre alanı en fazla 36 karakter olmalıdır.",
                    "string.required": "Şifre alanı zorunludur"
                })
            }).validateAsync(req.body)

        } catch (error) {
            throw new APIError(error.details[0].message, 400)
        }
        next()
    }
}

module.exports = authValidation