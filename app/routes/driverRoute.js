import express from 'express';
import Controller from '../controllers/driverController';
import helpers from '../helpers';

let checkAccessToken = express.Router();
checkAccessToken.use(helpers.handleRouteWithToken);
let router = express.Router();
router.post('/', checkAccessToken, Controller.register.post)
router.post('/driver-login', checkAccessToken, Controller.login.post)
router.get('/', checkAccessToken, Controller.login.get)
module.exports = router;