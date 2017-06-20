/**
 * Created by lukedavis on 6/18/17.
 */
const Event = require('../model/event.model');

var EventCtrl = {

    create: function (req, resp, next) {
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
                resp.status(200).json({message: "Event created!"});
            });
        } else {
            resp.status(400).json({requiredField: "eventType"});
        }
    },

    find: function (req, resp, next) {
        Event.find((err, events) => {
            if (err) {
                next(err);
            }
            resp.json(events);
        });
    },

    findByType: function (req, resp, next) {
        Event.find({eventType: req.params.eventType}, function (err, events) {
            if (err) {
                next(err)
            }
            resp.send(events);
        });
    }
};

module.exports = EventCtrl;