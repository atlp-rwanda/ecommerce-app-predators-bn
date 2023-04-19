"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _index = _interopRequireDefault(require("../database/models/index.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// getting all products

const getAllProducts = async (req, res) => {
  try {
    const products = await _index.default.Product.findAll({
      include: []
    });
    if (!products) {
      return res.status(404).json({
        status: 'fail',
        code: 404,
        data: {
          products
        },
        message: 'No product found'
      });
    }
    return res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        products
      },
      message: 'Products retreived successfully'
    });
  } catch (error) {
    return res.status(500).json({
      status: 'server error',
      code: 500,
      data: {
        message: 'Server error!!'
      }
    });
  }
};

// Getting Product by Id

const getProductById = async (req, res) => {
  const {
    id
  } = req.params;
  try {
    const product = await _index.default.Product.findOne({
      where: {
        id
      }
    });
    if (!product) {
      return res.status(404).json({
        status: 'fail',
        code: 404,
        data: {
          product
        },
        message: 'There is no item found'
      });
    }
    return res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        product
      },
      message: 'Product retrieved Successfully'
    });
  } catch (err) {
    return res.status(500).json({
      status: 'server error',
      code: 500,
      data: {
        message: 'Server error . Try again later'
      }
    });
  }
};
var _default = {
  getAllProducts,
  getProductById
};
exports.default = _default;