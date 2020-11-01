const express = require('express');
const controller = require('../controllers/regions.controller');

const router = express.Router();

router.get('/', controller.getRegions);

module.exports = router;
