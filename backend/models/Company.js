const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const Contact = require('./Contact');

const Company = sequelize.define(
  'company',
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
    cityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

Company.hasMany(Contact, { foreignKey: 'companyId', sourceKey: 'id' });
Contact.belongsTo(Company, { foreignKey: 'companyId', sourceKey: 'id' });

module.exports = Company;
