const mongoose = require('mongoose')

// users chema
const usersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true,'username required'],
        unique: true,
    },
    email: {
        type: String,
        required: [true,'email address required'],
        validate: [isEmail,'invalid email address'],
        unique: true,
    },
    password: {
        type: String,
        required: [true,'password required'],
        minlength: [3,'too short password'],
    }
})