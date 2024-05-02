const mongoose = require('mongoose')

// notes schema
const notesSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    },
    note: {
        type: String,
    },
    files: {
        type: Array,
    },
}, {
    timestamps: true
})

// exports
module.exports = mongoose.model('Note', notesSchema)