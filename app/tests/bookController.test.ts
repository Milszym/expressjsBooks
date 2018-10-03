import app from '.././app';
import * as chai from 'chai';
import {ApiEndpoints} from "../constants/apiEndpoints";
import {Book} from "../models/book";
import {Rating} from "../models/rating";
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

let sampleBook = new Book({
    "title": "Robaki i inne przynety",
    "ISBN": "ISBN-13: 978-1-56619-909-4",
    "numberOfPages": 1322,
    "rating": 1
});

describe('Book CRUD test.', () => {
    it('Creating book. Should return status 201 and book with it\'s created id.', () => {
        return chai.request(app).post(ApiEndpoints.BOOK_URL)
            .send(sampleBook)
            .then(res => {
                chai.expect(res).to.have.status(201);
                chai.expect(res.body._id).to.exist;
                this.sampleBook = res.body;
            })
    });
    it('Updating book\'s rating. Should return book with updated rating.', () => {
        const NEW_RATING = Rating.EXCELLENT;
        sampleBook.rating = NEW_RATING;
        return chai.request(app).put(ApiEndpoints.BOOK_URL + '/' + sampleBook._id)
            .send(sampleBook)
            .then(res => {
                chai.expect(res).to.have.status(200);
                chai.expect(res.body.rating).to.eq(NEW_RATING);
            })
    });
    it('Creating book with wrong ISBN. Should return status 500, because of ISBN validation', () => {
        sampleBook.ISBN = 'WRONG ISBN';
        return chai.request(app).post(ApiEndpoints.BOOK_URL)
            .send(sampleBook)
            .then(res => {
                chai.expect(res).to.have.status(500);
            })
    });
    it('Get existing book. Should return status 200 and book by id.', () => {
        sampleBook.save((err, book) =>
            chai.request(app).get(ApiEndpoints.BOOK_URL + '/' + sampleBook._id)
                .then(res => {
                    chai.expect(res).to.have.status(200);
                    chai.expect(res.body).to.exist;
                })
        );
    });
    it('Get not existing book. Should return status 404 Not found.', () => {
        return chai.request(app).get(ApiEndpoints.BOOK_URL + '/5bb4aef8bb4bf724a858e2ab')
            .then(res => {
                chai.expect(res).to.have.status(404);
            })
    });
    it('Delete existing book. Should return status 200.', () => {
        return chai.request(app).del(ApiEndpoints.BOOK_URL + '/' + sampleBook._id)
            .then(res => {
                chai.expect(res).to.have.status(200);
            })
    });
});