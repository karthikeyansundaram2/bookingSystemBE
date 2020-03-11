import express from 'express';
import Controller from '../controllers/tripController';
import helpers from '../helpers';

let checkAccessToken = express.Router();
checkAccessToken.use(helpers.handleRouteWithToken);
let router = express.Router();
router.post('/', checkAccessToken, Controller.trips.post)
router.get('/', checkAccessToken, Controller.trips.get)
router.post('/fare', checkAccessToken, Controller.fare.post)
router.get('/fare', checkAccessToken, Controller.fare.get)
module.exports = router;