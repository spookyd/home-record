/**
 * Created by lukedavis on 1/10/17.
 */
var User = require('./model/user');
var config = require('../config/main');
var jwt = require('jsonwebtoken');
var moment = require('moment');

function createUserInfo(user) {
    return {
        username: user.username,
        email: user.email,
        name: {
            first: user.name.first,
            last: user.name.last
        }
    }
}

module.exports.registerRoute = function (app) {

    app.post('/login', function (req, resp) {
        User.findOne({
            username: req.body.username
        }, function (err, user) {
            if (err) throw err;

            if (!user) {
                resp.send({success: false, msg: 'Authentication failed. No user found for the provided credentials'});
            } else {
                // check if password matches
                user.comparePassword(req.body.password, function (err, isMatch) {
                    if (isMatch && !err) {
                        var expires = moment().add(7, 'days').valueOf();
                        // if user is found and password is right create a token
                        var token = jwt.sign({
                            iss: 'com.lucky13.home-record',
                            sub: user._id,
                            exp: expires,
                            username: user.username,
                            name: {
                                first: user.name.first,
                                last: user.name.last
                            },
                            role: user.role
                        }, config.secret);
                        resp.json({success: true, token: token, expires: expires});
                    } else {
                        resp.send({success: false, msg: 'Authentication failed. No user found for the provided credentials'});
                    }
                });
            }
        });

    });
};
