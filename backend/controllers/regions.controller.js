const { Op } = require('sequelize');
const { validationResult } = require('express-validator');
const { SERVER_ERROR_MSG } = require('../utils/constants');
const Region = require('../models/Region');

async function checkConflicts(res, name, id) {
  let nameExists;

  if (id) {
    nameExists = await Region.findOne({ where: { name, id: { [Op.ne]: id } } });
  } else {
    nameExists = await Region.findOne({ where: { name } });
  }

  if (nameExists) {
    res
      .status(409)
      .json({ message: 'A region with the provided name already exists.' });
    return true;
  }

  return false;
}

async function getRegions(req, res) {
  try {
    const regions = await Region.findAll();

    if (regions.length === 0) {
      return res.status(404).json({ message: 'There are no regions yet.' });
    }

    return res.status(200).json(regions);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: 'Something went wrong. Try again later.' });
  }
}

async function getOneRegion(req, res) {
  const errors = validationResult(req);
  const { id } = req.params;

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const region = await Region.findOne({ where: { id } });

    if (!region) {
      return res.status(404).json({ message: 'Region not found.' });
    }

    return res.status(200).json(region);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: SERVER_ERROR_MSG });
  }
}

async function addRegion(req, res) {
  const errors = validationResult(req);
  const { name } = req.body;

  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  try {
    if (await checkConflicts(res, name)) {
      return;
    }

    const newRegion = await Region.create({ name });

    if (newRegion) {
      return res
        .status(200)
        .json({ message: 'Region created successfully.', data: newRegion });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: SERVER_ERROR_MSG });
  }
}

async function updateRegion(req, res) {
  const errors = validationResult(req);
  const { id } = req.params;
  const { name } = req.body;

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    if (await checkConflicts(res, name, id)) {
      return;
    }

    const region = await Region.findOne({ where: { id } });

    if (region) {
      await region.update({ name });
    } else {
      return res.status(404).json({ message: 'Region not found.' });
    }

    return res
      .status(200)
      .json({ message: 'Region updated successfully.', data: region });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: SERVER_ERROR_MSG });
  }
}

async function deleteRegion(req, res) {
  const errors = validationResult(req);
  const { id } = req.params;

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const deleteRowCount = await Region.destroy({ where: { id } });

    if (deleteRowCount === 0) {
      return res.status(404).json({ message: 'Region not found.' });
    }

    return res.status(200).json({
      message: 'Region deleted successfully.',
      deletedRows: deleteRowCount,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: SERVER_ERROR_MSG });
  }
}

module.exports = {
  getRegions,
  getOneRegion,
  addRegion,
  updateRegion,
  deleteRegion,
};
