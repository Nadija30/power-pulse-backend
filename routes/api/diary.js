const express = require('express');

const router = express.Router();

const { authenticate } = require('../../middlewares');

const ctrl = require('../../controllers/diary');

// get all info for diary
router.get('/', authenticate, ctrl.getDiaryInfo);

// add exercise to diary
router.post('/exercises', authenticate, ctrl.addExercise);

// detele exercise 
router.delete('/exercises/:exerciseId', authenticate, ctrl.deleteExercise);

// add product to diary
router.post('/products', authenticate, ctrl.addProduct);

// detele product
router.delete('/products/:productId', authenticate, ctrl.deleteProduct);

module.exports = router;