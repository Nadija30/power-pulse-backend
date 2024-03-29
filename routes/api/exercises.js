const express = require('express');

const router = express.Router();

const { authenticate } = require('../../middlewares');

const ctrl = require('../../controllers/exercises');

router.get('/', authenticate, ctrl.getAllExercises);

router.get('/filter', authenticate, ctrl.getExercisesCategories);

module.exports = router;