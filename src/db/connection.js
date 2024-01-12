const mongoose = require("mongoose")

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Veri tabanına bağlandı")
    })
    .catch((err) => {
        console.log("Veri tabanı bağlantı hatası: ", err)
    })