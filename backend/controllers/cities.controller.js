function getCities(req, res) {
  return res.status(200).json({ message: 'Getting all the cities...' });
}

module.exports = { getCities };
