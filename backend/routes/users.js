const express = require('express');
const controller = require('../controllers/users.controller');
const idValidator = require('../validation/routeId');
const validateUser = require('../validation/user');

const router = express.Router();

router.get('/', controller.getUsers);
router.get('/:id', idValidator, controller.getOneUser);
router.post('/', validateUser, controller.registerUser);
router.put('/:id', idValidator, validateUser, controller.updateUser);
router.delete('/:id', idValidator, controller.deleteUser);
router.post('/login', controller.login);

module.exports = router;
