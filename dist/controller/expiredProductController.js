"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _cron = _interopRequireDefault(require("cron"));
var _index = _interopRequireDefault(require("../database/models/index.js"));
var _sendEmail = _interopRequireDefault(require("../utils/sendEmail.js"));
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_dotenv.default.config();
const cleanUp = async () => {
  try {
    const currentDate = new Date();
    const products = await _index.default.Product.findAll();
    if (!products || products.length === 0) {
      console.log('No products found');
      return;
    }
    for (const product of products) {
      const productExpiryDate = product.expiryDate;
      if (productExpiryDate < currentDate) {
        const seller = await _index.default.User.findOne({
          where: {
            id: product.vendor_id
          }
        });
        if (!seller) {
          console.log(`Seller with ID ${product.vendor_id} not found`);
          continue;
        }
        await product.destroy();
        const subject = 'Expired Product Alert';
        const text = `Dear sir/madam,\n\nThis is an automatic email alerting you that an existing product with the Name of ${product.name} and ID of ${product.id} has expired and has been removed from the e-commerce-predators platform.`;
        _sendEmail.default.sendEmail(seller.email, subject, text);
      }
    }
    console.log('Expired products cleaned up successfully.');
  } catch (error) {
    console.error('Error cleaning up expired products:', error);
  }
};
const cleanUpJob = new _cron.default.CronJob('0 0 * * * *', cleanUp);
cleanUpJob.start();
var _default = cleanUp;
exports.default = _default;