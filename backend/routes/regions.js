const express = require('express');

const controller = require('../controllers/regions.controller');
const {
  requireValidId,
  requireName,
} = require('../validation/generalValidators');

const router = express.Router();

router.get('/', controller.getRegions);
router.get('/:id', [requireValidId], controller.getOneRegion);
router.post('/', [requireName], controller.addRegion);
router.put('/:id', [requireValidId, requireName], controller.updateRegion);
router.delete('/:id', [requireValidId], controller.deleteRegion);

module.exports = router;
