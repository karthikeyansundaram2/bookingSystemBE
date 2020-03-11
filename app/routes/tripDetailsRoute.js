import express from 'express';
import Controller from '../controllers/tripDetailsController';
import helpers from '../helpers';

let checkAccessToken = express.Router();
checkAccessToken.use(helpers.handleRouteWithToken);
let router = express.Router();
router.post('/', checkAccessToken, Controller.tripDetails.post)
router.get('/', checkAccessToken, Controller.tripDetails.get)
module.exports = router;