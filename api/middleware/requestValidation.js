/**
 * Created by lukedavis on 12/31/16.
 */

const jwt = require('jsonwebtoken')
    , User = require('../model/user.model.js')
    , config = require('../../config/config');

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
                        "message": "Invalid User"
                    });
                } else {
                    if ((req.url.indexOf('admin') >= 0 && user.role == 'admin') || (req.url.indexOf('admin') < 0 && req.url.indexOf('/api/v1/') >= 0)) {
                        req.user = user;
                        next(); // To move to next middleware
                    } else {
                        resp.status(403);
                        resp.json({
                            "message": "Not Authorized"
                        });
                    }
                }
            });

        } catch (err) {
            resp.status(500);
            resp.json({
                "message": "Oops something went wrong",
                "error": err
            });
        }
    } else {
        resp.status(401);
        resp.json({
            "message": "Invalid Token or Key"
        });
    }
};