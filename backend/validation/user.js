const { body } = require('express-validator');
const { Op } = require('sequelize');

const User = require('../models/User');

module.exports = {
  requireValidEmail: body('email')
    .trim()
    .isEmail()
    .withMessage('You must enter a valid email.')
    .not()
    .isEmpty()
    .withMessage('Email is mandatory')
    .custom(async (email, { req }) => {
      const { id } = req.params;
      let emailExists;

      if (id) {
        emailExists = await User.findOne({
          where: { email, id: { [Op.ne]: id } },
        });
      } else {
        emailExists = await User.findOne({ where: { email } });
      }

      if (emailExists) {
        throw new Error('A user with the provided email already exists.');
      }

      return true;
    }),
  requireValidPassword: body('password')
    .trim()
    .isLength({ min: 6, max: 15 })
    .withMessage(
      'Password must have a minimum lenght of 6 characters and a maximum of 15.'
    )
    .not()
    .isEmpty()
    .withMessage('Password is mandatory.'),
  checkRoleId: body('roleId')
    .trim()
    .isInt()
    .withMessage('Only integers are allowed.')
    .optional(),
};
