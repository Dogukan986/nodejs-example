require("dotenv").config()
require("./src/db/connection")

const express = require("express")
const app = express()
const port = process.env.PORT || 5001
const router = require("./src/routers")

//middleware
app.use(express.json())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))


app.use("/api", router)
app.listen(port, () => {
    console.log(`Server ${port} çalışıyor.`)
})