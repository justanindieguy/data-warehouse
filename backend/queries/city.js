const Sequelize = require('sequelize');
const Country = require('../models/Country');
const Region = require('../models/Region');

const cityQuery = {
  attributes: [
    'id',
    'name',
    [Sequelize.col('country.name'), 'country'],
    [Sequelize.col('country.region.name'), 'region'],
  ],
  include: [
    {
      model: Country,
      required: true,
      attributes: [],
      include: [
        {
          model: Region,
          required: true,
          attributes: [],
        },
      ],
    },
  ],
  raw: true,
};

module.exports = cityQuery;
