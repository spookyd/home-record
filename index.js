/**
 * Created by lukedavis on 6/17/17.
 */
'use strict';

const mongoose =  require('mongoose');
// import util from 'util';

// config should be imported before importing any other file
const config = require('./config/config')
    , app = require('./config/server')
    , debug = require('debug')('home-record:index');

// connect to mongo db
const mongoUri = config.db.host + ':' + config.db.port;
mongoose.Promise = global.Promise;
mongoose.connect(mongoUri, { server: { socketOptions: { keepAlive: 1 } } });
mongoose.connection.on('error', function() {
    throw new Error('unable to connect to database: ' + mongoUri);
});

// print mongoose logs in dev env
if (config.debug) {
    mongoose.set('debug', function(collectionName, method, query, doc) {
        debug(collectionName + '.' + method, query, doc);
    });
}

// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912
if (!module.parent) {
    // listen on port config.port
    app.listen(config.port, function() {
        console.info('server started on port ' + config.port + ' ' + config.env); // eslint-disable-line no-console
    });
}

module.exports = app;