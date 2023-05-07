"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateOrderStatus = exports.getOrderStatus = exports.default = exports.checkout = void 0;
var _joi = _interopRequireDefault(require("joi"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _index = _interopRequireDefault(require("../database/models/index.js"));
var _eventServices = _interopRequireDefault(require("../services/event.services.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* eslint-disable */

const billingSchema = _joi.default.object({
  country: _joi.default.string().required(),
  street_address: _joi.default.string().required(),
  town: _joi.default.string().required(),
  state: _joi.default.string().required(),
  post_code: _joi.default.string().required(),
  email: _joi.default.string().email().required()
});
const get_discount = async cart_item => {
  const product = await _index.default.Product.findOne({
    where: {
      id: cart_item.product_id
    }
  });
  let {
    name,
    description,
    price
  } = product;
  price = parseInt(price);
  let {
    quantity
  } = cart_item;
  if (product.instock < quantity) {
    quantity = product.instock;
  }
  if (cart_item.coupon == '0') {
    product.instock -= quantity;
    await product.save();
    return {
      name,
      description,
      quantity,
      subtotal: quantity * price
    };
  }
  const {
    discountPercentage
  } = await _index.default.DiscountCoupon.findOne({
    where: {
      code: cart_item.coupon
    }
  });
  const discount = price * discountPercentage / 100;
  const subtotal = quantity * (price - discount);
  product.instock -= quantity;
  await product.save();
  return {
    name,
    description,
    quantity,
    subtotal
  };
};
const checkout = async (req, res) => {
  try {
    const user_id = req.user.dataValues.id;
    const {
      error,
      value
    } = billingSchema.validate(req.body);
    if (error) {
      res.status(400).send({
        message: error.message
      });
    }
    const {
      country,
      street_address,
      town,
      state,
      post_code,
      email
    } = value;
    const billing_info = {
      country,
      street_address,
      town,
      state,
      post_code,
      email
    };
    const user_cart = await _index.default.Cart_items.findAll({
      where: {
        User_id: user_id
      }
    });
    if (user_cart.length == 0) {
      res.status(400).send({
        status: "fail",
        message: "This user has no items in the cart"
      });
    }
    const products_info = [];
    for (const item of user_cart) {
      const product_details = await get_discount(item);
      products_info.push(product_details);
    }
    let total = 0;
    products_info.forEach(item => {
      total += item.subtotal;
    });
    const status = 'pending';
    const new_order = await _index.default.Order.create({
      user_id,
      products_info,
      total,
      status,
      billing_info
    });
    _eventServices.default.emit('product:checkout', new_order);
    res.status(200).send({
      status: 'success',
      data: {
        order: new_order
      }
    });
  } catch (error) {
    res.status(400).send({
      status: 'fail',
      data: {
        error
      }
    });
  }
};
exports.checkout = checkout;
const getOrderStatus = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(403).json({
        status: 'fail',
        message: 'Please log in first!'
      });
    } else {
      const token = authHeader.split(' ')[1];
      const decoded = _jsonwebtoken.default.verify(token, process.env.JWT_SECRET);
      const {
        orderId
      } = req.params;
      const order = await _index.default.Order.findOne({
        where: {
          id: orderId,
          user_id: decoded.id
        },
        attributes: ['id', 'status', 'products_info', 'billing_info', 'total', 'user_id']
      });
      if (!order) {
        return res.status(404).json({
          status: 'fail',
          code: 404,
          message: 'Order not found'
        });
      }
      return res.status(200).json({
        status: 'success',
        code: 200,
        data: {
          message: 'Order status retrieved successfully',
          order: {
            order
          }
        }
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      code: 500,
      message: 'Server error'
    });
  }
};
exports.getOrderStatus = getOrderStatus;
const updateOrderStatus = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(403).json({
        status: 'fail',
        message: 'Please log in first!'
      });
    } else {
      const token = authHeader.split(' ')[1];
      const decoded = _jsonwebtoken.default.verify(token, process.env.JWT_SECRET);
      const {
        orderId
      } = req.params;
      const {
        status
      } = req.body;
      const order = await _index.default.Order.findOne({
        where: {
          id: orderId
        }
      });
      if (!order) {
        return res.status(404).json({
          status: 'fail',
          code: 404,
          message: 'Order not found'
        });
      }
      if (decoded.roleId !== 0) {
        return res.status(403).json({
          status: 'fail',
          code: 403,
          message: 'You are not authorized to perform this action'
        });
      }
      order.status = status;
      await order.save();
      return res.status(200).json({
        status: 'success',
        code: 200,
        data: {
          message: 'Order status updated successfully',
          order: {
            order
          }
        }
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      code: 500,
      message: 'Server error'
    });
  }
};
exports.updateOrderStatus = updateOrderStatus;
var _default = {
  checkout,
  getOrderStatus,
  updateOrderStatus
};
exports.default = _default;