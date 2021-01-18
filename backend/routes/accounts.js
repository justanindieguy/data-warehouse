const express = require('express');

const controller = require('../controllers/accounts.controller');
const { requireValidId } = require('../validation/generalValidators');
const { handleErrors } = require('../middlewares/middlewares');

const {
  requireValidChannelId,
  requireValidContactId,
  requireValidAccount,
} = require('../validation/account');

const router = express.Router();

function parseBody(req, res, next) {
  const { channelId, contactId, accountValue } = req.body;
  req.reqAccount = { channelId, contactId, accountValue };
  next();
}

router.get('/:id', [requireValidId], handleErrors, controller.getUserAccounts);

router.post(
  '/',
  [requireValidChannelId, requireValidContactId, requireValidAccount],
  handleErrors,
  parseBody,
  controller.addAccount
);

module.exports = router;
