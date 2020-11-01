const express = require('express');
const controller = require('../controllers/companies.controller');

const router = express.Router();

router.get('/', controller.getCompanies);

module.exports = router;
