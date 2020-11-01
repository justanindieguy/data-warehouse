const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const Account = require('./Account');

const Contact = sequelize.define(
  'Contact',
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
    last_name_one: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name_two: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    city_id: {
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

Contact.hasMany(Account, { foreignKey: 'contact_id', sourceKey: 'id' });
Account.belongsTo(Contact, { foreignKey: 'contact_id', sourceKey: 'id' });

module.exports = Contact;
