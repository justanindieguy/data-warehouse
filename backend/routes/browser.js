const express = require('express');

const router = express.Router();

router.get('/login', (req, res) => {
  res.sendFile('login.html', { root: 'views' });
});

router.get('/contacts', (req, res) => {
  res.sendFile('contacts.html', { root: 'views' });
});

module.exports = router;
