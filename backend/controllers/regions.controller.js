const { SERVER_ERROR_MSG } = require('../utils/constants');

const sequelize = require('../database/database');
const Region = require('../models/Region');
const regionQuery = require('../queries/region');

async function getRegions(req, res) {
  const sortBy = 'name';
  const ascending = req.query.ascending || 'true';
  const sortString = ascending === 'true' ? `${sortBy} ASC` : `${sortBy} DESC`;

  try {
    const regions = await Region.findAll({
      ...regionQuery,
      order: sequelize.literal(sortString),
    });

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
  const { id } = req.params;

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
  try {
    const newRegion = await Region.create(req.reqRegion);

    if (newRegion) {
      return res
        .status(201)
        .json({ message: 'Region created successfully.', data: newRegion });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: SERVER_ERROR_MSG });
  }
}

async function updateRegion(req, res) {
  const { id } = req.params;

  try {
    const region = await Region.findOne({ where: { id } });

    if (region) {
      await region.update(req.reqRegion);
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

module.exports = {
  getRegions,
  getOneRegion,
  addRegion,
  updateRegion,
};
