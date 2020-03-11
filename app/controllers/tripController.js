import _ from 'lodash';
import models from "../models";
import dbHelper from "../helpers/dbHelper";
import { get } from 'http';

module.exports = {
    trips: {
        async post(req, res) {
            try {
                let reqBody = req && req.body;
                if (reqBody) {
                    models.sequelize.query(
                        `INSERT into trips (user_id,trip_type,pickup_location,drop_location,depart_date,return_date,created_at,updated_at) VALUES
                         (${reqBody.user_id},'${reqBody.trip_type}','${reqBody.pickup_location}','${reqBody.drop_location}','${reqBody.depart_date}',${reqBody.return_date ? reqBody.return_date : null},NOW(),NOW())
                         
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
                let filter = user_id ? `where user_id=${usesr_id}` : ""
                models.sequelize.query(
                    `SELECT * from trips ${filter}`,
                    { type: models.sequelize.QueryTypes.SELECT }
                ).then(trips => {
                    res.send(trips)
                }).catch((e) => {
                    res.status(500).send({ message: e })
                })
            }
            catch (e) {

            }
        }
    },
    fare: {
        async post(req, res) {
            try {
                if (req && req.body) {
                    models.sequelize.query(
                        `INSERT INTO fare (from_location,to_location,total_amount,created_at,updated_at) VALUES
                         ('${req.body.from}','${req.body.to}',${req.body.amount},NOW(),NOW())`,
                        { type: models.sequelize.QueryTypes.INSERT }
                    ).then(fare => {
                        res.send(fare)
                    }).catch((e) => {
                        res.status(500).send({ mesaage: e })
                    })
                }
            }
            catch (e) {
                res.status(500).send({ message: e })
            }
        },
        async get(req, res) {
            try {
                models.sequelize.query(
                    `SELECT total_amount from fare where to_location='${req.query.to}'`,
                    { type: models.sequelize.QueryTypes.SELECT }
                ).then(fare => {
                    res.send(fare)
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