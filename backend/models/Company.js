const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const Contact = require('./Contact');

const Company = sequelize.define(
  'Company',
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
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

Company.hasMany(Contact, { foreignKey: 'company_id', sourceKey: 'id' });
Contact.belongsTo(Company, { foreignKey: 'company_id', sourceKey: 'id' });

module.exports = Company;
