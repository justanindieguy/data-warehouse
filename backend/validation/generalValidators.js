const { param, body } = require('express-validator');

module.exports = {
  requireValidId: param('id', 'Only integers are allowed.').isInt(),
  requireName: body('name')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Name is mandatory.'),
  requireValidEmail: body('email')
    .trim()
    .isEmail()
    .withMessage('You must enter a valid email address.')
    .not()
    .isEmpty()
    .withMessage('Email is mandatory.'),
  requireValidCityId: body('cityId')
    .trim()
    .isInt()
    .withMessage('Only integers are allowed.')
    .not()
    .isEmpty()
    .withMessage('You must provide an ID for a city.'),
  requireValidCompanyId: body('companyId')
    .trim()
    .isInt()
    .withMessage('Only integers are allowed.')
    .not()
    .isEmpty()
    .withMessage('You must provide an ID for a company.'),
  requireValidRegionId: body('regionId')
    .trim()
    .isInt()
    .withMessage('Only integers are allowed.')
    .not()
    .isEmpty()
    .withMessage('You must provide an ID for a region.'),
};
