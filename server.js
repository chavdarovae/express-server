require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workoutRoutes')
const userRoutes = require('./routes/userRoutes')
const bookRoutes = require('./routes/bookRoutes')

// express app 
const app = express()


// middleware
app.use(cors({
    origin: [
        'http://localhost:5200',
        'http://localhost:5300',
        'https://chavdarovae.github.io'
    ]
}));
app.use(express.json())
app.use((req, res, next) => {
    console.log('Logger: ' + req.path, req.method)
    next()
})

// router
app.use('/api/workouts', workoutRoutes)
app.use('/api/books', bookRoutes)
app.use('/api/users', userRoutes)

// connect to the database
mongoose.connect(process.env.MONG_URI)
    .then(() => {
        // listen for requests, where process is a global object, that we have available
        app.listen(process.env.PORT, () => {
            console.log(`Connected to the database & Listening on port ${process.env.PORT}`)
        })
    })
    .catch(err => console.log(err))