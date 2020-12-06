const { SERVER_ERROR_MSG } = require('../utils/constants');
const Region = require('../models/Region');

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
  const { name } = req.body;

  try {
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
  const { id } = req.params;
  const { name } = req.body;

  try {
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

module.exports = {
  getRegions,
  getOneRegion,
  addRegion,
  updateRegion,
};
