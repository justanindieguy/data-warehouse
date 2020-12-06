const express = require('express');

const controller = require('../controllers/companies.controller');
const {
  requireValidId,
  requireValidCityId,
} = require('../validation/generalValidators');
const {
  requireName,
  requireValidEmail,
  requireValidPhone,
  requireAddress,
} = require('../validation/company');
const { handleErrors, deleteEntity } = require('../middlewares/middlewares');
const Company = require('../models/Company');

const router = express.Router();

router.get('/', controller.getCompanies);

router.get('/:id', [requireValidId], handleErrors, controller.getOneCompany);

router.post(
  '/',
  [
    requireName,
    requireAddress,
    requireValidEmail,
    requireValidPhone,
    requireValidCityId,
  ],
  handleErrors,
  controller.addCompany
);

router.put(
  '/:id',
  [
    requireValidId,
    requireName,
    requireAddress,
    requireValidEmail,
    requireValidPhone,
    requireValidCityId,
  ],
  handleErrors,
  controller.updateCompany
);

router.delete(
  '/:id',
  [requireValidId],
  handleErrors,
  deleteEntity(Company, 'Company')
);

module.exports = router;
