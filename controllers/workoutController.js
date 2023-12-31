const mongoose = require('mongoose')
const Workout = require('../models/workoutModels')


// GET all workouts
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})
    res.status(200).json(workouts)
}

// GET a single workout
const getWorkoutById = async(req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({msg: 'No such workout'})
    }
    const workout = await Workout.findById(id)

    if(!workout) {
       return res.status(404).json({msg: 'No such workout'})
    }
    res.status(200).json(workout)
}

// POST a workout
const createWorkout = async (req, res) => {
    const {title, reps, load, likes } = req.body
    try {
        const workout = await Workout.create({title, reps, load, likes})
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// DELETE a workout
const deleteWorkout = async(req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({msg: 'No such workout'})
    }

    const workout = await Workout.findByIdAndDelete({_id: id});
    if(!workout) {
       return res.status(404).json({msg: 'No such workout'})
    }
    res.status(200).json(workout)
}

// UPDATE a workout
const updateWorkout = async(req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({msg: 'No such workout'})
    }

    const workout = await Workout.findByIdAndUpdate({_id: id}, {...req.body});
    if(!workout) {
       return res.status(404).json({msg: 'No such workout'})
    }
    res.status(200).json(workout)
}

module.exports = {
    getWorkouts,
    getWorkoutById,
    createWorkout,
    deleteWorkout,
    updateWorkout
}