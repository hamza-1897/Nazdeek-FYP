const mongoose = require('mongoose')

const connectDB = async () => {
    try {
         const con = await mongoose.connect(process.env.DB_Atlas_URL);
        console.log("Mongodb connected")

    } catch (error) {
         console.log("error" , error.message)
    }
}
module.exports = connectDB