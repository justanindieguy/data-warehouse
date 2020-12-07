const Sequelize = require('sequelize');

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
    'lastName',
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

    const requests = [];

    for (let i = 0; i < contacts.length; i += 1) {
      const contactData = contacts[i].dataValues;

      requests.push(
        Account.findAll({
          ...accountQuery,
          where: { contactId: contactData.id },
        })
      );
    }

    const accounts = await Promise.all(requests);

    for (let i = 0; i < contacts.length; i += 1) {
      contacts[i].dataValues.accounts = accounts[i];
    }

    // Get total number of contacts;
    const total = await sequelize.query('SELECT COUNT(*) FROM contacts', {
      type: Sequelize.QueryTypes.SELECT,
    });

    return res
      .status(200)
      .json({ total: total[0]['COUNT(*)'], items: contacts });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: SERVER_ERROR_MSG });
  }
}

async function getOneContact(req, res) {
  const { id } = req.params;

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
  const {
    name,
    lastName,
    email,
    companyId,
    cityId,
    position,
    interest,
    accounts,
  } = req.body;

  try {
    const newContact = await Contact.create({
      name,
      lastName,
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
  const { id } = req.params;
  const {
    name,
    lastName,
    email,
    companyId,
    cityId,
    position,
    interest,
  } = req.body;

  try {
    const contact = await Contact.findOne({ where: { id } });

    if (contact) {
      await contact.update({
        name,
        lastName,
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

module.exports = {
  getContacts,
  getOneContact,
  addContact,
  updateContact,
};
