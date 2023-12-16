const express = require('express')
const router = express.Router()
const {
    loginUser,
    signupUser,
    logoutUser
} = require('../controllers/userController')


// login route
router.post('/signup', signupUser)

// signup route
router.post('/login', loginUser)

// logout route
router.get('/logout', logoutUser)

module.exports = router