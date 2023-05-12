import app from '../src/app.js';
import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
dotenv.config();
const expect = chai.expect;
chai.use(chaiHttp);

describe('ADMIN PRE-CONFIGURED CREDENTIAL SIGIN', function() {
  it('should return a JWT token on successful login', async () => {
    const res = await chai.request(app)
      .post('/api/adminLogin')
      .send({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD
      });
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('status', 'success');
    expect(res.body.data).to.have.property('token');
  });

  it('should return an error message on invalid credentials', async () => {
    const res = await chai.request(app)
      .post('/api/adminLogin')
      .send({
        email: 'invalid@admin.com',
        password: 'invalidpassword'
      });
    expect(res).to.have.status(401);
    expect(res.body).to.have.property('status', 'fail');
    expect(res.body.data).to.have.property('message', 'Invalid Credentials😥');
  });
});
