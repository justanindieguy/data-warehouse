const express = require('express');

const controller = require('../controllers/companies.controller');
const {
  requireValidId,
  requireName,
  requireValidEmail,
  requireValidCityId,
} = require('../validation/generalValidators');
const { requireAddress, requireValidPhone } = require('../validation/company');
const { handleErrors } = require('../middlewares/middlewares');

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

router.delete('/:id', [requireValidId], handleErrors, controller.deleteCompany);

module.exports = router;
