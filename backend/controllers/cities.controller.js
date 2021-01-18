const Sequelize = require('sequelize');

const { SERVER_ERROR_MSG } = require('../utils/constants');
const City = require('../models/City');
const cityQuery = require('../queries/city');

async function getCities(req, res) {
  try {
    const cities = await City.findAll(cityQuery);

    if (cities.length === 0) {
      return res.status(404).json({ message: 'There are no cities yet.' });
    }

    return res.status(200).json(cities);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: SERVER_ERROR_MSG });
  }
}

async function getOneCity(req, res) {
  const { id } = req.params;

  try {
    const city = await City.findOne({ ...cityQuery, where: { id } });

    if (!city) {
      return res.status(404).json({ message: 'City not found.' });
    }

    return res.status(200).json(city);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: SERVER_ERROR_MSG });
  }
}

async function addCity(req, res) {
  try {
    const newCity = await City.create(req.reqCity);

    if (newCity) {
      return res
        .status(201)
        .json({ message: 'City created successfully.', data: newCity });
    }
  } catch (err) {
    console.error(err);

    if (err instanceof Sequelize.ForeignKeyConstraintError) {
      return res.status(404).json({ message: 'Country not found.' });
    }

    return res.status(500).json({ message: SERVER_ERROR_MSG });
  }
}

async function updateCity(req, res) {
  const { id } = req.params;

  try {
    const city = await City.findOne({ where: { id } });

    if (city) {
      await city.update(req.reqCity);
    } else {
      return res.status(404).json({ message: 'City not found.' });
    }

    return res
      .status(200)
      .json({ message: 'City updated successfully.', data: city });
  } catch (err) {
    console.error(err);

    if (err instanceof Sequelize.ForeignKeyConstraintError) {
      return res.status(404).json({ message: 'Country not found.' });
    }

    return res.status(500).json({ message: SERVER_ERROR_MSG });
  }
}

module.exports = { getCities, getOneCity, addCity, updateCity };
