const chai = require('chai');
const app = require('../app');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const data = require('./tmpData');

describe('__________ return endpoint __________', () => {

    it('should return status 200 if item updated successfully', (done) => {
        chai
            .request(app)
            .post(`/return`)
            .send({ itemId: data.itemId })
            .end((err, res) => {
                chai.expect(err).to.equal(null);
                chai.expect(res.body.success).to.equal(true);
                chai.expect(res.body.message).to.equal("Item return processed successfully.");
                chai.expect(res.status).to.equal(200);
                done();
            });
    });

    it('should return status 500 if there any error updating the item', (done) => {
        chai
            .request(app)
            .post(`/return`)
            .send({ itemId: data.itemId })
            .end((err, res) => {
                chai.expect(err).to.equal(null);
                chai.expect(res.body.success).to.equal(false);
                chai.expect(res.body.message).to.equal("Could not update item status.");
                chai.expect(res.status).to.equal(500);
                done();
            });
    });

    it('should return status 400 if item status not equal borrowed', (done) => {
        chai
            .request(app)
            .post(`/return`)
            .send({ itemId: data.itemId })
            .end((err, res) => {
                chai.expect(err).to.equal(null);
                chai.expect(res.body.success).to.equal(false);
                chai.expect(res.body.message).to.equal("Item is not in 'Borrowed' status.");
                chai.expect(res.status).to.equal(400);
                done();
            });
    });

    it.only('should return status 404 if item not found', (done) => {
        chai
            .request(app)
            .post(`/return`)
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
            .post(`/return`)
            .send({ itemId: data.itemId })
            .end((err, res) => {
                chai.expect(err).to.equal(null);
                chai.expect(res.body.success).to.equal(false);
                chai.expect(res.body.message).to.equal("Error fetching item data.");
                chai.expect(res.status).to.equal(500);
                done();
            });
    });

});
