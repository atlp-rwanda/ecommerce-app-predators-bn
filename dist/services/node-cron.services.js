"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.orderExpiry = exports.expiring_soon = exports.expired = void 0;
var _nodeCron = _interopRequireDefault(require("node-cron"));
var _eventServices = _interopRequireDefault(require("./event.services.js"));
var _index = _interopRequireDefault(require("../database/models/index.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Product = _index.default.Product;

// Schedule a job to emit the "product:expiring_soon" event every day at 9 AM
const expiring_soon = _nodeCron.default.schedule("0 0 * * *  ", async () => {
  // Get all products
  const products = await Product.findAll();

  // Get the date 7 days from now
  const nextWeek = new Date();
  nextWeek.setUTCDate(nextWeek.getUTCDate() + 7);
  nextWeek.setUTCHours(0, 0, 0, 0);

  // Filter products whose expiry date is within the next 7 days
  const expiringProducts = products.filter(product => {
    const expiryDate = new Date(product.expiryDate);
    expiryDate.setUTCHours(0, 0, 0, 0);
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    return expiryDate <= nextWeek && expiryDate >= today;
  });
  // Emit the "product:expiring_soon" event for each expiring product
  expiringProducts.forEach(product => {
    _eventServices.default.emit("product:expiring_soon", product);
  });
});

// Schedule a cron job to emit the 'product:expired' event every day at midnight
exports.expiring_soon = expiring_soon;
const expired = _nodeCron.default.schedule("0 0 * * * ", async () => {
  const products = await Product.findAll();
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 7);
  for (const product of products) {
    const productExpiryDate = product.expiryDate;
    if (productExpiryDate < expirationDate) {
      _eventServices.default.emit("product:expired", product);
    }
  }
});
exports.expired = expired;
const orderExpiry = _nodeCron.default.schedule("* * * * * * *", async () => {
  const orders = await _index.default.Order.findAll();
  for (const order of orders) {
    const createdAt = new Date(order.createdAt);
    const now = new Date();
    const timeDiff = now.getTime() - createdAt.getTime();
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    if (diffDays >= 3) {
      await _index.default.Order.destroy({
        where: {
          id: order.id
        }
      });
      _eventServices.default.emit("order:cancelled", order);
    }
  }
});
exports.orderExpiry = orderExpiry;