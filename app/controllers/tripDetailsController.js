import _ from 'lodash';
import models from "../models";
import dbHelper from "../helpers/dbHelper";
import { get } from 'http';

module.exports = {
    tripDetails: {
        async post(req, res) {
            try {
                let reqBody = req && req.body;
                if (reqBody) {
                    models.sequelize.query(
                        `INSERT into trip_details (user_id,driver_id,trip_id,total_amount,driver_rating,created_at,updated_at) VALUES
                         (${reqBody.user_id},'${reqBody.driver_id}','${reqBody.trip_id}','${reqBody.total_amount}','${reqBody.driver_rating}',NOW(),NOW())
                         
                        `, { type: models.sequelize.QueryTypes.INSERT }
                    ).then(trip => {
                        res.send(trip)
                    }).catch((e) => {
                        res.status(500).send({ message: e })
                    })
                }
                else {
                    res.status(400).send({ message: 'No input values found' })
                }
            }
            catch (e) {
                res.status(500).send({ message: e })
            }
        },
        async get(req, res) {
            try {
                let user_id = req && req.query.user_id
                let driver_id = req && req.query.driver_id
                let trip_id = req && req.query && req.query.trip_id
                let filter = user_id ? `where user_id=${usesr_id}` : driver_id ? `where driver_id=${driver_id}` : trip_id ? `where trip_id=${trip_id}` : ""
                models.sequelize.query(
                    `SELECT * from trip_details ${filter}`,
                    { type: models.sequelize.QueryTypes.SELECT }
                ).then(trips => {
                    res.send(trips)
                }).catch((e) => {
                    res.status(500).send({ message: e })
                })
            }
            catch (e) {
                res.status(500).send({ message: e })
            }
        }
    }
}