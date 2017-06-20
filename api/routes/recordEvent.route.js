/**
 * Created by lukedavis on 12/29/16.
 */
const express = require('express')
    , eventCtrl = require('../controller/event.controller')
    , authMiddleware = require('../middleware/requestValidation');

const router = express.Router();

router.route('/')
    /** PUT api/event */
    // To require authentication for putting new events uncomment line below and comment out the line below that
    // .put(authMiddleware, eventCtrl.create)
    .put(eventCtrl.create)
    /** GET api/event */
    .get(eventCtrl.find);

router.route('/type/:eventType')
    /** GET api/event/type/:eventType */
    .get(eventCtrl.findByType);

module.exports = router;