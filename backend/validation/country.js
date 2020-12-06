const { body } = require('express-validator');
const { Op } = require('sequelize');

const Country = require('../models/Country');

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
        nameExists = await Country.findOne({
          where: { name, id: { [Op.ne]: id } },
        });
      } else {
        nameExists = await Country.findOne({ where: { name } });
      }

      if (nameExists) {
        throw new Error('A country with the provided name already exists.');
      }

      return true;
    }),
};
