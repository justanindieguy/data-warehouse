const { param } = require('express-validator');

module.exports = [param('id', 'Only integers are allowed.').isInt()];
