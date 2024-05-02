const mongoose = require('mongoose')

// db connection
const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('connected')
    } catch (err) {
        console.log('db connection error')
        process.exit(-1)
    }
}

// exports
module.exports = dbConnection