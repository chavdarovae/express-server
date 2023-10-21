const express = require('express')
const Workout = require('../models/workoutModels')
const router = express.Router()
const {
    getWorkouts,
    getWorkoutById,
    createWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController')


// GET all workouts
router.get('/', getWorkouts)

// GET a single workout
router.get('/:id', getWorkoutById)

// POST a workout
router.post('/', createWorkout)

// DELETE a workout
router.delete('/:id', deleteWorkout)

// UPDATE a workout
router.patch('/:id', updateWorkout)

module.exports = router