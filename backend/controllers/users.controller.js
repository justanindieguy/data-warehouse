function getUsers(req, res) {
  return res.status(200).json({ message: 'Getting all the users...' });
}

module.exports = { getUsers };
