const routes = require('express').Router();
const { createEmail } = require('./emails/email_create');
const { listEmail } = require('./emails/email_list');
const { updateEmail } = require('./emails/email_update');

// Email routes
routes.post('/emails/create', createEmail);
routes.get('/emails/list', listEmail);
routes.put('/emails/update', updateEmail);

module.exports = { routes };