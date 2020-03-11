import express from 'express';
import Controller from '../controllers/paymentController';
import helpers from '../helpers';

let checkAccessToken = express.Router();
checkAccessToken.use(helpers.handleRouteWithToken);
let router = express.Router();

router.post('/', checkAccessToken, Controller.payment.post)
router.get('/', checkAccessToken, Controller.payment.get)
module.exports = router;