/**
 * Created by lukedavis on 6/19/17.
 */
const chai = require('chai')
    , chaiHttp = require('chai-http')
    , app = require('../../index');

chai.use(chaiHttp);

describe('Event', () => {
    describe('GET /', () => {

        it('returns no events', (done) => {
            chai.request(app)
                .get('/api/event')
                .end((err, resp) => {
                    expect(resp).to.have.status(200);
                    expect(resp.json).to.equal(0);
                    expect(err).to.be.null;
                    done();
                })
        });
    })
});