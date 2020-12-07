const express = require('express');

const createUserTemplate = require('../views/admin/users/createUser');

const router = express.Router();

router.get('/login', (req, res) => {
  res.sendFile('login.html', { root: 'views' });
});

router.get('/contacts', (req, res) => {
  res.sendFile('contacts.html', { root: 'views' });
});

router.get('/users', (req, res) => {
  res.send(createUserTemplate());
});

module.exports = router;
