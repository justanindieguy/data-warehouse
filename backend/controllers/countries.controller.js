const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const { validationResult } = require('express-validator');
const { SERVER_ERROR_MSG } = require('../utils/constants');
const sequelize = require('../database/database');
const Country = require('../models/Country');
const Region = require('../models/Region');

const countryQuery = {
  attributes: ['id', 'name', [sequelize.col('Region.name'), 'region']],
  include: [
    {
      model: Region,
      required: true,
      attributes: [],
    },
  ],
};

async function checkConflicts(res, name, id) {
  let nameExists;

  if (id) {
    nameExists = await Country.findOne({
      where: { name, id: { [Op.ne]: id } },
    });
  } else {
    nameExists = await Country.findOne({ where: { name } });
  }

  if (nameExists) {
    res
      .status(409)
      .json({ message: 'A country with the provided name already exists.' });
    return true;
  }

  return false;
}

async function getCountries(req, res) {
  try {
    const countries = await Country.findAll(countryQuery);

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
  const errors = validationResult(req);
  const { id } = req.params;

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

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
  const errors = validationResult(req);
  const { name, regionId } = req.body;

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    if (await checkConflicts(res, name)) {
      return;
    }

    const newCountry = await Country.create({ name, regionId });

    if (newCountry) {
      return res
        .status(200)
        .json({ message: 'Country created successfully.', data: newCountry });
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
  const errors = validationResult(req);
  const { id } = req.params;
  const { name, regionId } = req.body;

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    if (await checkConflicts(res, name, id)) {
      return;
    }

    const country = await Country.findOne({ where: { id } });

    if (country) {
      await country.update({ name, regionId });
    } else {
      return res.status(404).json({ message: 'Country not found.' });
    }

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

async function deleteCountry(req, res) {
  const errors = validationResult(req);
  const { id } = req.params;

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const deleteRowCount = await Country.destroy({ where: { id } });

    if (deleteRowCount === 0) {
      return res.status(404).json({ message: 'Country not found.' });
    }

    return res.status(200).json({
      message: 'Country deleted successfully',
      deleteRows: deleteRowCount,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: SERVER_ERROR_MSG });
  }
}

module.exports = {
  getCountries,
  getOneCountry,
  addCountry,
  updateCountry,
  deleteCountry,
};
