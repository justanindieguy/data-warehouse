function getCountries(req, res) {
  return res.status(200).json({ message: 'Getting all the countries...' });
}

module.exports = { getCountries };
