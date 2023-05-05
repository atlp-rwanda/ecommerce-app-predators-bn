/* eslint-disable */
import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../src/app.js';

dotenv.config();
const { expect } = chai;
chai.use(chaiHttp);
chai.should();
const token = process.env.TOKEN;
describe('Product API', () => {
  describe('get all products', () => {
    it('should return all products', (done) => {
      chai.request(app)
        .get('/api/product')
        .end((error, res) => {
          res.should.have.status(200);
          res.body.data.should.have.property('products');
          done();
        });
    });
  });
});
