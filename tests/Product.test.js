import app from '../src/app.js';
import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
dotenv.config();
const expect = chai.expect;
chai.use(chaiHttp);
chai.should();
const token = process.env.TOKEN;
describe('Product API', function() {
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
  describe('PUT api/product/:id', function() {
    it('should update a product and return the updated product details', function(done) {
      const updatedProduct = {
        name: 'updated product',
        description: 'Banana',
        picture_urls: [
          'https://example.com/picture1.jpg',
          'https://example.com/picture2.jpg',
          'https://example.com/picture3.jpg',
          'https://example.com/picture4.jpg'
        ],
        price: '1',
        expiryDate: '2023-04-28T10:57:26.371Z',
        instock: '3',
        available: 'yes'
      };
      chai.request(app)
        .put('/api/product/1')
        .send(updatedProduct)
        .auth(token, { type: 'bearer' })
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.message).to.equal('Item updated successfully');
          expect(res.body.item).to.have.property('name', 'updated product');
          done();
        });
    });
  });
});