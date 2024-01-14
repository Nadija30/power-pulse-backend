const express = require('express');

const router = express.Router();

// const { authenticate } = require('../../middlewares');

const ctrl = require('../../controllers/exercises');


// router.get('/', authenticate, ctrl.getAllExercises);
router.get('/', ctrl.getAllExercises);


// router.get('/filter', authenticate, ctrl.getExercisesCategories);
router.get('/filter', ctrl.getExercisesCategories);


module.exports = router;