"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateProduct = exports.getProductById = exports.getAllProducts = exports.deleteSpecificProduct = exports.default = void 0;
var _joi = _interopRequireDefault(require("joi"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _index = _interopRequireDefault(require("../database/models/index.js"));
var _productServices = require("../services/product.services.js");
var _eventServices = _interopRequireDefault(require("../services/event.services.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* eslint-disable camelcase */

// getting all products

const getAllProducts = async (req, res) => {
  try {
    const products = await _index.default.Product.findAll({
      include: []
    });
    const totalProducts = products.length;
    if (!products) {
      return res.status(404).json({
        status: "fail",
        code: 404,
        data: {
          products
        },
        message: "No product found"
      });
    }
    return res.status(200).json({
      status: "success",
      code: 200,
      message: `Products retreived successfully, total products: ${totalProducts}`,
      data: {
        products
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "server error",
      code: 500,
      data: {
        message: "Server error!!"
      }
    });
  }
};

// Getting Product by Id
exports.getAllProducts = getAllProducts;
const getProductById = async (req, res) => {
  try {
    const {
      id
    } = req.params;

    // Check if item exists and retrieve details
    const item = await _index.default.Product.findOne({
      where: {
        id: id
      }
    });
    if (!item) return (0, _productServices.handleItemNotFound)(res);
    const authHeader = req.headers.authorization;
    if (!authHeader) return (0, _productServices.handleBuyerScenario)(res, item);
    const token = authHeader.split(" ")[1];
    let decoded;
    try {
      decoded = _jsonwebtoken.default.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return (0, _productServices.handleUnauthorized)(res);
    }
    if (decoded.roleId === 1) {
      if (item.vendor_id !== decoded.id) {
        return (0, _productServices.handleSellerWithoutAccess)(res);
      }
      return (0, _productServices.handleSellerScenario)(res, item);
    }
    return (0, _productServices.handleBuyerScenario)(res, item);
  } catch (error) {
    return (0, _productServices.handleServerError)(res);
  }
};
exports.getProductById = getProductById;
const updateProduct = async (req, res) => {
  const {
    id
  } = req.params;
  if (!id) {
    return res.status(400).json({
      error: "id is required"
    });
  }
  const inputData = req.body;
  const schema = _joi.default.object({
    name: _joi.default.string().required(),
    description: _joi.default.string().required(),
    price: _joi.default.number().positive().required(),
    expiryDate: _joi.default.date().required(),
    picture_urls: _joi.default.array().items(_joi.default.string()),
    instock: _joi.default.number().integer().positive().required(),
    available: _joi.default.string().valid("yes", "no").required()
  });
  const {
    error
  } = schema.validate(inputData);
  if (error) return res.status(400).json({
    error: error.details[0].message
  });
  const item = await _index.default.Product.findOne({
    where: {
      id,
      vendor_id: req.user.id
    }
  });
  if (!item) {
    return res.status(404).json({
      error: "Item not found in seller's collection"
    });
  }
  Object.assign(item, inputData);
  await item.save();
  _eventServices.default.emit('product:updated', item);
  const {
    name,
    description,
    price,
    picture_urls,
    Instock,
    available,
    expiryDate
  } = item;
  return res.json({
    status: 200,
    message: "Item updated successfully",
    item: {
      id,
      name,
      description,
      price,
      picture_urls,
      Instock,
      available,
      expiryDate
    }
  });
};
exports.updateProduct = updateProduct;
const deleteSpecificProduct = async (req, res) => {
  try {
    const {
      reason
    } = req.body;
    const productId = parseInt(req.params.id);
    if (isNaN(productId) || typeof reason !== "string" || reason.trim() === "") {
      return res.status(400).json({
        status: "fail",
        data: {
          message: "Invalid input data"
        }
      });
    }
    const isAvailable = await _index.default.Product.findOne({
      where: {
        id: productId,
        vendor_id: req.user.id
      }
    });
    if (!isAvailable) {
      return res.status(401).json({
        status: "fail",
        data: {
          message: "Can not find such product in your collection"
        }
      });
    } else {
      _eventServices.default.emit('product:removed', isAvailable);
      await isAvailable.destroy();
      return res.status(200).json({
        status: "success",
        data: {
          message: `This product has been removed because of the following reason: ${reason}.`
        }
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      data: {
        message: "Oops, something went wrong on the server side. Please try again later."
      }
    });
  }
};
exports.deleteSpecificProduct = deleteSpecificProduct;
var _default = {
  getAllProducts,
  getProductById,
  updateProduct,
  deleteSpecificProduct
};
exports.default = _default;