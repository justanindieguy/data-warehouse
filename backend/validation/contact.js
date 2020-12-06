const { body } = require('express-validator');

module.exports = {
  requirePosition: body('position')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Position is mandatory.'),
  requireValidInterest: body('interest')
    .trim()
    .isInt()
    .withMessage('Only integers are allowed.')
    .optional(),
};
