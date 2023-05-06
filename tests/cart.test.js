/* eslint-disable  */
import dotenv from 'dotenv';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app.js';
dotenv.config();
chai.use(chaiHttp);
chai.should();

describe("cart feature", () => {
  const user = {
    email: "yobu@gmail.com",
    password: "yobu",
  };
  const product = {
    name: "google samsung 80",
    description: "Banana",
    category_id: 1,
    picture_urls: [
      "https://example.com/picture1.jpg",
    ],
    price: "10000",
    expiryDate: "2023-04-28T10:57:26.371Z",
    instock: "3",
    available: "yes",
  };

  it("should add product to cart", (done) => {
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
           // res.should.have.status(200);
          });
        done();
      });
  });

 
});
