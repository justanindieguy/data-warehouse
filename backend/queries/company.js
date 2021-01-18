const Sequelize = require('sequelize');
const City = require('../models/City');
const Country = require('../models/Country');
const Region = require('../models/Region');

const companyQuery = {
  attributes: [
    'id',
    'name',
    'address',
    'email',
    'phone',
    [Sequelize.col('city.name'), 'city'],
    [Sequelize.col('city.country.name'), 'country'],
    [Sequelize.col('city.country.region.name'), 'region'],
  ],
  include: [
    {
      model: City,
      required: true,
      attributes: [],
      include: {
        model: Country,
        required: true,
        attributes: [],
        include: {
          model: Region,
          required: true,
          attributes: [],
        },
      },
    },
  ],
  raw: true,
};

module.exports = companyQuery;
