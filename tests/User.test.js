import app from '../src/app.js';
import chai from 'chai';
import chaiHttp from 'chai-http';
import db from '../src/database/models/index.js';
const expect = chai.expect;

chai.use(chaiHttp);
chai.should();

describe('User Registration & Login', () => {
  before(async () => {
    await db.User.destroy({ where: { email: 'terencefaid@gmail.com' } });
  });
  it('should create a new user', (done) => {
    chai.request(app)
      .post('/api/register')
      .send({
        name: 'Faid',
        email: 'terencefaid@gmail.com',
        password: 'password123',
        gender: 'male',
        preferredCurrency: 'usd',
        preferredLanguage: 'en'
      })
      .end((error, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
describe('POST /api/login', function() {
    it('should login a user using email and password', async () => {
      const res = await chai.request(app)
        .post('/api/login')
        .send({
          email: 'terencefaid@gmail.com',
          password: 'password123'
        });
      expect(res).to.have.status(200);
  
    });
    it('should return an error message on invalid credentials', async () => {
        const res = await chai.request(app)
          .post('/api/login')
          .send({
            email: 'invalid@admin.com',
            password: 'invalidpassword'
          });
        expect(res).to.have.status(401);
        expect(res.body).to.have.property('status', 'fail');
        expect(res.body.data).to.have.property('message', 'Invalid Credentials😥');
      });
  });

