const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const Company = require('./Company');

const City = sequelize.define(
  'City',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    countryId: {
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

City.hasMany(Company, { foreignKey: 'cityId', sourceKey: 'id' });
Company.belongsTo(City, { foreignKey: 'cityId', sourceKey: 'id' });

module.exports = City;
