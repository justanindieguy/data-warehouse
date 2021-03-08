const express = require('express');

const controller = require('../controllers/channels.controller');

const router = express.Router();

router.get('/', controller.getChannels);

module.exports = router;
