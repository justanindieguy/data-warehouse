const { body } = require('express-validator');
const { Op } = require('sequelize');

const User = require('../models/User');

module.exports = {
  requireValidEmail: body('email')
    .trim()
    .isEmail()
    .withMessage('Debes ingresar un email válido.')
    .not()
    .isEmpty()
    .withMessage('El email es obligatorio.')
    .custom(async (email, { req }) => {
      const { id } = req.params;
      let emailExists;

      if (id) {
        emailExists = await User.findOne({
          where: { email, id: { [Op.ne]: id } },
        });
      } else {
        emailExists = await User.findOne({ where: { email } });
      }

      if (emailExists) {
        throw new Error('Ya existe un usuario con el email proporcionado.');
      }

      return true;
    }),
  requireValidPassword: body('password')
    .trim()
    .isLength({ min: 6, max: 15 })
    .withMessage(
      'La contraseña debe tener una longitud mínima de 6 caracteres y máxima de 15.'
    )
    .not()
    .isEmpty()
    .withMessage('La contraseña es obligatoria.'),
  requirePasswordConfirm: body('passwordConfirm')
    .trim()
    .isLength({ min: 6, max: 15 })
    .withMessage(
      'La contraseña debe tener una longitud mínima de 6 caracteres y máxima de 15.'
    )
    .not()
    .isEmpty()
    .withMessage('La confirmación de la contraseña es obligatoria.')
    .custom((passwordConfirm, { req }) => {
      const { password } = req.body;

      if (passwordConfirm !== password) {
        throw new Error('Las contraseñas debes coincidir.');
      }

      return true;
    }),
  checkRoleId: body('roleId')
    .trim()
    .isInt()
    .withMessage('Solo se permiten números enteros.')
    .optional(),
};
