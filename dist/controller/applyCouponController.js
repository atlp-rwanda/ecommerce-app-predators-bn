"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyCoupon = void 0;
var _index = _interopRequireDefault(require("./../database/models/index.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Coupon = _index.default.DiscountCoupon;
const CartItem = _index.default.Cart_items;
const applyCoupon = async (req, res) => {
  const {
    code
  } = req.body;
  const user_id = req.user.dataValues.id;
  try {
    if (!code) {
      res.status(400).send({
        status: "fail",
        message: "missing coupon code"
      });
    }
    // Find the coupon in the database
    const coupon = await Coupon.findOne({
      where: {
        code
      }
    });
    if (!coupon) {
      // If the coupon is not valid, send an appropriate error message to the frontend
      return res.status(400).json({
        error: 'Invalid coupon code'
      });
    }

    // Find the items in the user's cart
    const cartItems = await CartItem.findAll({
      where: {
        User_id: user_id
      }
    });

    // Update the cart items with the coupon code
    for (let item of cartItems) {
      if (item.product_id === coupon.productId) {
        item.coupon = code;
        await item.save();
      }
    }

    // Send the updated total price and a confirmation message to the frontend
    return res.json({
      message: `Coupon code '${code}' applied successfully`
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};
exports.applyCoupon = applyCoupon;