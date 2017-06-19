/**
 * Created by lukedavis on 6/18/17.
 */
import Event from '../model/event.model';

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
    event.find(function (err, events) {
        if (err) {
            next(err);
        }
        resp.json(events);
    });
}

function findByType(req, resp, next) {
    event.find({eventType: req.params.eventType}, function (err, events) {
        if (err) {
            next(err)
        }
        resp.send(events);
    });
}

export default { create, find, findByType };