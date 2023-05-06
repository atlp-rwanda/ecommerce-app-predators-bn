import cron from "node-cron";
import eventEmitter from "./event.services.js";
import models from "../database/models/index.js";
const Product = models.Product;

// Schedule a job to emit the "product:expiring_soon" event every day at 9 AM
const expiring_soon = cron.schedule("0 0 * * *  ", async () => {
  // Get all products
  const products = await Product.findAll();

  // Get the date 7 days from now
  const nextWeek = new Date();
  nextWeek.setUTCDate(nextWeek.getUTCDate() + 7);
  nextWeek.setUTCHours(0, 0, 0, 0);

  // Filter products whose expiry date is within the next 7 days
  const expiringProducts = products.filter((product) => {
    const expiryDate = new Date(product.expiryDate);
    expiryDate.setUTCHours(0, 0, 0, 0);
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    return expiryDate <= nextWeek && expiryDate >= today;
  });
  // Emit the "product:expiring_soon" event for each expiring product
  expiringProducts.forEach((product) => {
    eventEmitter.emit("product:expiring_soon", product);
  });
});

// Schedule a cron job to emit the 'product:expired' event every day at midnight
const expired = cron.schedule("0 0 * * * ", async () => {
  const products = await Product.findAll();
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 7);

  for (const product of products) {
    const productExpiryDate = product.expiryDate;
    if (productExpiryDate < expirationDate) {
      eventEmitter.emit("product:expired", product);
    }
  }
});

const orderExpiry = cron.schedule("* * * * * * *", async () => {
  const orders = await models.Order.findAll();
  for (const order of orders) {
    const createdAt = new Date(order.createdAt);
    const now = new Date();
    const timeDiff = now.getTime() - createdAt.getTime();
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    if (diffDays >= 3) {
      await models.Order.destroy({ where: { id: order.id } });
      eventEmitter.emit("order:cancelled", order);
    }
  }
});

export { expiring_soon, expired , orderExpiry};
