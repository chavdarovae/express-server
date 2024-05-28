const mongoose = require('mongoose')

const Schema = mongoose.Schema

const bookSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    pages: {
        type: Number,
        required: true
    },
    summary: {
        type: String
    },
    likes: {
        type: Number,
    }

}, { timestamps: true })

module.exports = mongoose.model('Book', bookSchema)