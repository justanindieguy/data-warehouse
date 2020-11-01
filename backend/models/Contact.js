const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const Account = require('./Account');

const Contact = sequelize.define(
  'Contact',
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
    lastNameOne: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastNameTwo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    interest: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

Contact.hasMany(Account, { foreignKey: 'contactId', sourceKey: 'id' });
Account.belongsTo(Contact, { foreignKey: 'contactId', sourceKey: 'id' });

module.exports = Contact;
