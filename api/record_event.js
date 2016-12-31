/**
 * Created by lukedavis on 12/29/16.
 */
var Event = require('./model/event');

module.exports.registerRoute = function(router) {

    const self = this;

    console.log('Registering event router');

    router.post('/event', function(req, resp) {
        // Validate required fields before creating
        if ('eventType' in req.body) {
            var event = new Event();
            event.eventType = req.body.eventType;
            event.created = new Date();
            event.payload = req.body.payload;

            event.save(function (err) {
                if (err) {
                    resp.status(500).send(err);
                }
                resp.status(200).send({message: "Event created!"});
            });
        } else {
            resp.status(404).send({ requiredField: "eventType" });
        }
    });

    router.get('/event', function(req, resp) {
        Event.find(function(err, events) {
            if (err)
                resp.send(err);

            resp.json(events);
        });
    });

    router.get('/event/type/:eventType', function (req, resp) {
        Event.find({eventType: req.params.eventType}, function (err, events) {
           if (err)
               resp.send(err);
            resp.send(events);
        });
    });

};