"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCoupons = exports.getCouponById = exports.deleteCouponById = exports.default = exports.createCoupon = void 0;
var _index = _interopRequireDefault(require("../database/models/index.js"));
var _roles = require("../middleware/roles.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const createCoupon = async (req, res) => {
  try {
    const {
      code,
      discountPercentage,
      expiresAt,
      productId
    } = req.body;
    // Validate request body
    if (!code || !discountPercentage || !expiresAt || !productId) {
      return res.status(400).json({
        status: "fail",
        data: {
          message: 'Missing required fields'
        }
      });
    }

    // Check if the coupon code already exists
    const existingCoupon = await _index.default.DiscountCoupon.findOne({
      where: {
        code: code
      }
    });
    if (existingCoupon) {
      return res.status(400).json({
        status: "fail",
        data: {
          message: 'Coupon code already exists'
        }
      });
    }

    // Create the new coupon
    const newCoupon = await _index.default.DiscountCoupon.create({
      code,
      discountPercentage,
      expiresAt,
      productId: req.body.productId
    });
    return res.status(200).json({
      status: "success",
      data: newCoupon
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: 'Server error'
    });
  }
};
exports.createCoupon = createCoupon;
const getCoupons = async (req, res) => {
  try {
    const coupons = await _index.default.DiscountCoupon.findAll({
      include: []
    });
    if (!coupons) {
      return res.status(404).json({
        status: "fail",
        code: 404,
        data: {
          coupons
        },
        message: "No Coupons Found"
      });
    }
    return res.status(200).json({
      status: "success",
      code: 200,
      data: {
        coupons
      },
      message: "These are available coupons"
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: 'Server error'
    });
  }
};
exports.getCoupons = getCoupons;
const getCouponById = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const coupon = await _index.default.DiscountCoupon.findOne({
      where: {
        id: id
      }
    });
    if (!coupon) {
      return res.staus(404).json({
        message: "Coupon not found"
      });
    }
    return res.status(200).json({
      status: "success",
      code: 200,
      data: {
        coupon
      },
      message: "Coupon is available"
    });
  } catch (error) {}
};
exports.getCouponById = getCouponById;
const deleteCouponById = async (req, res) => {
  try {
    const {
      reason
    } = req.body;
    const couponId = parseInt(req.params.id);
    if (isNaN(couponId) || typeof reason !== "string" || reason.trim() === "") {
      return res.status(400).json({
        status: "fail",
        data: {
          message: "Invalid input data"
        }
      });
    }
    const availableCoupon = await _index.default.Product.findOne({
      where: {
        id: productId,
        vendor_id: req.user.id
      }
    });
    if (!availableCoupon) {
      return res.status(401).json({
        status: "fail",
        data: {
          message: "Can not find such Coupon in your collection"
        }
      });
    } else {
      // If the product is found, delete it and return a JSend success response with a message indicating the reason for deletion
      await availableCoupon.destroy();
      return res.status(200).json({
        status: "success",
        data: {
          message: `This Coupon has been removed because of the following reason: ${reason}.`
        }
      });
    }
  } catch (error) {}
};
exports.deleteCouponById = deleteCouponById;
var _default = {
  createCoupon,
  getCoupons,
  getCouponById,
  deleteCouponById
};
exports.default = _default;