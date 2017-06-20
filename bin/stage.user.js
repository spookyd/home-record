const config = require('../config/config')
    , mongoose = require('mongoose')
    , User = require('../api/model/user.model');

var user = new User({
    username: 'SomeUser',
    password: 'easyPassword',
    email: 'no.where.interesting@gmail.com',
    name: {
        first: 'Some',
        last: 'User',
    },
    role: 'Admin'
});

mongoose.connect(config.db);
mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + config.db);
    console.log('Creating User');
    user.save((err) => {
        if (err) {
            console.info('Failed to create user ' + err);
            mongoose.disconnect();
            return;
        }
        mongoose.disconnect();
    });
});