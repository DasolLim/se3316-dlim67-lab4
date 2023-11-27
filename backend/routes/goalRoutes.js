const express = require('express')
const router = express.Router()

// getting getGoals, setGoals, updateGoal, deleteGoal from goalController file
const {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
} = require('../controllers/goalController')

const { protect } = require('../middleware/authMiddleware')

// since route for getGoals and setGoal is the same
router.route('/').get(protect, getGoals).post(protect, setGoal)

// since route for deleteGoal and updateGoal is the same
router.route('/:id').delete(protect, deleteGoal).put(protect, updateGoal)

module.exports = router