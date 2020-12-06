const { body } = require('express-validator');

module.exports = {
  requireLastNameOne: body('lastNameOne')
    .trim()
    .not()
    .isEmpty()
    .withMessage('1st last name is mandatory.'),
  checkLastNameTwo: body('lastNameTwo').trim().optional(),
};
