const Sequelize = require('sequelize');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');
const sequelize = require('../database/database');
const Contact = require('../models/Contact');
const Account = require('../models/Account');
const Company = require('../models/Company');
const City = require('../models/City');
const Country = require('../models/Country');
const Region = require('../models/Region');
const Channel = require('../models/Channel');
const { SERVER_ERROR_MSG } = require('../utils/constants');

const contactQuery = {
  attributes: [
    'id',
    'name',
    'lastNameOne',
    'lastNameTwo',
    'email',
    [sequelize.col('Company.name'), 'company'],
    [sequelize.col('City.name'), 'city'],
    [sequelize.col('City.Country.name'), 'country'],
    [sequelize.col('City.Country.Region.name'), 'region'],
    'position',
    'interest',
  ],
  include: [
    {
      model: Company,
      required: true,
      attributes: [],
    },
    {
      model: City,
      required: true,
      attributes: [],
      include: [
        {
          model: Country,
          required: true,
          attributes: [],
          include: [
            {
              model: Region,
              required: true,
              attributes: [],
            },
          ],
        },
      ],
    },
  ],
};

const accountQuery = {
  attributes: [
    'channelId',
    'contactId',
    'accountValue',
    [sequelize.col('Channel.name'), 'channelName'],
  ],
  include: [
    {
      model: Channel,
      required: true,
      attributes: [],
    },
  ],
};

async function checkConflictsContact(res, email, id) {
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
  const sortBy = req.query.sortBy || 'name';
  const ascending = req.query.ascending || 'true';
  const sortString = ascending === 'true' ? `${sortBy} ASC` : `${sortBy} DESC`;
  let limit = parseInt(req.query.limit, 10) || 10;
  const offset = parseInt(req.query.offset, 10) || 0;

  if (limit > 20) {
    limit = 20;
  }

  try {
    const contacts = await Contact.findAll({
      ...contactQuery,
      order: sequelize.literal(sortString),
      limit,
      offset,
    });

    if (contacts.length === 0) {
      return res.status(404).json({ message: 'There are no contacts yet.' });
    }

    for (let i = 0; i < contacts.length; i += 1) {
      const contactData = contacts[i].dataValues;

      // eslint-disable-next-line no-await-in-loop
      const accounts = await Account.findAll({
        ...accountQuery,
        where: { contactId: contactData.id },
      });

      contactData.accounts = accounts;
    }

    return res.status(200).json(contacts);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: SERVER_ERROR_MSG });
  }
}

async function getOneContact(req, res) {
  const errors = validationResult(req);
  const { id } = req.params;

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const contact = await Contact.findOne({ ...contactQuery, where: { id } });

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found.' });
    }

    const accounts = await Account.findAll({
      where: { contactId: contact.dataValues.id },
    });

    contact.dataValues.accounts = accounts;

    return res.status(200).json(contact);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: SERVER_ERROR_MSG });
  }
}

async function addAccount(account, contactId, queryInfo) {
  const { channelId, accountValue } = account;

  try {
    // If there are conflicts with this account don't execute the query.
    if (await checkConflictsAccount(channelId, contactId, accountValue)) {
      queryInfo.conflicts.push(
        `There's already an account with value ${accountValue} on the same channel for contact ${contactId}. Cannot create account.`
      );
    } else {
      const newAccount = await Account.create({
        channelId,
        contactId,
        accountValue,
      });

      queryInfo.newAccounts.push(newAccount.dataValues);
    }
  } catch (err) {
    console.error(err);

    if (err instanceof Sequelize.ForeignKeyConstraintError) {
      queryInfo.conflicts.push(`Channel with id ${channelId} not found.`);
    }
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
    if (await checkConflictsContact(res, name)) {
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

    if (newContact) {
      // If someone wants to add a new contact with accounts in the same request.
      if (accounts) {
        const queryInfo = {
          newAccounts: [],
          conflicts: [],
        };

        for (let i = 0; i < accounts.length; i += 1) {
          // eslint-disable-next-line no-await-in-loop
          await addAccount(accounts[i], newContact.id, queryInfo);
        }

        return res.status(200).json({
          message: 'Contact added successfully.',
          data: { ...newContact.dataValues, ...queryInfo },
        });
      }
      // If someone just wants to add a contact without accounts.
      return res.status(200).json({
        message: 'Contact added successfully.',
        data: newContact,
      });
    }
  } catch (err) {
    console.error(err);

    if (err instanceof Sequelize.ForeignKeyConstraintError) {
      return res.status(404).json({ message: 'Company or city not found.' });
    }

    return res.status(500).json({ message: SERVER_ERROR_MSG });
  }
}

async function updateContact(req, res) {
  const errors = validationResult(req);
  const { id } = req.params;
  const {
    name,
    lastNameOne,
    lastNameTwo,
    email,
    companyId,
    cityId,
    position,
    interest,
  } = req.body;

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    if (await checkConflictsContact(res, email, id)) {
      return;
    }

    const contact = await Contact.findOne({ where: { id } });

    if (contact) {
      await contact.update({
        name,
        lastNameOne,
        lastNameTwo,
        email,
        companyId,
        cityId,
        position,
        interest,
      });
    } else {
      return res.status(404).json({ message: 'Contact not found.' });
    }

    return res
      .status(200)
      .json({ message: 'Contact updated successfully.', data: contact });
  } catch (err) {
    console.error(err);
  }
}

async function deleteContact(req, res) {
  const errors = validationResult(req);
  const { id } = req.params;

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const deleteRowCount = await Contact.destroy({ where: { id } });

    if (deleteRowCount === 0) {
      return res.status(404).json({ message: 'Contact not found.' });
    }

    return res.status(200).json({
      message: 'Contact deleted successfully.',
      deletedRows: deleteRowCount,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: SERVER_ERROR_MSG });
  }
}

module.exports = {
  getContacts,
  getOneContact,
  addContact,
  updateContact,
  deleteContact,
};
