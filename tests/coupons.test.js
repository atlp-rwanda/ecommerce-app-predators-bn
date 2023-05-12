import app from '../src/app.js';
import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import db from '../src/database/models/index.js'

dotenv.config();
const expect = chai.expect;
chai.use(chaiHttp);
chai.should();
const token = process.env.TOKEN;

describe('Discount Coupon CRUD Operations', function() {
  before(async () => {
    await db.DiscountCoupon.destroy({ where: { code: ['2002', '2001'] } });
  });

  it('should add a new Coupon', async () => {
      const res = await chai.request(app)
          .post('/api/discount-coupons/createCoupon')
          .send({
              code: '2002',
              discountPercentage: 0.7,
              expiresAt: '2023-05-31',
              productId: 1,
          })
          .auth(token, { type: 'bearer' });
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('status', 'success');
  });
});

describe('GET /api/discount-coupons/getCoupons', function() {
  it('should get all Coupons', async () => {
    const res = await chai.request(app)
    .get('/api/discount-coupons/getCoupons')
    .auth(token, { type: 'bearer' });
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('status', 'success');
  });
});

describe('GET /api/discount-coupons/getCoupons/:id', function() {
  it('should get a Coupon', async () => {
    const res = await chai.request(app)
    .get('/api/discount-coupons/getCoupons/1')
    .auth(token, { type: 'bearer' });
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('status', 'success');
  });
});

describe('PUT /api/discount-coupons/updateCoupon/:id', function() {
  it('should update a Coupon', async () => {
    const res = await chai.request(app)
    .put('/api/discount-coupons/updateCoupon/1')
    .send({
      code: '2001',
      discountPercentage: 0.5,
      expiresAt: '2023-06-30',
      productId: 1,
    })
    .auth(token, { type: 'bearer' });
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('status', 'success');
  });
});

describe('DELETE /api/discount-coupons/deleteCoupon/:id', function() {
  it('should delete a Coupon', async () => {
    const res = await chai.request(app)
    .delete('/api/discount-coupons/deleteCoupons/1')
    .auth(token, { type: 'bearer' });
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('status', 'success');
  });
});
