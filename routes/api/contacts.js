const express = require('express');
const router = express.Router();
const contactsController = require('../../controllers/contact-controllers');
const { schemas } = require('../../models/contact');
const { validateBody, isValidId, validateFavorite } = require('../../decorators');

router.get('/', contactsController.getAllContacts);

router.get('/:contactId', isValidId, contactsController.getContactById);

router.post('/', validateBody(schemas.contactAddSchema), contactsController.addContact);

router.put(
  '/:contactId',
  isValidId,
  validateBody(schemas.contactAddSchema),
  contactsController.updateContactById
);

router.patch(
  '/:contactId/favorite',
  isValidId,
  validateFavorite(schemas.updateFavoriteSchema),
  contactsController.updateFavorite
);

router.delete('/:contactId', isValidId, contactsController.deleteContactById);

module.exports = router;
module.exports = router;
