const express = require('express');
const controller = require('../controllers/regions.controller');
const idValidator = require('../validation/routeId');
const validateRegion = require('../validation/region');

const router = express.Router();

router.get('/', controller.getRegions);
router.get('/:id', idValidator, validateRegion, controller.getOneRegion);
router.post('/', controller.addRegion);
router.put('/:id', idValidator, validateRegion, controller.updateRegion);
router.delete('/:id', idValidator, controller.deleteRegion);

module.exports = router;
