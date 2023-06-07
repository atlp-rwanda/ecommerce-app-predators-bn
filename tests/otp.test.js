import app from '../src/app.js';
import chai from 'chai';
import chaiHttp from 'chai-http';
import config from "config";
import { login } from './login.js';

chai.use(chaiHttp);
chai.should();

describe("2 Factor Authentication: One Time Password", () =>{
    let token;
    before(async () => {
        token = await login(config.user_credentials);
    })

    it("Should be able to generate OTP", (done) => {
        chai.request(app)
        .post("/auth/otp/generate")
        .auth(token, { type: 'bearer' })
        .end( (err, res) => {
            // console.log(res)
            res.should.have.status(200);
            res.body.should.have.property("base32");
            res.body.should.have.property("qr_code_data_url");
            done();
        })
    });
    
    it("Should be able to generate OTP via sms", (done) => {
        chai.request(app)
        .post("/auth/otp/getotp")
        .auth(token, { type: 'bearer' })
        .end( (err, res) => {
            // console.log(res)
            res.should.have.status(200);
            res.body.status.should.be.eql("success");
            res.body.message.should.be.eql("verification code sent");
            done();
        })
    });
})