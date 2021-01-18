const { body } = require('express-validator');

const Account = require('../models/Account');

module.exports = {
  requireValidContactId: body('contactId')
    .trim()
    .isInt()
    .withMessage('Only integers are allowed.')
    .not()
    .isEmpty()
    .withMessage('Contact ID is mandatory.'),
  requireValidChannelId: body('channelId')
    .trim()
    .isInt()
    .withMessage('Only integers are allowed.')
    .not()
    .isEmpty()
    .withMessage('Channel ID is mandatory.'),
  requireValidAccount: body('accountValue')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Account value is mandatory.')
    .custom(async (accountValue, { req }) => {
      const { contactId, channelId } = req.body;
      const accountExists = await Account.findOne({
        where: { channelId, contactId, accountValue },
      });

      if (accountExists) {
        throw new Error(
          'An account with the provided value already exists for this contact.'
        );
      }

      return true;
    }),
};
