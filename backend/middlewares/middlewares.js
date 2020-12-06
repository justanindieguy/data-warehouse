const { validationResult } = require('express-validator');
const { SERVER_ERROR_MSG } = require('../utils/constants');

module.exports = {
  handleErrors(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  },
  deleteEntity(Entity, entityName) {
    return async (req, res) => {
      const { id } = req.params;

      try {
        const deleteRowCount = await Entity.destroy({ where: { id } });

        if (deleteRowCount === 0) {
          return res.status(404).json({ message: `${entityName} not found.` });
        }

        return res.status(200).json({
          message: `${entityName} deleted successfully.`,
          deletedRows: deleteRowCount,
        });
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: SERVER_ERROR_MSG });
      }
    };
  },
};
