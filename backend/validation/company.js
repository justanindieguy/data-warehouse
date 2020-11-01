const { body } = require('express-validator');

module.exports = [
  body('name').not().isEmpty().withMessage('Name is mandatory.'),
  body('address').not().isEmpty().withMessage('Address is mandatory.'),
  body('email')
    .isEmail()
    .withMessage('You need to enter a valid email address.')
    .not()
    .isEmpty()
    .withMessage('Email is mandatory.'),
  body('phone')
    .isInt()
    .withMessage('Only integers are allowed.')
    .not()
    .isEmpty()
    .withMessage('Phone is mandatory.'),
  body('cityId')
    .isInt()
    .withMessage('Only integers are allowed.')
    .not()
    .isEmpty()
    .withMessage('You must provide an ID for a city.'),
];
