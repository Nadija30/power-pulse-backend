const express = require('express');

const router = express.Router();

const { authenticate } = require('../../middlewares');

const ctrl = require('../../controllers/exercises');


router.get('/', ctrl.getAllExercises);

router.get('/bodyparts',  ctrl.getAllBodyParts);

router.get('/muscles',  ctrl.getAllMuscles);

router.get('/equipments', ctrl.getAllEquipments);

module.exports = router;