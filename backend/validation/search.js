const { query } = require('express-validator');

module.exports = {
  requireValidSearchTerm: query('searchTerm')
    .trim()
    .custom((searchTerm) => {
      if (!searchTerm.includes('%')) {
        throw new Error('El término de búsqueda debe incluir el símbolo %.');
      }

      return true;
    }),
};
