const express = require('express');
const controller = require('../controllers/cities.controller');

const router = express.Router();

router.get('/', controller.getCities);
router.get('/:id', controller.getOneCity);
router.post('/', controller.addCity);
router.put('/:id', controller.updateCity);
router.delete('/:id', controller.deleteCity);

module.exports = router;
