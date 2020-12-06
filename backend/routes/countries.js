const express = require('express');

const controller = require('../controllers/countries.controller');
const {
  requireValidId,
  requireName,
  requireValidRegionId,
} = require('../validation/generalValidators');

const router = express.Router();

router.get('/', controller.getCountries);
router.get('/:id', [requireValidId], controller.getOneCountry);
router.post('/', [requireName, requireValidRegionId], controller.addCountry);

router.put(
  '/:id',
  [requireValidId, requireName, requireValidRegionId],
  controller.updateCountry
);

router.delete('/:id', [requireValidId], controller.deleteCountry);

module.exports = router;
