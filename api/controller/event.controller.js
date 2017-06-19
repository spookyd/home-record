/**
 * Created by lukedavis on 6/18/17.
 */
const Event = require('../model/event.model');

function create(req, resp, next) {
    // Validate required fields before creating
    if ('eventType' in req.body) {
        var event = new Event();
        event.eventType = req.body.eventType;
        event.created = new Date();
        event.payload = req.body.payload;

        event.save(function (err) {
            if (err) {
                next(err);
            }
            resp.status(200).send({message: "Event created!"});
        });
    } else {
        resp.status(400).send({requiredField: "eventType"});
    }
}

function find(req, resp, next) {
    Event.find(function (err, events) {
        if (err) {
            next(err);
        }
        resp.json(events);
    });
}

function findByType(req, resp, next) {
    Event.find({eventType: req.params.eventType}, function (err, events) {
        if (err) {
            next(err)
        }
        resp.send(events);
    });
}

module.exports = { create, find, findByType };