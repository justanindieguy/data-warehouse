const Sequelize = require('sequelize');

const { SERVER_ERROR_MSG } = require('../utils/constants');
const Company = require('../models/Company');
const companyQuery = require('../queries/company');

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
  try {
    const newCompany = await Company.create(req.reqCompany);

    if (newCompany) {
      return res
        .status(201)
        .json({ message: 'Company created successfully.', data: newCompany });
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

  try {
    const company = await Company.findOne({ where: { id } });

    if (company) {
      await company.update(req.reqCompany);
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
