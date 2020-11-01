function getCompanies(req, res) {
  return res.status(200).json({ message: 'Getting all the companies...' });
}

module.exports = { getCompanies };
