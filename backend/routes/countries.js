const express = require('express');

const controller = require('../controllers/countries.controller');
const {
  requireValidId,
  requireValidRegionId,
} = require('../validation/generalValidators');
const { requireName } = require('../validation/country');
const { handleErrors, deleteEntity } = require('../middlewares/middlewares');
const Country = require('../models/Country');

const router = express.Router();

router.get('/', controller.getCountries);

router.get('/:id', [requireValidId], handleErrors, controller.getOneCountry);

router.post(
  '/',
  [requireName, requireValidRegionId],
  handleErrors,
  controller.addCountry
);

router.put(
  '/:id',
  [requireValidId, requireName, requireValidRegionId],
  handleErrors,
  controller.updateCountry
);

router.delete(
  '/:id',
  [requireValidId],
  handleErrors,
  deleteEntity(Country, 'Country')
);

module.exports = router;
