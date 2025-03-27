const routes = require('express').Router();
const { createEmail } = require('./emails/email_create');

// Email routes
routes.post('/emails/create', createEmail);

module.exports = { routes };