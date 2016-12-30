'use strict';

const express = require('express');
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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();

router.get('/', function (req, res) {
    res.json({ version: '0.0.1' });
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
   
