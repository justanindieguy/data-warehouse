const express = require('express');
const controller = require('../controllers/countries.controller');

const router = express.Router();

router.get('/', controller.getCountries);

module.exports = router;
