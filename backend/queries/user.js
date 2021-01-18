const Sequelize = require('sequelize');
const Role = require('../models/Role');

const userQuery = {
  attributes: [
    'id',
    [
      Sequelize.fn(
        'CONCAT',
        Sequelize.col('user.name'),
        ' ',
        Sequelize.col('user.lastName')
      ),
      'name',
    ],
    [Sequelize.col('role.name'), 'loggedInAs'],
    'email',
  ],
  include: {
    model: Role,
    require: true,
    attributes: [],
  },
  raw: true,
};

module.exports = userQuery;
