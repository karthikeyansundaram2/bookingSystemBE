import jwt from 'jsonwebtoken';
import jwtConfig from '../../config/jwtConfig';
import models from "../models";
const Hashids = require('hashids/cjs');
const hashids = new Hashids(jwtConfig.jwtSecret);

const verifyAccessToken = function (token) {
    let err, decodedData;
    if (token) {
        jwt.verify(token, jwtConfig.jwtSecret, {
            issuer: jwtConfig.tokenIssuer
        }, function (error, decodedInfo) {
            if (error) {
                err = error;
            } else if (decodedInfo && decodedInfo.id) {
                let userId = hashids.decode(decodedInfo.id);
                userId = userId.length && userId[0];
                decodedData = {
                    id: userId,
                    access: decodedInfo.access
                };
            } else {
                err = true;
            }
        });
    } else {
        err = true;
    }
    return { err, decodedData };
};

const self = {
    generateAccessToken: function (userInfo) {
        return jwt.sign(
            {
                id: hashids.encode(userInfo.id),
                access: userInfo.access
            },
            jwtConfig.jwtSecret,
            {
                expiresIn: jwtConfig.accessTokenExpiry,
                issuer: jwtConfig.tokenIssuer,
                audience: String(userInfo.id)
            });
    },
    generateRefreshToken: function (userInfo) {
        return jwt.sign(
            {
                type: "refresh",
                id: hashids.encode(userInfo.id)
            },
            jwtConfig.jwtSecret,
            {
                expiresIn: jwtConfig.refreshTokenExpiry,
                issuer: jwtConfig.tokenIssuer,
                audience: String(userInfo.id)
            }
        );
    },
    verifyAccessToken: verifyAccessToken,
    verifyRefreshToken: function (token) {
        let err, decodedData;
        try {
            if (token) {
                jwt.verify(token, jwtConfig.jwtSecret, {
                    issuer: jwtConfig.tokenIssuer
                }, function (error, decodedInfo) {
                    if (error) {
                        err = error;
                    } else if (decodedInfo && decodedInfo.id) {
                        let userId = hashids.decode(decodedInfo.id);
                        userId = userId.length && userId[0];
                        decodedData = {
                            id: userId
                        };
                    } else {
                        err = true;
                    }
                });
            } else {
                err = true;
            }
        } catch (err) {
            err = true;
        }
        return { err, decodedData };
    },
    checkForAccess: async function (req, res, next) {
        if (process.env.NODE_ENV == 'production' && req.user && req.user.access && req.user.access == "limited") {
            res.status(403).send("Access Restricted");
        } else {
            next();
        }
    },
    handleRouteWithToken: async function (req, res, next) {
        try {
            const token = req.headers["x-access-token"];
            const { err, decodedData } = verifyAccessToken(token);
            if (err) {
                return res.status(401).send({ message: 'invalid token' });
            } else if (decodedData && decodedData.id) {
                let user = await models.User.findOne({ where: { id: decodedData.id } })
                if (user) {
                    req.user = { ...decodedData, access: user.access };
                    next();
                } else {
                    return res
                        .status(401)
                        .send({ message: 'unable to process' });
                }
            } else {
                return res
                    .status(401)
                    .send({ message: 'unable to process' });
            }
        } catch (e) {
            return res
                .status(401)
                .send({ e: e, message: 'unable to process' });
        }
    }
}
module.exports = self;