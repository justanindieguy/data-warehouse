const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const { validationResult } = require('express-validator');
const { SERVER_ERROR_MSG } = require('../utils/constants');
const sequelize = require('../database/database');
const City = require('../models/City');
const Country = require('../models/Country');
const Region = require('../models/Region');

const cityQuery = {
  attributes: [
    'id',
    'name',
    [sequelize.col('Country.name'), 'country'],
    [sequelize.col('Country.Region.name'), 'region'],
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
};

async function checkConflicts(res, name, countryId, id) {
  let nameExists;

  if (id) {
    nameExists = await City.findOne({
      where: { [Op.and]: [{ name }, { countryId }], id: { [Op.ne]: id } },
    });
  } else {
    nameExists = await City.findOne({
      where: { [Op.and]: [{ name }, { countryId }] },
    });
  }

  if (nameExists) {
    res.status(409).json({
      message: "There's already a city in this country with this name.",
    });
    return true;
  }

  return false;
}

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
  const errors = validationResult(req);
  const { id } = req.params;

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

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
  const errors = validationResult(req);
  const { name, countryId } = req.body;

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    if (await checkConflicts(res, name, countryId)) {
      return;
    }

    const newCity = await City.create({ name, countryId });

    if (newCity) {
      return res
        .status(200)
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
  const errors = validationResult(req);
  const { id } = req.params;
  const { name, countryId } = req.body;

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    if (await checkConflicts(res, name, countryId, id)) {
      return;
    }

    const city = await City.findOne({ where: { id } });

    if (city) {
      await city.update({ name, countryId });
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

async function deleteCity(req, res) {
  const errors = validationResult(req);
  const { id } = req.params;

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const deleteRowCount = await City.destroy({ where: { id } });

    if (deleteRowCount === 0) {
      return res.status(404).json({ message: 'City not found.' });
    }

    return res.status(200).json({
      message: 'City deleted successfully.',
      deleteRows: deleteRowCount,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: SERVER_ERROR_MSG });
  }
}

module.exports = { getCities, getOneCity, addCity, updateCity, deleteCity };
