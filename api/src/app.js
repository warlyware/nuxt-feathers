const path = require('path');
process.env['NODE_CONFIG_DIR'] = path.join(__dirname, '../config/')
const logger = require('winston');
const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');

const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');
const channels = require('./channels');

const authentication = require('./authentication');

const app = express(feathers());

app.configure(configuration());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.configure(express.rest());
app.configure(socketio());

app.configure(middleware);
app.configure(authentication);
app.configure(services);
app.configure(channels);

app.hooks(appHooks);

module.exports = app;
