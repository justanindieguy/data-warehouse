const Sequelize = require('sequelize');

const Channel = require('../models/Channel');
const Contact = require('../models/Contact');

const accountQuery = {
  attributes: [
    'channelId',
    'contactId',
    'accountValue',
    [Sequelize.col('channel.name'), 'channelName'],
    [
      Sequelize.fn(
        'CONCAT',
        Sequelize.col('contact.name'),
        ' ',
        Sequelize.col('contact.lastName')
      ),
      'contactName',
    ],
  ],
  include: [
    {
      model: Channel,
      required: true,
      attributes: [],
    },
    {
      model: Contact,
      required: true,
      attributes: [],
    },
  ],
  raw: true,
};

module.exports = accountQuery;
