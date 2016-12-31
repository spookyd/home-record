'use strict';

const express = require('express');
const apiRegistery = require('./server-api-register');
var bodyParser = require('body-parser');

// Constants
const PORT = 8080;

// App
const app = express();
var mongoose = require('mongoose');
//DB setup
mongoose.connect("mongodb://mongo:27017");

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Make our db accessible to our router
app.use(function (req, res, next) {
    req.db = mongoose;
    next();
});

var router = express.Router();
// REGISTER OUR ROUTES -------------------------------
apiRegistery(router);

// all of our routes will be prefixed with /api
app.use('/api', router);

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
   
