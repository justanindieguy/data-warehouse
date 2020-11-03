const { validationResult } = require('express-validator');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');
const sequelize = require('../database/database');
const User = require('../models/User');
const Role = require('../models/Role');
const { SERVER_ERROR_MSG } = require('../utils/constants');

const { TOKEN_SECRET } = process.env;

const userQuery = {
  attributes: [
    'id',
    [
      sequelize.fn(
        'CONCAT',
        sequelize.col('User.name'),
        ' ',
        sequelize.col('User.lastNameOne'),
        ' ',
        sequelize.col('User.lastNameTwo')
      ),
      'name',
    ],
    [sequelize.col('Role.name'), 'loggedInAs'],
    'email',
  ],
  include: [
    {
      model: Role,
      require: true,
      attributes: [],
    },
  ],
};

async function checkConflicts(res, email, id) {
  let emailExists;

  if (id) {
    emailExists = await User.findOne({ where: { email, id: { [Op.ne]: id } } });
  } else {
    emailExists = await User.findOne({ where: { email } });
  }

  if (emailExists) {
    res
      .status(409)
      .json({ message: 'A user with the provided email already exists.' });
    return true;
  }

  return false;
}

async function getUsers(req, res) {
  try {
    const users = await User.findAll(userQuery);

    if (users.length === 0) {
      return res.status(404).json({ message: 'There are no users yet.' });
    }

    return res.status(200).json(users);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: SERVER_ERROR_MSG });
  }
}

async function getOneUser(req, res) {
  const errors = validationResult(req);
  const { id } = req.params;

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findOne({
      ...userQuery,
      attributes: [
        'id',
        'name',
        'lastNameOne',
        'lastNameTwo',
        [sequelize.col('Role.name'), 'loggedInAs'],
        'email',
      ],
      where: { id },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: SERVER_ERROR_MSG });
  }
}

async function registerUser(req, res) {
  const errors = validationResult(req);
  let { password } = req.body;
  const { name, lastNameOne, lastNameTwo, email } = req.body;

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // If there are conflicts don't execute the query.
    if (await checkConflicts(res, email)) {
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    password = hashedPassword;

    const newUser = await User.create({
      name,
      lastNameOne,
      lastNameTwo,
      email,
      password,
    });

    if (newUser) {
      return res.status(200).json({
        message: 'User created successfully.',
        data: {
          id: newUser.id,
          name: `${newUser.name} ${newUser.lastNameOne} ${newUser.lastNameTwo}`,
          email: newUser.email,
        },
      });
    }
  } catch (err) {
    console.error(err);

    return res.status(500).json({ message: SERVER_ERROR_MSG });
  }
}

async function updateUser(req, res) {
  const errors = validationResult(req);
  const { id } = req.params;
  let { password } = req.body;
  const { name, lastNameOne, lastNameTwo, roleId, email } = req.body;

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    if (await checkConflicts(res, email, id)) {
      return;
    }

    const user = await User.findOne({ where: { id } });

    if (user) {
      if (password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        password = hashedPassword;
      }

      await user.update({
        name,
        lastNameOne,
        lastNameTwo,
        roleId,
        email,
        password,
      });
    } else {
      return res.status(404).json({ message: 'User not found.' });
    }

    return res.status(200).json({
      message: 'User updated successfully.',
      data: {
        id: user.id,
        name: `${user.name} ${user.lastNameOne} ${user.lastNameTwo}`,
        roleId: user.roleId,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);

    if (err instanceof Sequelize.ForeignKeyConstraintError) {
      return res.status(404).json({ message: 'Role not found.' });
    }

    return res.status(500).json({ message: SERVER_ERROR_MSG });
  }
}

async function deleteUser(req, res) {
  const errors = validationResult(req);
  const { id } = req.params;

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const deleteRowCount = await User.destroy({ where: { id } });

    if (deleteRowCount === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }

    return res.status(200).json({
      message: 'User deleted successfully.',
      deletedRows: deleteRowCount,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: SERVER_ERROR_MSG });
  }
}

async function login(req, res) {
  const errors = validationResult(req);
  const { email, password } = req.body;

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findOne({
      ...userQuery,
      attributes: [
        'id',
        'email',
        'password',
        [sequelize.col('Role.name'), 'loggedInAs'],
      ],
      where: { email },
    });

    // Checking if a user with the provided email exists.
    if (!user) {
      return res
        .status(401)
        .json({ message: 'The email or password is incorrect.' });
    }

    // Checking if the password is correct.
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res
        .status(401)
        .json({ message: 'The email or password is incorrect.' });
    }

    // Create and assign a token.
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        loggedInAs: user.loggedInAs,
      },
      TOKEN_SECRET
    );

    return res
      .status(200)
      .header('auth-token', token)
      .json({ message: 'Logged In!' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: SERVER_ERROR_MSG });
  }
}

module.exports = {
  getUsers,
  getOneUser,
  registerUser,
  updateUser,
  deleteUser,
  login,
};
