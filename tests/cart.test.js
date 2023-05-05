/* eslint-disable  */
import dotenv from 'dotenv';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app.js';
import {isSeller} from '../src/middleware/roles.js'
dotenv.config();
chai.use(chaiHttp);
chai.should();

describe("cart feature", () => {
  const user = {
    email: "muhedarius96@gmail.com",
    password: "V$Y3KF72(jhIYIZ!",
  };
  const product = {
    name: "google samsung 60",
    description: "Bananta",
    category_id: 2,
    picture_urls: [
      "https://example.com/picture1.jpg",
    ],
    price: "10000",
    expiryDate: "2023-04-28T10:57:26.371Z",
    instock: "3",
    available: "yes",
  };

  let product_id = null;

  before((done) => {
    chai.request(app)
      .post("/api/login")
      .send(user)
      .end((error, res) => {
        const { token } = res.body.data;

        chai.request(app)
          .post("/api/product")
          .set({ Authorization: `Bearer ${token}` })
          .send(product)
          .end((error, res) => {
            product_id = res.body;
            console.log(product_id)
            done();
          });
      });
  });

  it("should add product to cart", (done) => {
    chai.request(app)
      .post("/api/login")
      .send(user)
      .end((error, res) => {
        const  {token}  = res.body.data;

        chai.request(app)
          .post("/api/cart")
          .set({ Authorization: `Bearer ${token}` })
          .send({ product_id: product_id, quantity: 2 })
          .end((error, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("message").eql("Product added to cart successfully");
            done();
          });
      });
  });

  it("should get cart items", (done) => {
    chai.request(app)
      .post("/api/login")
      .send(user)
      .end((error, res) => {
        const { token } = res.body.data;

        chai.request(app)
          .get("/api/cart")
          .set({ Authorization: `Bearer ${token}` })
          .end((error, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("data");
            res.body.data.should.be.a("array");
            res.body.data[0].should.have.property("product");
            res.body.data[0].should.have.property("quantity").eql(2);
            done();
          });
      });
  });

  it("should remove product from cart", (done) => {
    chai.request(app)
      .post("/api/login")
      .send(user)
      .end((error, res) => {
        const { token } = res.body.data;

        chai.request(app)
          .delete(`/api/cart/${product_id}`)
          .set({ Authorization: `Bearer ${token}` })
          .end((error, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("message").eql("Product removed from cart successfully");
            done();
          });
      });
  });

});
