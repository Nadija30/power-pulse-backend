const express = require('express');

const router = express.Router();

const { authenticate } = require('../../middlewares');

const ctrl = require('../../controllers/diary');

// get all info for diary
router.get('/', authenticate, ctrl.getDiaryInfo);

// add exercise to diary
router.post('/exercises', authenticate, ctrl.addExercise);

// detele exercise 
// router.delete('/exercises/:exId', authenticate, ctrl.getExercisesCategories);

// add product to diary
// router.post('/products', authenticate, ctrl.getExercisesCategories);

// detele product 
// router.delete('/products/:prodId', authenticate, ctrl.getExercisesCategories);


module.exports = router;