const express = require('express');

const controller = require('../controllers/regions.controller');
const { requireValidId } = require('../validation/generalValidators');
const { requireName } = require('../validation/region');
const { handleErrors, deleteEntity } = require('../middlewares/middlewares');
const Region = require('../models/Region');

const router = express.Router();

router.get('/', controller.getRegions);

router.get('/:id', [requireValidId], handleErrors, controller.getOneRegion);

router.post('/', [requireName], handleErrors, controller.addRegion);

router.put(
  '/:id',
  [requireValidId, requireName],
  handleErrors,
  controller.updateRegion
);

router.delete(
  '/:id',
  [requireValidId],
  handleErrors,
  deleteEntity(Region, 'Region')
);

module.exports = router;
