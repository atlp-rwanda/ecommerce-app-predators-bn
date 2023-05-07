"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getWishlist = exports.deleteFromWishlist = exports.default = exports.addWishlist = void 0;
var _index = _interopRequireDefault(require("../database/models/index.js"));
var _eventServices = _interopRequireDefault(require("../services/event.services.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// Import necessary dependencies

// Route to handle the POST request to add an item to the wishlist
const addWishlist = async (req, res) => {
  try {
    // Retrieve the product details from the database
    const product = await _index.default.Product.findByPk(req.body.productId);
    const duplicate = await _index.default.wishlist.findOne({
      where: {
        userId: req.user.id,
        productId: req.body.productId
      }
    });
    if (duplicate) {
      throw Error(`${product.name} is already in wishlist.`);
    }
    // Add the item to the buyer's wishlist
    await _index.default.wishlist.create({
      userId: req.user.id,
      productId: req.body.productId
    });
    // Retrieve the updated wishlist for the buyer
    const wishlist = await _index.default.wishlist.findAll({
      where: {
        userId: req.user.id
      },
      include: [{
        model: _index.default.Product,
        attributes: ['name', 'price', "picture_urls"]
      }]
    });
    // Update the buyer's record in the users table with the new wishlist data
    await _index.default.User.update({
      wishlist: wishlist.map(item => item.Product)
    }, {
      where: {
        id: req.user.id
      }
    });
    _eventServices.default.emit('wishlist:add', product);
    // Send a confirmation message to the frontend
    res.status(201).json({
      message: `Product ${product.name} added to wishlist.`,
      wishlist
    });
  } catch (error) {
    res.status(400).send({
      status: "fail",
      message: "Encountered Error",
      data: {
        error: error.message
      }
    });
  }
};
exports.addWishlist = addWishlist;
const deleteFromWishlist = async (req, res) => {
  try {
    const productId = req.params.productId;
    const wishlistItem = await _index.default.wishlist.findOne({
      where: {
        userId: req.user.id,
        productId
      }
    });
    if (!wishlistItem) {
      throw Error('Item not found in wishlist.');
    }
    await wishlistItem.destroy();
    const wishlist = await _index.default.wishlist.findAll({
      where: {
        userId: req.user.id
      },
      include: [{
        model: _index.default.Product,
        attributes: ['name', 'price', 'picture_urls']
      }]
    });
    await _index.default.User.update({
      wishlist: wishlist.map(item => item.Product)
    }, {
      where: {
        id: req.user.id
      }
    });
    _eventServices.default.emit('wishlist:remove', wishlistItem);
    res.status(200).json({
      message: 'Item removed from wishlist.',
      wishlist
    });
  } catch (error) {
    res.status(400).send({
      status: 'fail',
      message: 'Encountered Error',
      data: {
        error: error.message
      }
    });
  }
};
exports.deleteFromWishlist = deleteFromWishlist;
const getWishlist = async (req, res) => {
  //TODO: Implement pagination, search, and sort options. 描述：获
  try {
    const wishlist = await _index.default.wishlist.findAll({
      where: {
        userId: req.user.id
      },
      include: [{
        model: _index.default.Product,
        attributes: ['name', 'price', 'picture_urls']
      }]
    });
    res.status(200).json({
      message: "item successfully retrieved",
      wishlist
    });
  } catch (error) {
    res.status(400).send({
      status: 'fail',
      message: 'Encountered Error',
      data: {
        error: error.message
      }
    });
  }
};
exports.getWishlist = getWishlist;
var _default = {
  addWishlist,
  deleteFromWishlist,
  getWishlist
};
exports.default = _default;