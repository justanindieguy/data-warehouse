const { body } = require('express-validator');

module.exports = {
  checkRoleId: body('roleId')
    .trim()
    .isInt()
    .withMessage('Only integers are allowed.')
    .optional(),
  requireValidPassword: body('password')
    .trim()
    .isLength({ min: 6, max: 15 })
    .withMessage(
      'Password must have a minimum lenght of 6 characters and a maximum of 15.'
    )
    .not()
    .isEmpty()
    .withMessage('Password is mandatory.'),
};
