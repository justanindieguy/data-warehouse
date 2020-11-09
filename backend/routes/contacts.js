const express = require('express');
const controller = require('../controllers/contacts.controller');
const idValidator = require('../validation/routeId');
const validateContact = require('../validation/contact');

const router = express.Router();

router.get('/', controller.getContacts);
router.get('/:id', idValidator, controller.getOneContact);
router.post('/', validateContact, controller.addContact);
router.put('/:id', idValidator, validateContact, controller.updateContact);
router.delete('/:id', idValidator, controller.deleteContact);

module.exports = router;
