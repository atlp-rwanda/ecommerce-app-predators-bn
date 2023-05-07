"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addProduct = addProduct;
exports.showCatalogue = showCatalogue;
var _jsend = _interopRequireDefault(require("jsend"));
var _index = _interopRequireDefault(require("../database/models/index.js"));
var _eventServices = _interopRequireDefault(require("../services/event.services.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
async function addProduct(req, res) {
  // A seller should be able to Create/Add a product
  try {
    // receive body & Validate user input
    const {
      name,
      description,
      category_id,
      picture_urls,
      expiryDate,
      price,
      instock,
      available
    } = req.body;
    if (!name || !description || !category_id || !price || !picture_urls || !expiryDate || !instock || !available) {
      return res.status(400).json(_jsend.default.fail({
        message: 'Invalid Input😥'
      }));
    }
    // verify the product is not sold by the seller
    const productExists = await _index.default.Product.findOne({
      where: {
        vendor_id: req.user.id,
        name
      }
    });
    if (productExists) {
      return res.status(409).json(_jsend.default.fail({
        message: 'Seller already has this product😥',
        product: name
      }));
    }
    // save product
    const product = await _index.default.Product.create({
      name,
      description,
      category_id,
      picture_urls,
      expiryDate,
      price,
      instock,
      available,
      vendor_id: req.user.id
    });
    _eventServices.default.emit('product:created', product);
    // send response
    return res.status(200).json(_jsend.default.success({
      message: 'Product added to collection.',
      id: product.id
    }));
  } catch (error) {
    // Handle database errors
    console.error(error);
    return res.status(500).json(_jsend.default.error('Failed to save product'));
  }
}
async function showCatalogue(req, res) {
  // A seller should be able to create & viewing a list of available product in my collection

  try {
    const usrId = req.user.id; // the user id of the person who requested the showcase
    console.log('This is the id: ', req.user.id);
    // Retrieve available products
    const products = await _index.default.Product.findAll({
      where: {
        available: true,
        vendor_id: usrId
      }
    });

    // Send response
    res.json(_jsend.default.success({
      products
    }));
  } catch (err) {
    // Handle database errors
    console.error(err);
    res.status(500).json(_jsend.default.error('Failed to retrieve products'));
  }
}