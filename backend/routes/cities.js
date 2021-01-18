// ********** IMPORTS **********
const express = require('express');

const controller = require('../controllers/cities.controller');
const { requireValidId } = require('../validation/generalValidators');
const { requireName } = require('../validation/city');
const { handleErrors, deleteEntity } = require('../middlewares/middlewares');
const City = require('../models/City');

// ***** HELPER FUNCTION ******
function parseBody(req, res, next) {
  const { name, countryId } = req.body;
  req.reqCity = { name, countryId };
  next();
}

const router = express.Router();

// ********** ROUTES **********
router.get('/', controller.getCities);

router.get('/:id', [requireValidId], handleErrors, controller.getOneCity);

router.post('/', [requireName], handleErrors, parseBody, controller.addCity);

router.put(
  '/:id',
  [requireValidId, requireName],
  handleErrors,
  parseBody,
  controller.updateCity
);

router.delete(
  '/:id',
  [requireValidId],
  handleErrors,
  deleteEntity(City, 'City')
);

module.exports = router;
