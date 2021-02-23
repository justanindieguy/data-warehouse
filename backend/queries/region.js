const Sequelize = require('sequelize');

const regionQuery = {
  attributes: ['id', 'name', [Sequelize.fn('CONCAT', 'region'), 'type']],
};

module.exports = regionQuery;
