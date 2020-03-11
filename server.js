import middleware from './config/middleware';
import express from 'express';
import http from 'http';
import Router from './app/Router';
import https from 'https';
let fs = require("fs");

var server = http.createServer(app);
var app = express();

var port = process.env.PORT || '6000';
app.set('port', port);
middleware(app, express);
//router
Router.forEach(route => {
    app.use(route.path, route.handler);
});


var server = http.createServer(app);
server.listen(port, () => {
    console.log(`Started on port ${port}`);
});
server.on('error', (error) => {
    console.log(error)
});
server.on('listening', () => {
    console.log(server.address())
});

module.exports = app;