const { body } = require('express-validator');

module.exports = {
  requireLastName: body('lastName')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Last name is mandatory.'),
};
