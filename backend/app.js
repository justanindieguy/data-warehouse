const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

// Importing routes.
const browserRoutes = require('./routes/browser');
const contactsRoute = require('./routes/contacts');
const usersRoute = require('./routes/users');
const companiesRoute = require('./routes/companies');
const regionsRoute = require('./routes/regions');
const countriesRoute = require('./routes/countries');
const citiesRoute = require('./routes/cities');

const app = express();

// Middlewares.
app.use(bodyParser.json());

// Routes.
app.use('/', browserRoutes);
app.use('/api/v1/contacts', contactsRoute);
app.use('/api/v1/users', usersRoute);
app.use('/api/v1/companies', companiesRoute);
app.use('/api/v1/regions', regionsRoute);
app.use('/api/v1/countries', countriesRoute);
app.use('/api/v1/cities', citiesRoute);

// Static files.
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
