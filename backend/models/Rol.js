const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const User = require('./User');

const Rol = sequelize.define(
  'Rol',
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

Rol.hasMany(User, { foreignKey: 'rol_id', sourceKey: 'id' });
User.belongsTo(Rol, { foreignKey: 'rol_id', sourceKey: 'id' });

module.exports = Rol;
