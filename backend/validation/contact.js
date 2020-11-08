const { body } = require('express-validator');

module.exports = [
  body('name').not().isEmpty().withMessage('Name is mandatory.'),
  body('lastNameOne')
    .not()
    .isEmpty()
    .withMessage('1st last name is mandatory.'),
  body('lastNameTwo')
    .not()
    .isEmpty()
    .withMessage('2nd last name is mandatory.'),
  body('email')
    .isEmail()
    .withMessage('You must enter a valid email address.')
    .not()
    .isEmpty()
    .withMessage('Email is mandatory.'),
  body('companyId')
    .isInt()
    .withMessage('Only integers are allowed.')
    .not()
    .isEmpty()
    .withMessage('Company ID is mandatory.'),
  body('cityId')
    .isInt()
    .withMessage('Only integers are allowed.')
    .not()
    .isEmpty()
    .withMessage('City ID is mandatory.'),
  body('position').not().isEmpty().withMessage('Position is mandatory.'),
  body('interest').isInt().withMessage('Only integers are allowed.').optional(),
];
