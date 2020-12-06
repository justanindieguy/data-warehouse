const { body } = require('express-validator');
const { Op } = require('sequelize');

const Contact = require('../models/Contact');

module.exports = {
  requireValidEmail: body('email')
    .trim()
    .isEmail()
    .withMessage('You must enter a valid email.')
    .not()
    .isEmpty()
    .withMessage('Email is mandatory.')
    .custom(async (email, { req }) => {
      const { id } = req.params;
      let emailExists;

      if (id) {
        emailExists = await Contact.findOne({
          where: { email, id: { [Op.ne]: id } },
        });
      } else {
        emailExists = await Contact.findOne({ where: { email } });
      }

      if (emailExists) {
        throw new Error('A contact with the provided email already exists.');
      }

      return true;
    }),
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
