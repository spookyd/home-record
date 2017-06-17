/**
 * Created by lukedavis on 12/31/16.
 */

var jwt = require('jsonwebtoken');
var User = require('../model/user');
var config = require('../../config/main');

module.exports = function (req, resp, next) {
    // When performing a cross domain request, you will receive
    // a pre-flighted request first. This is to check if our the app
    // is safe.

    // We skip the token auth for [OPTIONS] requests.
    //if(req.method == 'OPTIONS') next();

    console.log('Validating request for ' + req.url);
    var token = req.get('Authorization');

    if (token) {
        try {
            var decoded = jwt.verify(token, config.secret);

            if (decoded.exp <= Date.now()) {
                resp.status(400);
                resp.json({
                    "status": 400,
                    "message": "Token Expired"
                });
                return;
            }

            User.findById(decoded.sub, function (err, user) {
                if (err) throw err;

                if (!user) {
                    // No user with this name exists, respond back with a 401
                    resp.status(401);
                    resp.json({
                        "status": 401,
                        "message": "Invalid User"
                    });
                } else {
                    if ((req.url.indexOf('admin') >= 0 && user.role == 'admin') || (req.url.indexOf('admin') < 0 && req.url.indexOf('/api/v1/') >= 0)) {
                        req.user = user;
                        next(); // To move to next middleware
                    } else {
                        resp.status(403);
                        resp.json({
                            "status": 403,
                            "message": "Not Authorized"
                        });
                    }
                }
            });

        } catch (err) {
            resp.status(500);
            resp.json({
                "status": 500,
                "message": "Oops something went wrong",
                "error": err
            });
        }
    } else {
        resp.status(401);
        resp.json({
            "status": 401,
            "message": "Invalid Token or Key"
        });
    }
};