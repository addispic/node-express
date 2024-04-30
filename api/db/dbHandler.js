const mongoose = require('mongoose')

// db connection handler
const dbHandler = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('connected')
    }catch(err){
        console.log('db connection failed',err?.message)
    }
}

// exports
module.exports = dbHandler