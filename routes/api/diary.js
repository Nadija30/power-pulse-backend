const express = require('express');

const router = express.Router();

const { authenticate, validateBody } = require('../../middlewares');

const ctrl = require('../../controllers/diary');

const { schemas } = require('../../helpers/joiForDiary/diaryJoiSchemas');

// add exercise to diary
router.post('/exercises', authenticate, validateBody(schemas.addExerciseJoiSchema), ctrl.addExercise);

// detele exercise 
router.delete('/exercises/:exerciseId', authenticate, ctrl.deleteExercise);

// add product to diary
router.post('/products', authenticate, validateBody(schemas.addProductJoiSchema), ctrl.addProduct);

// detele product
router.delete('/products/:productId', authenticate, ctrl.deleteProduct);

// get all info for diary
router.get('/:date', authenticate, ctrl.getDiaryInfo);

module.exports = router;