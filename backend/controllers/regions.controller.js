function getRegions(req, res) {
  return res.status(200).json({ message: 'Getting all the regions...' });
}

module.exports = { getRegions };
