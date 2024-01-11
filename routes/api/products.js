const express = require('express');
const ctrl = require('../../controllers/contacts');
const router = express.Router();
const { validateBody, isValidId, authenticate } = require('../../middlewares');
const { schemas } = require('../../models/contact');

router.get('/', authenticate, ctrl.getAll);

router.get('/:contactId', authenticate, isValidId, ctrl.getById);

router.post(
  '/',
  authenticate,
  validateBody(schemas.addSchema),
  ctrl.postContact
);

router.delete('/:contactId', authenticate, isValidId, ctrl.deleteContact);

router.put(
  '/:contactId',
  authenticate,
  validateBody(schemas.putSchema),
  isValidId,
  ctrl.putContact
);
router.patch(
  '/:contactId',
  authenticate,
  validateBody(schemas.patchSchema),
  isValidId,
  ctrl.patchFavorite
);

module.exports = router;
