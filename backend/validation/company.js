const { body } = require('express-validator');
const { Op } = require('sequelize');

const Company = require('../models/Company');

module.exports = {
  requireName: body('name')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Name is mandatory.')
    .custom(async (name, { req }) => {
      const { id } = req.params;
      let nameExists;

      if (id) {
        nameExists = await Company.findOne({
          where: { name, id: { [Op.ne]: id } },
        });
      } else {
        nameExists = await Company.findOne({ where: { name } });
      }

      if (nameExists) {
        throw new Error('A company with the provided name already exists.');
      }

      return true;
    }),
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
        emailExists = await Company.findOne({
          where: { email, id: { [Op.ne]: id } },
        });
      } else {
        emailExists = await Company.findOne({ where: { email } });
      }

      if (emailExists) {
        throw new Error('A company with the provided email already exists.');
      }

      return true;
    }),
  requireValidPhone: body('phone')
    .trim()
    .isInt()
    .withMessage('Only integers are allowed.')
    .not()
    .isEmpty()
    .withMessage('Phone is mandatory.')
    .custom(async (phone, { req }) => {
      const { id } = req.params;
      let phoneExists;

      if (id) {
        phoneExists = await Company.findOne({
          where: { phone, id: { [Op.ne]: id } },
        });
      } else {
        phoneExists = await Company.findOne({ where: { phone } });
      }

      if (phoneExists) {
        throw new Error(
          'A company with the provided phone number already exists.'
        );
      }

      return true;
    }),
  requireAddress: body('address')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Address is mandatory.'),
  requireValidCityId: body('cityId')
    .trim()
    .isInt()
    .withMessage('Only integers are allowed.')
    .not()
    .isEmpty()
    .withMessage('You must provide an ID for a city.'),
};
