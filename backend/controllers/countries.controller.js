const Sequelize = require('sequelize');

const { SERVER_ERROR_MSG } = require('../utils/constants');
const sequelize = require('../database/database');
const Country = require('../models/Country');
const countryQuery = require('../queries/country');

async function getCountries(req, res) {
  let countries;
  const sortBy = 'name';
  const ascending = req.query.ascending || 'true';
  const sortString = ascending === 'true' ? `${sortBy} ASC` : `${sortBy} DESC`;
  const query = { ...countryQuery, order: sequelize.literal(sortString) };
  const { regionId } = req.query;

  try {
    if (!regionId) {
      countries = await Country.findAll(query);
    } else {
      countries = await Country.findAll({ ...query, where: { regionId } });
    }

    if (countries.length === 0) {
      return res.status(404).json({ message: 'There are no countries yet.' });
    }

    return res.status(200).json(countries);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: SERVER_ERROR_MSG });
  }
}

async function getOneCountry(req, res) {
  const { id } = req.params;

  try {
    const country = await Country.findOne({ ...countryQuery, where: { id } });

    if (!country) {
      return res.status(404).json({ message: 'Country not found.' });
    }

    return res.status(200).json(country);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: SERVER_ERROR_MSG });
  }
}

async function addCountry(req, res) {
  try {
    const newCountry = await Country.create(req.reqCountry);

    if (newCountry) {
      return res.status(201).json({
        message: 'Country created successfully.',
        data: {
          ...newCountry.dataValues,
          type: 'country',
          regionId: parseInt(newCountry.dataValues.regionId, 10),
        },
      });
    }
  } catch (err) {
    console.error(err);

    if (err instanceof Sequelize.ForeignKeyConstraintError) {
      return res.status(404).json({ message: 'Region not found.' });
    }

    return res.status(500).json({ message: SERVER_ERROR_MSG });
  }
}

async function updateCountry(req, res) {
  let country;
  const { id } = req.params;

  try {
    country = await Country.findOne({ where: { id } });

    if (country) {
      await country.update(req.reqCountry);
    } else {
      return res.status(404).json({ message: 'Country not found.' });
    }

    country = await Country.findOne({ ...countryQuery, where: { id } });

    return res
      .status(200)
      .json({ message: 'Country updated successfully', data: country });
  } catch (err) {
    console.error(err);

    if (err instanceof Sequelize.ForeignKeyConstraintError) {
      return res.status(404).json({ message: 'Region not found.' });
    }

    return res.status(500).json({ message: SERVER_ERROR_MSG });
  }
}

module.exports = {
  getCountries,
  getOneCountry,
  addCountry,
  updateCountry,
};
