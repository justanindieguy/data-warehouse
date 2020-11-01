const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const User = require('./User');

const Role = sequelize.define(
  'Role',
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

Role.hasMany(User, { foreignKey: 'roleId', sourceKey: 'id' });
User.belongsTo(Role, { foreignKey: 'roleId', sourceKey: 'id' });

module.exports = Role;
