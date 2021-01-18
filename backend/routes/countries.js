// ********** IMPORTS **********
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

// ***** HELPER FUNCTION ******
function parseBody(req, res, next) {
  const { name, regionId } = req.body;
  req.reqCountry = { name, regionId };
  next();
}

// ********** ROUTES **********
router.get('/', controller.getCountries);

router.get('/:id', [requireValidId], handleErrors, controller.getOneCountry);

router.post(
  '/',
  [requireName, requireValidRegionId],
  handleErrors,
  parseBody,
  controller.addCountry
);

router.put(
  '/:id',
  [requireValidId, requireName, requireValidRegionId],
  handleErrors,
  parseBody,
  controller.updateCountry
);

router.delete(
  '/:id',
  [requireValidId],
  handleErrors,
  deleteEntity(Country, 'Country')
);

module.exports = router;
