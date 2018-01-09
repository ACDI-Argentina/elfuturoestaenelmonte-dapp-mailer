'use strict';

var mongoose = require('mongoose');
var mt = require('./InitMailTime');

module.exports = function () {
  var app = this;

  var mongoUrl = app.get('env') === 'development' ? app.get('mongodb') : process.env.MONGO_URL;

  var promise = mongoose.connect(mongoUrl, {
    useMongoClient: true
  });

  promise.then(function (db) {
    // we need to create the mailtime server and client after database loads
    // because db instance needs to be passed
    mt.createServer(app, db);
    mt.createClient(app, db);
  });

  mongoose.Promise = global.Promise;

  app.set('mongooseClient', mongoose);
};