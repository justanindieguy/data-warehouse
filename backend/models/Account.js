const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const Account = sequelize.define(
  'Account',
  {
    channelId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    contactId: {
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
