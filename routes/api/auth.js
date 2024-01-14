const express = require('express');
const ctrl = require('../../controllers/auth');
const router = express.Router();
const uploadCloudinary = require('../../middlewares/uploadCloudinary');
const { validateBody, authenticate } = require('../../middlewares');
const { schemas } = require('../../models/user');

router.post('/register', validateBody(schemas.registerSchema), ctrl.register);

router.post('/login', validateBody(schemas.loginSchema), ctrl.login);

router.get('/current', authenticate, ctrl.getCurrent);

router.post('/logout', authenticate, ctrl.logout);

router.get('/verify/:verificationCode', ctrl.verifyEmail);

router.post(
  '/verify',
  validateBody(schemas.emailSchema),
  ctrl.resendVerifyEmail
);
router.patch(
  '/',
  authenticate,
  validateBody(schemas.addUserDataSchemaJoi),
  ctrl.addUserData
);
router.patch(
  '/params',
  authenticate,
  validateBody(schemas.addUserParamsSchemaJoi),
  ctrl.addUserData
);

router.get('/getuser', authenticate, ctrl.getUserParams);

router.patch(
  '/avatars',
  authenticate,
  uploadCloudinary.single('avatar'),
  ctrl.updateAvatar
);
module.exports = router;
