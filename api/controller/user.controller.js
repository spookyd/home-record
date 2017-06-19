/**
 * Created by lukedavis on 6/18/17.
 */

import User from './../model/user.model.js';
import config from '../../config/config';
import jwt from 'jsonwebtoken';
import moment from 'moment';

function login(req, resp, next) {
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
                } else if (!isMatch && !err) {
                    resp.status(422).send({msg: 'Authentication failed. No user found for the provided credentials'});
                } else {
                    next(err);
                }
            });
        }
    });
}

export default { login };