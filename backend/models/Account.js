const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const Account = sequelize.define(
  'account',
  {
    channelId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    contactId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    accountValue: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Account;
