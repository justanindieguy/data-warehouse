const express = require('express');
const controller = require('../controllers/cities.controller');

const router = express.Router();

router.get('/', controller.getCities);

module.exports = router;
