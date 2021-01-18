// ********** IMPORTS **********
const express = require('express');

const controller = require('../controllers/regions.controller');
const { requireValidId } = require('../validation/generalValidators');
const { requireName } = require('../validation/region');
const { handleErrors, deleteEntity } = require('../middlewares/middlewares');
const Region = require('../models/Region');

const router = express.Router();

// ***** HELPER FUNCTION ******
function parseBody(req, res, next) {
  const { name } = req.body;
  req.reqRegion = { name };
  next();
}

// ********** ROUTES **********
router.get('/', controller.getRegions);

router.get('/:id', [requireValidId], handleErrors, controller.getOneRegion);

router.post('/', [requireName], handleErrors, parseBody, controller.addRegion);

router.put(
  '/:id',
  [requireValidId, requireName],
  handleErrors,
  parseBody,
  controller.updateRegion
);

router.delete(
  '/:id',
  [requireValidId],
  handleErrors,
  deleteEntity(Region, 'Region')
);

module.exports = router;
