const express = require('express');
const controller = require('../controllers/contacts.controller');

const router = express.Router();

router.get('/', controller.getContacts);
router.post('/', controller.addContact);

module.exports = router;
