const { validationResult } = require('express-validator');
const { Op } = require('sequelize');
const Sequelize = require('sequelize');
const Contact = require('../models/Contact');
const Account = require('../models/Account');
const { SERVER_ERROR_MSG } = require('../utils/constants');

async function checkConflictsUser(res, email, id) {
  let emailExists;

  if (id) {
    emailExists = await Contact.findOne({
      where: { email, id: { [Op.ne]: id } },
    });
  } else {
    emailExists = await Contact.findOne({ where: { email } });
  }

  if (emailExists) {
    res
      .status(409)
      .json({ message: 'A contact with the provided email already exists.' });
    return true;
  }

  return false;
}

async function checkConflictsAccount(channelId, contactId, accountValue) {
  const accountExists = await Account.findOne({
    where: { channelId, contactId, accountValue },
  });

  if (accountExists) {
    return true;
  }

  return false;
}

async function getContacts(req, res) {
  try {
    const contacts = await Contact.findAll();

    if (contacts.length === 0) {
      return res.status(404).json({ message: 'There are no contacts yet.' });
    }

    return res.status(200).json(contacts);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: SERVER_ERROR_MSG });
  }
}

async function addContact(req, res) {
  const errors = validationResult(req);
  const {
    name,
    lastNameOne,
    lastNameTwo,
    email,
    companyId,
    cityId,
    position,
    interest,
    accounts,
  } = req.body;

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // If there are conflicts don't execute the query.
    if (await checkConflictsUser(res, name)) {
      return;
    }

    const newContact = await Contact.create({
      name,
      lastNameOne,
      lastNameTwo,
      email,
      companyId,
      cityId,
      position,
      interest,
    });

    newContact.accountConflicts = [];
    newContact.accounts = [];

    if (newContact) {
      accounts.forEach(async (account) => {
        const { channelId, accountValue } = account;

        // If there are conflicts with this account don't insert to DB.
        if (
          await checkConflictsAccount(channelId, newContact.id, accountValue)
        ) {
          newContact.accountConflicts.push(
            `There's already an account with value ${accountValue} on the same channel for contact ${newContact.id}. Cannot create account.`
          );
        } else {
          const newAccount = await Account.create({
            channelId,
            contactId: newContact.id,
            accountValue,
          });

          if (newAccount) {
            newContact.accounts.push(newAccount);
          }
        }
      });

      return res
        .status(200)
        .json({ message: 'Contact added successfully.', data: newContact });
    }
  } catch (err) {
    console.error(err);

    if (err instanceof Sequelize.ForeignKeyConstraintError) {
      return res.status(404).json({ message: 'Company or city not found.' });
    }

    return res.status(500).json({ message: SERVER_ERROR_MSG });
  }
}

module.exports = { getContacts, addContact };
