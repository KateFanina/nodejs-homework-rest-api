const express = require('express');
const router = express.Router();
const contactsController = require('../../controllers/contact-controllers');
const { schemas } = require('../../models/contact');
const { validateBody, isValidId, validateFavorite, authenticate } = require('../../decorators');

router.get('/', authenticate, contactsController.getAllContacts);

router.get('/:contactId', authenticate, isValidId, contactsController.getContactById);

router.post(
  '/',
  authenticate,
  validateBody(schemas.contactAddSchema),
  contactsController.addContact
);

router.put(
  '/:contactId',
  authenticate,
  isValidId,
  validateBody(schemas.contactAddSchema),
  contactsController.updateContactById
);

router.patch(
  '/:contactId/favorite',
  authenticate,
  isValidId,
  validateFavorite(schemas.updateFavoriteSchema),
  contactsController.updateFavorite
);

router.delete('/:contactId', authenticate, isValidId, contactsController.deleteContactById);

module.exports = router;
