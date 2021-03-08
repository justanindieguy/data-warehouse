const { SERVER_ERROR_MSG } = require('../utils/constants');
const sequelize = require('../database/database');
const Channel = require('../models/Channel');

async function getChannels(req, res) {
  const sortBy = 'name';
  const ascending = req.query.ascending || 'true';
  const sortString = ascending === 'true' ? `${sortBy} ASC` : `${sortBy} DESC`;

  try {
    const channels = await Channel.findAll({
      order: sequelize.literal(sortString),
    });

    if (channels.length === 0) {
      return res.status(404).json({ message: 'There are no channels yet.' });
    }

    return res.status(200).json(channels);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: SERVER_ERROR_MSG });
  }
}

module.exports = { getChannels };
