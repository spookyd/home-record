/**
 * Created by lukedavis on 1/10/17.
 */

const express = require('express')
    , userCtrl = require('../controller/user.controller');

const router = express.Router();

router.route('/login')
    /** POST api/authentication/login */
    .post(userCtrl.login);

module.exports = router;