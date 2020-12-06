const { body } = require('express-validator');

module.exports = {
  requireAddress: body('address')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Address is mandatory.'),
  requireValidPhone: body('phone')
    .trim()
    .isInt()
    .withMessage('Only integers are allowed.')
    .not()
    .isEmpty()
    .withMessage('Phone is mandatory.'),
  requireValidCityId: body('cityId')
    .trim()
    .isInt()
    .withMessage('Only integers are allowed.')
    .not()
    .isEmpty()
    .withMessage('You must provide an ID for a city.'),
};
