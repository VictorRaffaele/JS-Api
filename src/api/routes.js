const routes = require('express').Router();
const { createEmail } = require('./emails/email_create');
const { listEmail } = require('./emails/email_list');
const { updateEmail } = require('./emails/email_update');
const { deleteEmail } = require('./emails/email_delete');
const { userCreate } = require('./user/user_create');
const { userList, getEmailIdbyUserId } = require('./user/user_list');
const { userUpdate } = require('./user/user_update');

// Email routes
routes.post('/emails/create', createEmail);
routes.get('/emails/list', listEmail);
routes.put('/emails/update', updateEmail);
routes.delete('/emails/delete', deleteEmail);

// User routes
routes.post('/users/create', userCreate);
routes.get('/users/list', userList);
routes.get('/users/email_id/:user_id', getEmailIdbyUserId);
routes.put('/users/update', userUpdate);

module.exports = { routes };