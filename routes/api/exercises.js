const express = require('express');

const router = express.Router();

const { authenticate } = require('../../middlewares');

const ctrl = require('../../controllers/exercises');


router.get('/', authenticate, ctrl.getAllExercises);

router.post('/filter', authenticate, ctrl.getExercisesCategories);


module.exports = router;