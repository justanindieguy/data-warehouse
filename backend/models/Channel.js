const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const Account = require('./Account');

const Channel = sequelize.define(
  'Channel',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
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

Channel.hasMany(Account, { foreignKey: 'channel_id', sourceKey: 'id' });
Account.belongsTo(Channel, { foreignKey: 'channel_id', sourceKey: 'id' });

module.exports = Channel;
