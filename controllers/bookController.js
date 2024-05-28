const mongoose = require('mongoose')
const Book = require('../models/bookModels')


// GET all books
const getBooks = async (req, res) => {
    const books = await Book.find({}).sort({createdAt: -1})
    res.status(200).json(books)
}

// GET a single book
const getBookById = async(req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({msg: 'No such book'})
    }
    const book = await Book.findById(id)

    if(!book) {
       return res.status(404).json({msg: 'No such book'})
    }
    res.status(200).json(book)
}

// POST a book
const createBook = async (req, res) => {
    const { title, author, summary, pages, likes } = req.body
    try {
        const book = await Book.create({title, author, summary, pages, likes})
        res.status(200).json(book)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// DELETE a book
const deleteBook = async(req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({msg: 'No such book'})
    }

    const book = await Book.findByIdAndDelete({_id: id});
    if(!book) {
       return res.status(404).json({msg: 'No such book'})
    }
    res.status(200).json(book)
}

// UPDATE a book
const updateBook = async(req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({msg: 'No such book'})
    }

    const book = await Book.findByIdAndUpdate({_id: id}, {...req.body});
    if(!book) {
       return res.status(404).json({msg: 'No such book'})
    }
    res.status(200).json(book)
}

module.exports = {
    getBooks,
    getBookById,
    createBook,
    deleteBook,
    updateBook
}