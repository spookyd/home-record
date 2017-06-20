/**
 * Created by lukedavis on 6/19/17.
 */
const chai = require('chai')
    , expect = chai.expect
    , chaiHttp = require('chai-http')
    , app = require('../../index');

chai.use(chaiHttp);

describe('Index', () => {
    describe('GET /health-check', () => {
        it('returns OK with a 200 status', (done) => {
            chai.request(app)
                .get('/api/health-check')
                .end((err, resp) => {
                    expect(resp).to.have.status(200);
                    expect(resp.text).to.equal('OK');
                    expect(err).to.be.null;
                    done();
                })
        });
    })
});