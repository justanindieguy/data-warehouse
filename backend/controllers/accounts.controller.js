const Sequelize = require('sequelize');

const { SERVER_ERROR_MSG } = require('../utils/constants');
const accountQuery = require('../queries/account');
const Account = require('../models/Account');

async function getUserAccounts(req, res) {
  const { id } = req.params;

  try {
    const accounts = await Account.findAll({
      ...accountQuery,
      where: { contactId: id },
    });

    if (!accounts.length) {
      return res
        .status(404)
        .json({ message: 'There are no accounts for this user' });
    }

    res.status(200).json(accounts);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: SERVER_ERROR_MSG });
  }
}

async function addAccount(req, res) {
  try {
    const newAccount = await Account.create(req.reqAccount);

    if (newAccount) {
      return res
        .status(201)
        .json({ message: 'Account created successfully.', data: newAccount });
    }
  } catch (err) {
    console.error(err);

    if (err instanceof Sequelize.ForeignKeyConstraintError) {
      return res.status(404).json({ message: 'Channel or contact not found.' });
    }

    return res.status(500).json({ message: SERVER_ERROR_MSG });
  }
}

module.exports = {
  getUserAccounts,
  addAccount,
};
