const Sequelize = require('sequelize');

const { SERVER_ERROR_MSG } = require('../utils/constants');
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
    [sequelize.col('city.name'), 'city'],
    [sequelize.col('city.country.name'), 'country'],
    [sequelize.col('city.country.region.name'), 'region'],
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

async function getCompanies(req, res) {
  try {
    const companies = await Company.findAll(companyQuery);

    if (companies.length === 0) {
      return res.status(404).json({ message: 'There are no companies yet.' });
    }

    return res.status(200).json(companies);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: SERVER_ERROR_MSG });
  }
}

async function getOneCompany(req, res) {
  const { id } = req.params;

  try {
    const company = await Company.findOne({ ...companyQuery, where: { id } });

    if (!company) {
      return res.status(404).json({ message: 'Company not found.' });
    }

    return res.status(200).json(company);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: SERVER_ERROR_MSG });
  }
}

async function addCompany(req, res) {
  const { name, address, email, phone, cityId } = req.body;

  try {
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

    if (err instanceof Sequelize.ForeignKeyConstraintError) {
      return res.status(404).json({ message: `City not found` });
    }

    return res.status(500).json({ message: SERVER_ERROR_MSG });
  }
}

async function updateCompany(req, res) {
  const { id } = req.params;
  const { name, address, email, phone, cityId } = req.body;

  try {
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

    if (err instanceof Sequelize.ForeignKeyConstraintError) {
      return res.status(404).json({ message: `City not found` });
    }

    return res.status(500).json({ message: SERVER_ERROR_MSG });
  }
}

module.exports = {
  getCompanies,
  getOneCompany,
  addCompany,
  updateCompany,
};
