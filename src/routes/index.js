const {Router} = require('express');
const UserAuthController = require('../controllers/UserAuthController');

const userAuthController = new UserAuthController();

const routes = new Router();

routes.post('/user/login', userAuthController.login);
routes.post('/user/create', userAuthController.create);

module.exports = routes;