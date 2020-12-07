const express = require('express');

const controller = require('../controllers/contacts.controller');
const {
  requireValidId,
  requireName,
  requireValidCityId,
  requireValidCompanyId,
} = require('../validation/generalValidators');
const { requireLastName } = require('../validation/person');
const {
  requireValidEmail,
  requirePosition,
  requireValidInterest,
} = require('../validation/contact');
const { handleErrors, deleteEntity } = require('../middlewares/middlewares');
const Contact = require('../models/Contact');

const router = express.Router();

router.get('/', controller.getContacts);

router.get('/:id', [requireValidId], handleErrors, controller.getOneContact);

router.post(
  '/',
  [
    requireName,
    requireLastName,
    requireValidEmail,
    requireValidCompanyId,
    requireValidCityId,
    requirePosition,
    requireValidInterest,
  ],
  handleErrors,
  controller.addContact
);

router.put(
  '/:id',
  [
    requireValidId,
    requireName,
    requireLastName,
    requireValidEmail,
    requireValidCompanyId,
    requireValidCityId,
    requirePosition,
    requireValidInterest,
  ],
  handleErrors,
  controller.updateContact
);

router.delete(
  '/:id',
  [requireValidId],
  handleErrors,
  deleteEntity(Contact, 'Contact')
);

module.exports = router;
