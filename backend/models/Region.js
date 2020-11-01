const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const Country = require('./Country');

const Region = sequelize.define(
  'Region',
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

Region.hasMany(Country, { foreignKey: 'region_id', sourceKey: 'id' });
Country.belongsTo(Region, { foreignKey: 'region_id', sourceKey: 'id' });

module.exports = Region;
