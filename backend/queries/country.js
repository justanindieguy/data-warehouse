const Sequelize = require('sequelize');
const Region = require('../models/Region');

const countryQuery = {
  attributes: [
    'id',
    'name',
    [Sequelize.col('region.name'), 'region'],
    [Sequelize.fn('CONCAT', 'country'), 'type'],
  ],
  include: {
    model: Region,
    required: true,
    attributes: [],
  },
  raw: true,
};

module.exports = countryQuery;
