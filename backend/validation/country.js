const { body } = require('express-validator');

module.exports = [
  body('name').not().isEmpty().withMessage('Name is mandatory.'),
  body('regionId')
    .isInt()
    .withMessage('Only integers are allowed.')
    .not()
    .isEmpty()
    .withMessage('regionId is mandatory.'),
];
