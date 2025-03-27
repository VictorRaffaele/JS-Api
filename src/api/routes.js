const routes = require('express').Router();
const { createEmail } = require('./emails/email_create');
const { listEmail } = require('./emails/email_list');

// Email routes
routes.post('/emails/create', createEmail);
routes.get('/emails/list', listEmail);

module.exports = { routes };