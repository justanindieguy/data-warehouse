const express = require('express');

const controller = require('../controllers/contacts.controller');
const {
  requireValidId,
  requireName,
  requireValidEmail,
  requireValidCityId,
  requireValidCompanyId,
} = require('../validation/generalValidators');
const {
  requireLastNameOne,
  checkLastNameTwo,
} = require('../validation/person');
const {
  requirePosition,
  requireValidInterest,
} = require('../validation/contact');

const router = express.Router();

router.get('/', controller.getContacts);

router.get('/:id', [requireValidId], controller.getOneContact);

router.post(
  '/',
  [
    requireName,
    requireLastNameOne,
    requireLastNameOne,
    checkLastNameTwo,
    requireValidEmail,
    requireValidCompanyId,
    requireValidCityId,
    requirePosition,
    requireValidInterest,
  ],
  controller.addContact
);

router.put(
  '/:id',
  [
    requireValidId,
    requireName,
    requireLastNameOne,
    requireLastNameOne,
    checkLastNameTwo,
    requireValidEmail,
    requireValidCompanyId,
    requireValidCityId,
    requirePosition,
    requireValidInterest,
  ],
  controller.updateContact
);

router.delete('/:id', [requireValidId], controller.deleteContact);

module.exports = router;
