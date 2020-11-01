const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const Company = require('./Company');

const City = sequelize.define(
  'City',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    country_id: {
      type: DataTypes.INTEGER,
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

City.hasMany(Company, { foreignKey: 'city_id', sourceKey: 'id' });
Company.belongsTo(City, { foreignKey: 'city_id', sourceKey: 'id' });

module.exports = City;
