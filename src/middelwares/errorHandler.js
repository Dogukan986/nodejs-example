const apiError = require("../utils/errors")

const errorHandleMiddleware = (err, req, res, next) => {

    if (err instanceof apiError) {
        return res.status(err.statusCode || 400)
            .json({
                success: false,
                message: err.message
            })
    }

    return res.status(500)
        .json({
            success: false,
            message: "Beklenmedik bir hata oluştu !"
        })
}

module.exports = errorHandleMiddleware