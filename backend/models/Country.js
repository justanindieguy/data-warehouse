const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const City = require('./City');

const Country = sequelize.define(
  'Country',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    region_id: {
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

Country.hasMany(City, { foreignKey: 'country_id', sourceKey: 'id' });
City.belongsTo(Country, { foreignKey: 'country_id', sourceKey: 'id' });

module.exports = Country;
