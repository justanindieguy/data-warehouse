const { Op } = require('sequelize');
const { validationResult } = require('express-validator');
const sequelize = require('../database/database');
const Company = require('../models/Company');
const City = require('../models/City');
const Country = require('../models/Country');
const Region = require('../models/Region');

const companyQuery = {
  attributes: [
    'id',
    'name',
    'address',
    'email',
    'phone',
    [sequelize.col('City.name'), 'city'],
    [sequelize.col('City.Country.name'), 'country'],
    [sequelize.col('City.Country.Region.name'), 'region'],
  ],
  include: [
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

async function checkConflicts(res, name, email, phone, id) {
  let nameExists;
  let emailExists;
  let phoneExists;

  if (id) {
    nameExists = await Company.findOne({
      where: { name, id: { [Op.ne]: id } },
    });
    emailExists = await Company.findOne({
      where: { email, id: { [Op.ne]: id } },
    });
    phoneExists = await Company.findOne({
      where: { phone, id: { [Op.ne]: id } },
    });
  } else {
    nameExists = await Company.findOne({ where: { name } });
    emailExists = await Company.findOne({ where: { email } });
    phoneExists = await Company.findOne({ where: { phone } });
  }

  if (nameExists) {
    res
      .status(409)
      .json({ message: 'A company with the provided name already exists.' });
    return true;
  }

  if (emailExists) {
    res.status(409).json({
      message: 'A company with the provided email already exists.',
    });
    return true;
  }

  if (phoneExists) {
    res.status(409).json({
      message: 'A company with the provided phone number already exists.',
    });
  }

  return false;
}

async function getCompanies(req, res) {
  try {
    const companies = await Company.findAll(companyQuery);
    return res.status(200).json(companies);
  } catch (err) {
    console.error(err);
  }
}

async function getOneCompany(req, res) {
  const errors = validationResult(req);
  const { id } = req.params;

  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  try {
    const company = await Company.findOne({ ...companyQuery, where: { id } });
    return res.status(200).json(company);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: 'Something went wrong. Try again later.' });
  }
}

async function addCompany(req, res) {
  const errors = validationResult(req);
  const { name, address, email, phone, cityId } = req.body;

  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  try {
    // If there are conflicts don't execute the query.
    if (await checkConflicts(res, name, email, phone)) {
      return;
    }

    console.log('Hello, World!');

    const newProject = await Company.create({
      name,
      address,
      email,
      phone,
      cityId,
    });

    if (newProject) {
      return res
        .status(200)
        .json({ message: 'Company created successfully.', data: newProject });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: 'Something went wrong. Try again later.' });
  }
}

async function updateCompany(req, res) {
  const errors = validationResult(req);
  const { id } = req.params;
  const { name, address, email, phone, cityId } = req.body;

  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  try {
    if (await checkConflicts(res, name, email, phone, id)) {
      return;
    }

    const company = await Company.findOne({ where: { id } });

    if (company) {
      await company.update({ name, address, email, phone, cityId });
    } else {
      return res.status(404).json({ message: `Company not found` });
    }

    return res
      .status(200)
      .json({ message: 'Company updated successfully.', data: company });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: 'Something went wrong. Try again later.' });
  }
}

async function deleteCompany(req, res) {
  const errors = validationResult(req);
  const { id } = req.params;

  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  try {
    const deleteRowCount = await Company.destroy({ where: { id } });

    if (deleteRowCount === 0) {
      return res.status(404).json({ message: 'Company not found.' });
    }

    return res.status(200).json({
      message: 'Company deleted successfully.',
      deletedRows: deleteRowCount,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: 'Something went wrong. Try again later.' });
  }
}

module.exports = {
  getCompanies,
  getOneCompany,
  addCompany,
  updateCompany,
  deleteCompany,
};
