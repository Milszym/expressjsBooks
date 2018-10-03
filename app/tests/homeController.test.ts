import app from '.././app';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Hello API Request', () => {
    it('Should return status 200 and welcome message.', () => {
        return chai.request(app).get('/')
            .then(res => {
                chai.expect(res).to.have.status(200);
                chai.expect(res.body.message).to.eql('Welcome to the greatest library you\'ve ever seen!!!');
            })
    })
});