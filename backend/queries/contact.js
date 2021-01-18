const Sequelize = require('sequelize');

const Company = require('../models/Company');
const City = require('../models/City');
const Country = require('../models/Country');
const Region = require('../models/Region');

const contactQuery = {
  attributes: [
    'id',
    'name',
    'lastName',
    'email',
    'position',
    'interest',
    [Sequelize.col('company.name'), 'company'],
    [Sequelize.col('city.name'), 'city'],
    [Sequelize.col('city.country.name'), 'country'],
    [Sequelize.col('city.country.region.name'), 'region'],
  ],
  include: [
    {
      model: Company,
      required: true,
      attributes: [],
    },
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

module.exports = contactQuery;
