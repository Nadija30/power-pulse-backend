const express = require('express');

const router = express.Router();

const { authenticate, validateBody } = require('../../middlewares');

const ctrl = require('../../controllers/diary');

const { schemas } = require('../../helpers/joiForDiary/diaryJoiSchemas');

// get all info for diary
router.get('/:date', authenticate, ctrl.getDiaryInfo);

// add exercise to diary
router.post('/exercises', validateBody(schemas.addExerciseJoiSchema), authenticate, ctrl.addExercise);

// detele exercise 
router.delete('/exercises/:exerciseId', authenticate, ctrl.deleteExercise);

// add product to diary
router.post('/products', validateBody(schemas.addProductJoiSchema), authenticate, ctrl.addProduct);

// detele product
router.delete('/products/:productId', authenticate, ctrl.deleteProduct);

module.exports = router;