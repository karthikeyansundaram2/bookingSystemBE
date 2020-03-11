'use strict';
require("dotenv").config();
import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/config.json')[env];
const db = {};
const pool = {
    "max": 5,
    "min": 0,
    "idle": 20000,
    "acquire": 20000
};
let sequelize = new Sequelize(config.database, config.username, config.password,
    {
        "host": config.host,
        "dialect": "mysql",
        "pool": pool
    });

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((err) => {
        console.log('Unable to connect to the database:', err);
    });

fs.readdirSync(__dirname)
    .filter((file) => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach((file) => {
        const model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Import Models so that I can use them in the api just by importing 'db'
db.User = require('./user')(sequelize, Sequelize);
db.Driver = require('./driver')(sequelize, Sequelize);
db.Trips = require('./trips')(sequelize, Sequelize);
module.exports = db;