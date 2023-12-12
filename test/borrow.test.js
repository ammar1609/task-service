const chai = require('chai');
const app = require('../app');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const data = require('./tmpData');

describe('__________ borrow endpoint __________', () => {

    it('should return status 200 if item can be borrowed', (done) => {
        chai
            .request(app)
            .post(`/`)
            .send({ itemId: data.itemId })
            .end((err, res) => {
                chai.expect(err).to.equal(null);
                chai.expect(res.body.success).to.equal(true);
                chai.expect(res.body.message).to.equal("Item is available for borrowing.");
                chai.expect(res.status).to.equal(200);
                done();
            });
    });

    it('should return status 200 + not available if item is not available', (done) => {
        chai
            .request(app)
            .post(`/`)
            .send({ itemId: data.itemId })
            .end((err, res) => {
                chai.expect(err).to.equal(null);
                chai.expect(res.body.success).to.equal(false);
                chai.expect(res.body.message).to.equal("Item is not available for borrowing.");
                chai.expect(res.status).to.equal(200);
                done();
            });
    });

    it('should return status 404 if item not found', (done) => {
        chai
            .request(app)
            .post(`/`)
            .send({ itemId: data.itemId })
            .end((err, res) => {
                chai.expect(err).to.equal(null);
                chai.expect(res.body.success).to.equal(false);
                chai.expect(res.body.message).to.equal("Item not found.");
                chai.expect(res.status).to.equal(404);
                done();
            });
    });

    it('should return status 500 if there any error performing endpoint controller function', (done) => {
        chai
            .request(app)
            .post(`/`)
            .send({ itemId: data.itemId })
            .end((err, res) => {
                chai.expect(err).to.equal(null);
                chai.expect(res.body.success).to.equal(false);
                chai.expect(res.body.message).to.equal("Error checking item availability.");
                chai.expect(res.status).to.equal(500);
                done();
            });
    });

});
