/**
 * Created by lukedavis on 6/18/17.
 */
import jwt from 'jsonwebtoken';
import chai, {expect} from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import config from '../../config/config';

chai.use(chaiHttp);

describe('Authentication', () => {
    describe('POST /login', () => {
        const validUserCredentials = {
            username: 'lpdavis',
            password: 'password'
        };

        const invalidUserCredentials = {
            username: 'lpdavis',
            password: 'invalidPassword'
        };
        it('generates token upon login', (done) => {
            chai.request(app)
                .post('/api/authentication/login')
                .send(validUserCredentials)
                .end((resp, err) => {
                    resp.status.expect.to.equal(200);
                    done();
                })
        });
    })
});

