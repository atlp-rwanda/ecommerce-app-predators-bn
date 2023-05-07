"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleUnauthorized = exports.handleServerError = exports.handleSellerWithoutAccess = exports.handleSellerScenario = exports.handleItemNotFound = exports.handleBuyerScenario = exports.default = void 0;
var _index = _interopRequireDefault(require("../database/models/index.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const handleItemNotFound = res => {
  return res.status(404).json({
    status: 'fail',
    code: 404,
    error: 'Item not found'
  });
};
exports.handleItemNotFound = handleItemNotFound;
const handleUnauthorized = res => {
  return res.status(401).json({
    status: 'fail',
    code: 401,
    error: 'Unauthorized'
  });
};
exports.handleUnauthorized = handleUnauthorized;
const handleSellerWithoutAccess = res => {
  return res.status(403).json({
    status: 'fail',
    code: 403,
    error: 'You do not have access to this item'
  });
};
exports.handleSellerWithoutAccess = handleSellerWithoutAccess;
const handleSellerScenario = (res, item) => {
  return res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      message: 'Item retrieved successfully',
      item
    }
  });
};
exports.handleSellerScenario = handleSellerScenario;
const handleBuyerScenario = (res, item) => {
  if (item.available) {
    return res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        item
      },
      message: 'Item retrieved successfully'
    });
  }
  return handleItemNotFound(res);
};
exports.handleBuyerScenario = handleBuyerScenario;
const handleServerError = res => {
  return res.status(500).json({
    status: 'error',
    code: 500,
    error: 'Server error'
  });
};

//getProductById
exports.handleServerError = handleServerError;
class productDetail {
  static getProductById = async id => {
    try {
      const Product = await _index.default.Product.findOne({
        where: {
          id: id
        }
      });
      if (!Product) {
        return false;
      }
      return Product;
    } catch (error) {
      return false;
    }
  };
}
exports.default = productDetail;