const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const Country = require('./Country');

const Region = sequelize.define(
  'region',
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

Region.hasMany(Country, { foreignKey: 'regionId', sourceKey: 'id' });
Country.belongsTo(Region, { foreignKey: 'regionId', sourceKey: 'id' });

module.exports = Region;
