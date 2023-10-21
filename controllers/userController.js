const User = require('../models/userModels')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id: _id}, process.env.SECRET, {expiresIn: '3d'})
}

// POST loginUser
const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.login( email, password )
        const token = createToken(user._id)
        res.cookie(
            'token',
            token,
            {
                httpOnly: true
            }
        )
        delete user.password
        res.status(200).json({ user, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// POST signupUser
const signupUser = async(req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.signup( email, password )
        const token = createToken(user._id)
        res.cookie(
            'token',
            token,
            {
                httpOnly: true
            }
        )
        delete user.password
        res.status(200).json({ user, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


module.exports = {
    loginUser,
    signupUser
}