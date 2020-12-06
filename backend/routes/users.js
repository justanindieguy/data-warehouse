const express = require('express');

const controller = require('../controllers/users.controller');
const {
  requireValidId,
  requireName,
  requireValidEmail,
} = require('../validation/generalValidators');
const {
  requireLastNameOne,
  checkLastNameTwo,
} = require('../validation/person');
const { checkRoleId, requireValidPassword } = require('../validation/user');
const { handleErrors, deleteEntity } = require('../middlewares/middlewares');
const User = require('../models/User');

const router = express.Router();

router.get('/', controller.getUsers);

router.get('/:id', [requireValidId], handleErrors, controller.getOneUser);

router.post(
  '/',
  [
    requireName,
    requireLastNameOne,
    checkLastNameTwo,
    requireValidEmail,
    checkRoleId,
    requireValidPassword,
  ],
  handleErrors,
  controller.registerUser
);

router.put(
  '/:id',
  [
    requireValidId,
    requireName,
    requireLastNameOne,
    checkLastNameTwo,
    requireValidEmail,
    checkRoleId,
    requireValidPassword,
  ],
  handleErrors,
  controller.updateUser
);

router.delete(
  '/:id',
  [requireValidId],
  handleErrors,
  deleteEntity(User, 'User')
);

router.post('/login', [requireValidEmail], handleErrors, controller.login);

module.exports = router;
