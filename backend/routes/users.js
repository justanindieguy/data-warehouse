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

const router = express.Router();

router.get('/', controller.getUsers);

router.get('/:id', [requireValidId], controller.getOneUser);

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
  controller.updateUser
);

router.delete('/:id', [requireValidId], controller.deleteUser);

router.post('/login', controller.login);

module.exports = router;
