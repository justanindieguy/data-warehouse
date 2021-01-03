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
        sequelize.col('user.name'),
        ' ',
        sequelize.col('user.lastName')
      ),
      'name',
    ],
    [sequelize.col('role.name'), 'loggedInAs'],
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
  const { id } = req.params;

  try {
    const user = await User.findOne({
      ...userQuery,
      attributes: [
        'id',
        'name',
        'lastNameOne',
        'lastNameTwo',
        [sequelize.col('role.name'), 'loggedInAs'],
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
  let { password } = req.body;
  const { name, lastName, email } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    password = hashedPassword;

    const newUser = await User.create({
      name,
      lastName,
      email,
      password,
    });

    if (newUser) {
      return res.status(200).json({
        message: 'User created successfully.',
        data: {
          id: newUser.id,
          name: `${newUser.name} ${newUser.lastName}`,
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
  const { id } = req.params;
  const { name, lastName, roleId, email } = req.body;
  let { password } = req.body;

  try {
    const user = await User.findOne({ where: { id } });

    if (user) {
      if (password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        password = hashedPassword;
      }

      await user.update({
        name,
        lastName,
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
        name: `${user.name} ${user.lastName}`,
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

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      ...userQuery,
      attributes: [
        'id',
        'email',
        'password',
        [sequelize.col('role.name'), 'loggedInAs'],
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
        id: user.dataValues.id,
        email: user.dataValues.email,
        loggedInAs: user.dataValues.loggedInAs,
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
  login,
};
