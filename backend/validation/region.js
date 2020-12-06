const { body } = require('express-validator');
const { Op } = require('sequelize');

const Region = require('../models/Region');

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
        nameExists = await Region.findOne({
          where: { name, id: { [Op.ne]: id } },
        });
      } else {
        nameExists = await Region.findOne({ where: { name } });
      }

      if (nameExists) {
        throw new Error('A region with the provided name already exists.');
      }

      return true;
    }),
};
