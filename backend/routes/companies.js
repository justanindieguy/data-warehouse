const express = require('express');
const controller = require('../controllers/companies.controller');
const idValidator = require('../validation/routeId');
const validateCompany = require('../validation/company');

const router = express.Router();

router.get('/', controller.getCompanies);
router.get('/:id', idValidator, controller.getOneCompany);
router.post('/', validateCompany, controller.addCompany);
router.put('/:id', idValidator, validateCompany, controller.updateCompany);
router.delete('/:id', idValidator, controller.deleteCompany);

module.exports = router;
