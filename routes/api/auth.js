const express = require('express');
const ctrl = require('../../controllers/auth');
const router = express.Router();
const { validateBody, authenticate } = require('../../middlewares');
const { schemas } = require('../../models/user');
router.post('/register', validateBody(schemas.registerSchema), ctrl.register);
router.post('/login', validateBody(schemas.loginSchema), ctrl.login);
router.get('/current', authenticate, ctrl.getCurrent);
router.post('/logaut', authenticate, ctrl.logaut);
router.patch(
  '/',
  authenticate,
  validateBody(schemas.patchSubscriptionSchema),
  ctrl.patchSubscription
);
module.exports = router;
