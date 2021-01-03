const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const City = require('./City');

const Country = sequelize.define(
  'country',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    regionId: {
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

Country.hasMany(City, { foreignKey: 'countryId', sourceKey: 'id' });
City.belongsTo(Country, { foreignKey: 'countryId', sourceKey: 'id' });

module.exports = Country;
