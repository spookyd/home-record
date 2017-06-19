/**
 * Created by lukedavis on 12/29/16.
 */
const express = require('express')
    , eventCtrl = require('../controller/event.controller');

const router = express.Router();

router.route('/')
    /** POST api/event */
    .post(eventCtrl.create)
    /** GET api/event */
    .get(eventCtrl.find);

router.route('/type/:eventType')
    /** GET api/event/type/:eventType */
    .get(eventCtrl.findByType);

module.exports = router;