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

// const express = require('express');
// const config = require('./config/config');
// const apiConfig = require('./config/server.config');
// var bodyParser = require('body-parser');
//
// // App
// const app = express();
// var mongoose = require('mongoose');
// //DB setup
// mongoose.connect(config.database);
//
// // configure app to use bodyParser()
// // this will let us get the data from a POST
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());
//
// app.all('/*', function(req, res, next) {
//     // CORS headers
//     res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//     // Set custom headers for CORS
//     res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
//     if (req.method == 'OPTIONS') {
//         res.status(200).end();
//     } else {
//         next();
//     }
// });
//
// // Make our db accessible to our router
// app.use(function (req, res, next) {
//     req.db = mongoose;
//     next();
// });
//
// var router = express.Router();
//
// const User = require('./api/model/user.model');
// app.get('/stage', function(req, res){
//
//     var luke = new User({
//         username: 'ldavis',
//         password: 'password',
//         email: 'lpdavis13@gmail.com',
//         name: {
//             first: 'Luke',
//             last: 'Davis',
//         },
//         role: 'Admin'
//     });
//     // save the sample user
//     luke.save(function(err) {
//         if (err) throw err;
//
//         console.log('User saved successfully');
//         res.json({ success: true });
//     });
// });
//
// require('./api/routes/authentication.route').registerRoute(app);
//
// // Auth Middleware - This will check if the token is valid
// // Only the requests that start with /api/v1/* will be checked for the token.
// // Any URL's that do not follow the below pattern should be avoided unless you
// // are sure that authentication is not needed
// app.all('/api/v1/*', [require('./api/middleware/requestValidation')]);
//
// // REGISTER OUR ROUTES
// apiConfig(router);
//
// // all of our routes will be prefixed with /api
// app.use('/api/v1', router);
//
// // If no route is matched by now, it must be a 404
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });
//
// app.listen(config.port);
// console.log('Running on http://localhost:' + config.port);