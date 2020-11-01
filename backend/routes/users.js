const express = require('express');
const controller = require('../controllers/users.controller');

const router = express.Router();

router.get('/', controller.getUsers);

module.exports = router;
