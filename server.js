require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workoutRoutes')
const userRoutes = require('./routes/userRoutes')

// express app 
const app = express()

const allowedOrigins = [
    'http://localhost:4200',
    'https://chavdarovae.github.io/node-app-frontend/'
];

// middleware
app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin 
        // (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}))
// app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
    console.log('Logger: ' + req.path, req.method)
    next()
})

// router
app.use('/api/workouts', workoutRoutes)
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