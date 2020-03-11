

import bcrypt from 'bcrypt';
import _ from 'lodash';
import models from "../models";
import dbHelper from "../helpers/dbHelper";
import helpers from "../helpers";

const Drivers = models.Driver;
const saltRounds = 10;

module.exports = {
    login: {
        async post(req, res) {
            let user = await dbHelper.checkExistence({
                sequelize_obj: Drivers,
                query_options: { where: { mobile_number: req.body.mobile_number } },
                res: res,
                autosend: false,
                method: 'findOne'
            });
            if (user) {
                const decryptedPassword = await bcrypt.compare(req.body.password, user.password);
                if (decryptedPassword) {
                    return res.send({
                        username: user,
                        accessToken: helpers.generateAccessToken({ id: user.id, userInfo: user.access }),
                        refreshToken: helpers.generateRefreshToken({ id: user.id })
                    })
                } else {
                    return res.status(401).send({ message: "Incorrect Password." });
                }
            } else {
                return res.status(400).send({ message: "User Not Found." });
            }
        },
        async get(req, res) {
            try {
                models.sequelize.query(
                    `select * from drivers`,
                    { type: models.sequelize.QueryTypes.SELECT }
                ).then(users => {
                    res.send(users)
                }).catch((e) => {
                    res.status(500).send({ message: e })
                })
            }
            catch (e) {
                res.status(500).send({ message: e })
            }
        }
    },
    register: {
        async post(req, res) {

            try {
                let reqBody = req.body;
                let encryptedPassword = await bcrypt.hash(req && req.body.password, saltRounds);
                let driver = await Drivers.create({
                    driver_name: reqBody.driver_name,
                    password: encryptedPassword,
                    email: reqBody.email,
                    mobile_number: reqBody.mobile_number,
                    rides_preferred: reqBody.rides_preferred,
                    description: reqBody.description,
                    created_at: new Date(),
                    updated_at: new Date()
                });

                if (driver && driver.id) {
                    return res.send({ message: "Registration Successful", driver });
                } else {
                    return res.status(500).send({ message: "Unable to process your request, please try again later", driver });
                }

            } catch (e) {
                return res.status(500).send({ message: "Unable to process your request, please try again later", e });
            }
        }
    },
    refreshToken: {
        /**
         * POST /refresh-token
         * Generate new refresh token
         * @param {*} req
         * @param {*} res
         * @returns
         */
        post(req, res) {
            try {
                if (!req.body) {
                    return res.status(400).send({ message: statusConstants.badRequest });
                }
                const body = req.body;
                if (body.refreshtoken) {
                    const decodedRefreshtoken = helpers.verifyRefreshToken(
                        body.refreshtoken
                    );
                    if (decodedRefreshtoken && decodedRefreshtoken.decodedData && decodedRefreshtoken.decodedData.id) {
                        const userId = decodedRefreshtoken.decodedData.id;
                        dbHelper
                            .checkExistence({
                                sequelize_obj: Driver,
                                query_options: { where: { id: userId } },
                                res: res,
                                autosend: false,
                                method: "findOne"
                            })
                            .then(user => {
                                const userInfo = user.toJSON();
                                const accesstoken = helpers.generateAccessToken({
                                    id: userInfo.id,
                                    name: userInfo.name,
                                    email: userInfo.email,
                                    mobile_number: userInfo.mobile_number
                                });
                                if (accesstoken) {
                                    return res.send({ accesstoken: accesstoken });
                                } else {
                                    return res.status(500).send({
                                        message: statusConstants.unableToGenerateAccessToken
                                    });
                                }
                            });
                    } else {
                        return res
                            .status(401)
                            .send({ message: statusConstants.invalidRefreshToken });
                    }
                } else {
                    return res
                        .status(400)
                        .send({ message: statusConstants.refreshTokenNotProvided });
                }
            } catch (e) {
                return res.status(500).send({ message: statusConstants.writeToDBFailed });
            }
        }
    }
};