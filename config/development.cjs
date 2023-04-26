require('dotenv').config();

module.exports = {
  DATABASE_URL: process.env.DEV_DATABASE_URL,
  otp_length: 15,
  otp_length_sms: 6,
  otp_name: 'Team Predators',
  otp_issuer: 'E-commerce app',
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    phoneNumber: process.env.TWILIO_PHONE,
  },
};
