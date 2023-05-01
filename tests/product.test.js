import app from '../src/app.js';
import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
chai.should();

describe("get all products", () => {
  it("should return all products", (done) => {
    chai.request(app)
      .get("/api/product")
      .end((error, res) => {
       
        res.should.have.status(200);
        res.body.data.should.have.property("products");
        done();
      });

  });
});
