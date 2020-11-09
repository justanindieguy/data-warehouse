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
  body('roleId').isInt().withMessage('Only integers are allowed.').optional(),
  body('email')
    .isEmail()
    .withMessage('You must enter a valid email address.')
    .not()
    .isEmpty()
    .withMessage('Email is mandatory.'),
  body('password')
    .isLength({ min: 6, max: 15 })
    .withMessage(
      'Password must have a minimum length of 6 characters and a maximum of 15.'
    )
    .not()
    .isEmpty()
    .withMessage('Password is mandatory.'),
];
