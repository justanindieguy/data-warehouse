const express = require('express');
const controller = require('../controllers/contacts.controller');

const router = express.Router();

router.get('/', controller.getContacts);

module.exports = router;
