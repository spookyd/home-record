/**
 * Created by lukedavis on 6/18/17.
 */
const chai = require('chai')
    , expect = chai.expect
    , chaiHttp = require('chai-http')
    , jwt = require('jsonwebtoken')
    , moment = require('moment')
    , app = require('../../index')
    , config = require('../../config/config')
    , User = require('../model/user.model');

chai.use(chaiHttp);

describe('Authentication', () => {
    describe('POST /login', () => {
        const validUserCredentials = {
            username: 'LukeDavis',
            password: 'password'
        };

        const invalidUserCredentials = {
            username: 'LukeDavis',
            password: 'invalidPassword'
        };
        beforeEach((done) => {
            var user = new User({
                username: 'LukeDavis',
                password: 'password',
                email: 'lpdavis13@gmail.com',
                name: {
                    first: 'Luke',
                    last: 'Davis',
                },
                role: 'Admin'
            });
            user.save((err) => {
                if (err) return done(err);
                done();
            });
        });
        afterEach((done) => {
           User.remove({}, (err)=> {
               if (err) return done(err);
               return done();
           })
        });
        it('valid credentials returns 200 status and a valid token', (done) => {
            chai.request(app)
                .post('/api/authentication/login')
                .send(validUserCredentials)
                .end((err, resp) => {
                    expect(resp).to.have.status(200);
                    expect(resp.body).to.have.property('token');
                    expect(resp.body).to.have.property('expires');
                    jwt.verify(resp.body.token, config.jwtSecret, (err, decoded) => {
                        expect(err).to.be.null; // eslint-disable-line no-unused-expressions
                        expect(decoded.username).to.equal(validUserCredentials.username);
                        expect(decoded.exp).to.equal(resp.body.expires);
                        done();
                    });
                });
        });
        it('invalid credentials returns 422 status', (done) => {
            chai.request(app)
                .post('/api/authentication/login')
                .send(invalidUserCredentials)
                .end((err, resp) => {
                    expect(resp).to.have.status(422);
                    expect(resp.body.msg).to.equal('Authentication failed. No user found for the provided credentials');
                    done();
                })
        });
    })
});

