/* eslint-disable */
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import db from '../database/models/index.js';
import eventEmitter from '../services/event.services.js';
import { isAdmin } from '../middleware/roles.js';
const billingSchema = Joi.object({
  country: Joi.string().required(),
  street_address: Joi.string().required(),
  town: Joi.string().required(),
  state: Joi.string().required(),
  post_code: Joi.string().required(),
  email: Joi.string().email().required(),
});

const get_discount = async (cart_item) => {
  const product = await db.Product.findOne({ where: { id: cart_item.product_id } });
  const { name, description, price } = product;
  let { quantity } = cart_item;
  if (product.instock < quantity) {
    quantity = product.instock;
  }
  if (cart_item.coupon == '0') {
    product.instock -= quantity;
    await product.save();
    return {
      name, description, quantity, subtotal: (quantity * price),
    };
  }
  const { discountPercentage } = await db.DiscountCoupon.findOne({ where: { code: cart_item.coupon } });
  const discount = (price * discountPercentage) / 100;
  const subtotal = (quantity * (price - discount));
  product.instock -= quantity;
  await product.save();
  return {
    name, description, quantity, subtotal,
  };
};

export const checkout = async (req, res) => {
  try {
    const user_id = req.user.dataValues.id;
    const { error, value } = billingSchema.validate(req.body);
    if (error) {
      res.status(400).send({ message: error.message });
    }

    const {
      country, street_address, town, state, post_code, email,
    } = value;

    const billing_info = {
      country, street_address, town, state, post_code, email,
    };

    const user_cart = await db.Cart_items.findAll({ where: { User_id: user_id } });
    const products_info = [];

    for (const item of user_cart) {
      const product_details = await get_discount(item);
      products_info.push(product_details);
    }
    let total = 0;
    products_info.forEach((item) => {
      total += item.subtotal;
    });
    const status = 'pending';
    const new_order = await db.Order.create({
      user_id,
      products_info,
      total,
      status,
      billing_info,
    });
    res.status(200).send({ status: 'success', data: { order: new_order } });
  } catch (error) {
    res.status(400).send({ status: 'fail', data: { error } });
  }
};
export const getOrderStatus = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(403).json({
        status: 'fail',
        message: 'Please log in first!',
      });
    } else {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const { orderId } = req.params;
      const order = await db.Order.findOne({
        where: { id: orderId, user_id: decoded.id },
        attributes: ['id', 'status', 'products_info',
          'billing_info', 'total', 'user_id'],
      });

      if (!order) {
        return res.status(404).json({
          status: 'fail',
          code: 404,
          message: 'Order not found',
        });
      }
      return res.status(200).json({
        status: 'success',
        code: 200,
        data: {
          message: 'Order status retrieved successfully',
          order: { order },
        },
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      code: 500,
      message: 'Server error',
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(403).json({
        status: 'fail',
        message: 'Please log in first!',
      });
    } else {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { orderId } = req.params;
      const { status } = req.body;
      const order = await db.Order.findOne({
        where: { id: orderId },
      });
      if (!order) {
        return res.status(404).json({
          status: 'fail',
          code: 404,
          message: 'Order not found',
        });
      }
      if (!isAdmin) {
        return res.status(403).json({
          status: 'fail',
          code: 403,
          message: 'You are not authorized to perform this action',
        });
      }
      order.status = status;

      await order.save();
      return res.status(200).json({
        status: 'success',
        code: 200,
        data: {
          message: 'Order status updated successfully',
          order: { order },
        },
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      code: 500,
      message: 'Server error',
    });
  }
};
export default { checkout, getOrderStatus, updateOrderStatus };
