const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const Account = require('./Account');

const Channel = sequelize.define(
  'Channel',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

Channel.hasMany(Account, { foreignKey: 'channelId', sourceKey: 'id' });
Account.belongsTo(Channel, { foreignKey: 'channelId', sourceKey: 'id' });

module.exports = Channel;
