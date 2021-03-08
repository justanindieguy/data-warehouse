const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Importing routes.
const contactsRoute = require('./routes/contacts');
const usersRoute = require('./routes/users');
const companiesRoute = require('./routes/companies');
const regionsRoute = require('./routes/regions');
const countriesRoute = require('./routes/countries');
const citiesRoute = require('./routes/cities');
const accountsRoute = require('./routes/accounts');
const channelsRoute = require('./routes/channels');

const app = express();

// Middlewares.
app.use(cors());
app.use(bodyParser.json());

// Routes.
app.use('/api/v1/contacts', contactsRoute);
app.use('/api/v1/users', usersRoute);
app.use('/api/v1/companies', companiesRoute);
app.use('/api/v1/regions', regionsRoute);
app.use('/api/v1/countries', countriesRoute);
app.use('/api/v1/cities', citiesRoute);
app.use('/api/v1/accounts', accountsRoute);
app.use('/api/v1/channels', channelsRoute);

module.exports = app;
