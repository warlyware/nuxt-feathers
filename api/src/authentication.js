const authentication = require('@feathersjs/authentication');
const jwt = require('@feathersjs/authentication-jwt');
const local = require('@feathersjs/authentication-local');
const SpotifyStrategy = require('passport-spotify').Strategy;
const oauth2 = require('@feathersjs/authentication-oauth2');

module.exports = function (app) {
  const config = app.get('authentication');

  // Set up authentication with the secret
  app.configure(authentication(config));
  app.configure(jwt());
  app.configure(local());
  app.configure(oauth2({
    name: 'spotify',
    Strategy: SpotifyStrategy,
    clientID: 'e57d1e4978b04512b596bdca2157263f',
    clientSecret: '93ba37774689426b959a590a4db50516',
    scope: ['user-read-email', 'user-follow-read']
  }));


  // The `authentication` service is used to create a JWT.
  // The before `create` hook registers strategies that can be used
  // to create a new valid JWT (e.g. local or oauth2)
  app.service('authentication').hooks({
    before: {
      create: [
        authentication.hooks.authenticate(config.strategies)
      ],
      remove: [
        authentication.hooks.authenticate('jwt')
      ]
    }
  });
};
