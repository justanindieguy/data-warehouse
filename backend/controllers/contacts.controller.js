const Sequelize = require('sequelize');

const sequelize = require('../database/database');
const Contact = require('../models/Contact');
const contactQuery = require('../queries/contact');
const { SERVER_ERROR_MSG } = require('../utils/constants');

async function getContacts(req, res) {
  const sortBy = req.query.sortBy || 'name';
  const ascending = req.query.ascending || 'true';
  const sortString = ascending === 'true' ? `${sortBy} ASC` : `${sortBy} DESC`;
  const offset = parseInt(req.query.offset, 10) || 0;
  let limit = parseInt(req.query.limit, 10) || 10;

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

    return res.status(200).json(contact);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: SERVER_ERROR_MSG });
  }
}

async function addContact(req, res) {
  try {
    const newContact = await Contact.create(req.reqContact);

    if (newContact) {
      return res.status(201).json({
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

  try {
    const contact = await Contact.findOne({ where: { id } });

    if (contact) {
      await contact.update(req.reqContact);
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
