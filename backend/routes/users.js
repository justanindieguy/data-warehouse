const express = require('express');
const controller = require('../controllers/users.controller');

const router = express.Router();

router.get('/', controller.getUsers);
router.get('/:id', controller.getOneUser);
router.post('/', controller.registerUser);
router.put('/:id', controller.updateUser);
router.delete('/:id', controller.deleteUser);
router.post('/login', controller.login);

module.exports = router;
