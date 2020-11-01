const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const Account = sequelize.define(
  'Account',
  {
    channel_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    contact_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    account: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Account;
