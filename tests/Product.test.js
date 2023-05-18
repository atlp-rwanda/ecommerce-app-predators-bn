// import app from '../src/app.js';
// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import config from "config";
// import { login } from './login.js';
// const expect = chai.expect;
// chai.use(chaiHttp);
// chai.should();

// describe('Product API', function() {
//   let token;

//   before(async () => {
//       token = await login(config.vendor_credentials);
//   });
  
//   describe("get all products", () => {
//     it("should return all products", (done) => {
//       chai.request(app)
//         .get("/api/product")
//         .end((error, res) => {
         
//           res.should.have.status(200);
//           res.body.data.should.have.property("products");
//           done();
//         });
  
//     });
//   });
//   describe("get a product by id", () => {
//     it("should return a product by id", (done) => {
//       const id = 2;
//       chai.request(app)
//         .get(`/api/product/${id}`)
//         .end((error, res) => {
//           res.should.have.status(200);
//           done();
//         });
//     });
//   });
//   describe('POST api/product', function() {
//     it('should add a new product', async () => {
//       const res = await chai.request(app)
//         .post('/api/product')
//         .send({
//           name: 'Test Prod',
//           description: 'This is a test product',
//           category_id: 1,
//           picture_urls: ['https://example.com/image.png'],
//           expiryDate: '2023-05-31',
//           price: 10.99,
//           instock: 50,
//           available: true
//         })
//         .auth(token, { type: 'bearer' });
  
//       expect(res).to.have.status(200);
//       expect(res.body).to.have.property('status', 'success');
//     });
//   });
  
//   describe('PUT api/product/:id', function() {
//     it('should update a product and return the updated product details', function(done) {
//       const updatedProduct = {
//         name: 'updated product',
//         description: 'Banana',
//         picture_urls: [
//           'https://example.com/picture1.jpg',
//           'https://example.com/picture2.jpg',
//           'https://example.com/picture3.jpg',
//           'https://example.com/picture4.jpg'
//         ],
//         price: '1',
//         expiryDate: '2023-04-28T10:57:26.371Z',
//         instock: '3',
//         available: 'yes'
//       };
//       chai.request(app)
//         .put('/api/product/2')
//         .send(updatedProduct)
//         .auth(token, { type: 'bearer' })
//         .end(function(err, res) {
//           expect(err).to.be.null;
//           expect(res).to.have.status(200);
//           expect(res.body.message).to.equal('Item updated successfully');
//           expect(res.body.item).to.have.property('name', 'updated product');
//           done();
//         });
//     });
//   });
//   describe('DELETE api/product/:id', function() {
//     it('should delete a product and return the product details', function(done) {
//       const reason = 'Product no longer needed'; // Prompt user to provide reason
//       chai.request(app)
//         .delete('/api/product/2')
//         .set('Authorization', 'Bearer ' + token)
//         .send({ reason: reason }) // Pass reason in the request body
//         .end(function(err, res) {
//           expect(err).to.be.null;
//           expect(res).to.have.status(200);
//           expect(res.body.message).to.equal('Item deleted successfully');
//           done();
//         });
//     });
//   });  
// });