import express from 'express';
import Controller from '../controllers/UserController';
import helpers from '../helpers';

let checkAccessToken = express.Router();
checkAccessToken.use(helpers.handleRouteWithToken);

let router = express.Router();
router.post('/', Controller.register.post)
router.post('/login', Controller.login.post)
router.get('/user', checkAccessToken, Controller.login.get)
router.put('/forgot', Controller.login.put)
module.exports = router;