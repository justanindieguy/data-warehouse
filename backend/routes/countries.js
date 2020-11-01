const express = require('express');
const controller = require('../controllers/countries.controller');
const idValidator = require('../validation/routeId');
const validateCountry = require('../validation/country');

const router = express.Router();

router.get('/', controller.getCountries);
router.get('/:id', idValidator, controller.getOneCountry);
router.post('/', validateCountry, controller.addCountry);
router.put('/:id', idValidator, validateCountry, controller.updateCountry);
router.delete('/:id', idValidator, controller.deleteCountry);

module.exports = router;
