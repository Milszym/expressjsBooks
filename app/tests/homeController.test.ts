import app from '.././app';
import * as chai from 'chai';
import {HomeController} from "../controllers/homeController";
import {ApiEndpoints} from "../constants/apiEndpoints";
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Hello API Request', () => {
    it('Should return status 200 and welcome message.', () => {
        return chai.request(app).get(ApiEndpoints.HOME_URL)
            .then(res => {
                chai.expect(res).to.have.status(200);
                chai.expect(res.body.message).to.eql(HomeController.WELCOME_MESSAGE);
            })
    })
});