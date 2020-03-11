import _ from 'lodash';
import models from "../models";
import dbHelper from "../helpers/dbHelper";
import request from "request"
module.exports = {

    payment: {
        async get(req, res) {
            res.json({ error: 'error' })

        },
        async post(req, res) {
            try {
                if (!req.body.purpose || !req.body.amount || !req.body.email) {
                    res.status(400).json({ success: false, message: 'Needed fields mismatch.', statusCode: 400 });
                } else {

                    var headers = { 'X-Api-Key': 'test_912abace87a5164d66c24be14aa', 'X-Auth-Token': 'test_d5277d2d9f211f09552fe3a0bec' }
                    var payload = {
                        purpose: req.body.purpose,
                        amount: req.body.amount,
                        buyer_name: req.body.buyer_name,
                        redirect_url: '',
                        allow_repeated_payments: false
                    }
                    console.log(payload);
                    request.post('https://test.instamojo.com/api/1.1/payment-requests/', { form: payload, headers: headers }, function (error, response, body) {
                        if (!error && response.statusCode == 201) {
                            let data = JSON.parse(response.body)
                            console.log(data.payment_request.longurl)

                            res.status(200).json({ success: true, message: 'Initiating payment gateway.', statusCode: 200, url: data.payment_request.longurl });

                        } else {
                            console.log(error)
                        }
                    })




                }
            }
            catch (e) {
                res.status(500).send({ message: e })
            }
        }
    }
}