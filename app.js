require("express-async-errors")
require("dotenv").config()
require("./src/db/connection")

const express = require("express")
const app = express()
const port = process.env.PORT || 5001
const router = require("./src/routers")
const errorHandleMiddleware = require("./src/middelwares/errorHandler")

//middleware
app.use(express.json())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))


app.use("/api", router)

//Hata yakalama
app.use(errorHandleMiddleware)

app.listen(port, () => {
    console.log(`Server ${port} çalışıyor.`)
})