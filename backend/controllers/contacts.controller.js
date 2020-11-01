function getContacts(req, res) {
  return res.status(200).json({ message: 'Gettings all the contacts...' });
}

module.exports = { getContacts };
