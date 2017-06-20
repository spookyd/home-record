/**
 * Created by lukedavis on 6/19/17.
 */
const chai = require('chai')
    , expect = chai.expect
    , chaiHttp = require('chai-http')
    , app = require('../../index')
    , mongoose = require('mongoose')
    , Event = require('../model/event.model');

chai.use(chaiHttp);

process.env.NODE_ENV = 'test';

describe('Event', () => {
    describe('GET /', () => {
        describe('with no stored events', () => {
            beforeEach((done) => {
                Event.remove({}, (err)=> {
                    if (err) return done(err);
                    return done();
                })
            });
            it('returns a 200 status and no events', (done) => {
                chai.request(app)
                    .get('/api/event')
                    .end((err, resp) => {
                        expect(resp).to.have.status(200);
                        expect(resp.body.length).to.equal(0);
                        expect(err).to.be.null;
                        done();
                    })
            });
        });
        describe('with stored events', () => {
            beforeEach((done) => {
                const e = new Event({eventType: "Some Type", payload: {id: Math.random()}})
                    , e2 = new Event({eventType: "Some Other Type", payload: {id: Math.random()}});
                e.save((err) => {
                    if (err) return done(err);
                    e2.save((err) => {
                        if (err) return done(err);
                        done();
                    });
                });
            });
            afterEach((done) => {
                Event.remove({}, (err)=> {
                    if (err) return done(err);
                    return done();
                })
            });
            it('returns a 200 status and stored events', (done) => {
                chai.request(app)
                    .get('/api/event')
                    .end((err, resp) => {
                        expect(resp).to.have.status(200);
                        expect(resp.body.length).to.equal(2);
                        expect(err).to.be.null;
                        done();
                    });
            });
        });
    });
    describe('PUT /', () => {
        const validEvent = {
            eventType: "test",
            payload: {
                id: 123
            }
        };
        const invalidEvent = {
            invalidEventKey: "test",
            payload: {
                id: 123
            }
        };
        describe('valid event', () => {
            it('returns 200 and a success message', (done) => {
                chai.request(app)
                    .put('/api/event')
                    .send(validEvent)
                    .end((err, resp) => {
                        expect(resp).to.have.status(200);
                        expect(resp.body.message).to.equal('Event created!');
                        expect(err).to.be.null;
                        done();
                    })
            });
            it('places new event in database', (done) => {
                Event.find((err, events) => {
                    expect(events.length).to.equal(1);
                    expect(events[0].eventType).to.equal(validEvent.eventType);
                    expect(events[0].payload.id).to.equal(validEvent.payload.id);
                    expect(err).to.be.null;
                    done();
                })
            });
        });
        describe('invalid event', () => {
            it('returns a 400 status and a validation hint', (done) => {
                chai.request(app)
                    .put('/api/event')
                    .send(invalidEvent)
                    .end((err, resp) => {
                        expect(resp).to.have.status(400);
                        expect(resp.body.requiredField).to.equal('eventType');
                        done();
                    })
            })
        })
    })
});