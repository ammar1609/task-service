const chai = require('chai');
const app = require('../app');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const data = require('./tmpData');

describe('__________ reject endpoint __________', () => {

    it('should return status 200 if item is available', (done) => {
        chai
            .request(app)
            .put(`/reject/${data.itemId}`)
            .end((err, res) => {
                chai.expect(err).to.equal(null);
                chai.expect(res.body.success).to.equal(true);
                chai.expect(res.body.message).to.equal("Borrowing request rejected.");
                chai.expect(res.status).to.equal(200);
                done();
            });
    });

    it('should return status 500 if there any error updating the item', (done) => {
        chai
            .request(app)
            .put(`/reject/${data.itemId}`)
            .end((err, res) => {
                chai.expect(err).to.equal(null);
                chai.expect(res.body.success).to.equal(false);
                chai.expect(res.body.message).to.equal("Could not update item status.");
                chai.expect(res.status).to.equal(500);
                done();
            });
    });

    it('should return status 400 if item status not equal requested', (done) => {
        chai
            .request(app)
            .put(`/reject/${data.itemId}`)
            .end((err, res) => {
                chai.expect(err).to.equal(null);
                chai.expect(res.body.success).to.equal(false);
                chai.expect(res.body.message).to.equal("Item is not in 'Requested' status.");
                chai.expect(res.status).to.equal(400);
                done();
            });
    });

    it.only('should return status 404 if item not found', (done) => {
        chai
            .request(app)
            .put(`/reject/${data.itemId}`)
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
            .put(`/reject/${data.itemId}`)
            .end((err, res) => {
                chai.expect(err).to.equal(null);
                chai.expect(res.body.success).to.equal(false);
                chai.expect(res.body.message).to.equal("Error fetching item data.");
                chai.expect(res.status).to.equal(500);
                done();
            });
    });

});
