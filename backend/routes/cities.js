const express = require('express');

const controller = require('../controllers/cities.controller');
const { requireValidId } = require('../validation/generalValidators');
const { requireName } = require('../validation/city');
const { handleErrors, deleteEntity } = require('../middlewares/middlewares');
const City = require('../models/City');

const router = express.Router();

router.get('/', controller.getCities);

router.get('/:id', [requireValidId], handleErrors, controller.getOneCity);

router.post('/', [requireName], handleErrors, controller.addCity);

router.put(
  '/:id',
  [requireValidId, requireName],
  handleErrors,
  controller.updateCity
);

router.delete(
  '/:id',
  [requireValidId],
  handleErrors,
  deleteEntity(City, 'City')
);

module.exports = router;
