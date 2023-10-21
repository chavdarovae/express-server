const express = require('express')
const router = express.Router()
const {
    loginUser,
    signupUser
} = require('../controllers/userController')


// login route
router.post('/signup', signupUser)

// signup route
router.post('/login', loginUser)

module.exports = router