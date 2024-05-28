const express = require('express')
const Book = require('../models/bookModels')
const router = express.Router()
const {
    getBooks,
    getBookById,
    createBook,
    deleteBook,
    updateBook
} = require('../controllers/bookController')


// GET all workouts
router.get('/', getBooks)

// GET a single workout
router.get('/:id', getBookById)

// POST a workout
router.post('/', createBook)

// DELETE a workout
router.delete('/:id', deleteBook)

// UPDATE a workout
router.patch('/:id', updateBook)

module.exports = router