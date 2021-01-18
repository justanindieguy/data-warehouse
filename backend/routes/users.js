// ********** IMPORTS **********
const express = require('express');

const controller = require('../controllers/users.controller');

const {
  requireValidId,
  requireName,
} = require('../validation/generalValidators');

const { requireLastName } = require('../validation/person');

const {
  requireValidEmail,
  requireValidPassword,
  requirePasswordConfirm,
  checkRoleId,
} = require('../validation/user');

const { handleErrors, deleteEntity } = require('../middlewares/middlewares');
const User = require('../models/User');

const router = express.Router();

// ***** HELPER FUNCTION ******
function parseBody(req, res, next) {
  const { name, lastName, email } = req.body;
  req.reqUser = { name, lastName, email };
  next();
}

// ********** ROUTES **********
router.get('/', controller.getUsers);

router.get('/:id', [requireValidId], handleErrors, controller.getOneUser);

router.post(
  '/',
  [
    requireName,
    requireLastName,
    requireValidEmail,
    checkRoleId,
    requireValidPassword,
    requirePasswordConfirm,
  ],
  handleErrors,
  parseBody,
  controller.registerUser
);

router.put(
  '/:id',
  [
    requireValidId,
    requireName,
    requireLastName,
    requireValidEmail,
    checkRoleId,
    requireValidPassword,
    requirePasswordConfirm,
  ],
  handleErrors,
  parseBody,
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
