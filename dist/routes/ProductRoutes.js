"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _productController = require("../controller/productController.js");
var _productListingController = require("../controller/productListingController.js");
var _roles = require("../middleware/roles.js");
var _searchController = _interopRequireDefault(require("../controller/search.controller.js"));
var _express = require("express");
var _jsend = _interopRequireDefault(require("jsend"));
var _prodController = require("../controller/prodController.js");
var _index = _interopRequireDefault(require("../database/models/index.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = (0, _express.Router)();
router.param('userId', async (req, res, next, id) => {
  // try to get the user details from the User model and attach it to the request object
  const user = await _index.default.User.findOne({
    where: {
      id,
      roleId: 1
    }
  });
  if (user) {
    console.log('found the seller');
    req.user = user; // assign the user to the request object
    next(); // and pass it to the next middleware/routes/callable, if any. e.g.: req.params.userId
  } else {
    console.log('seller not found');
    res.status(400).json(_jsend.default.fail({
      message: 'user not found😥'
    }));
  }
});
router.post('/product', _roles.isSeller, _prodController.addProduct);
router.get('/product/available/:userId', _prodController.showCatalogue);
router.get('/product', _productController.getAllProducts);
router.get('/product/:id', _productController.getProductById);
router.put('/product/:id', _roles.isSeller, _productController.updateProduct);
router.delete('/product/:id', _roles.isSeller, _productController.deleteSpecificProduct);
router.get('/products/search', _searchController.default);
router.get('/user/products', _roles.isBuyer, _productListingController.get_available_products);
router.get('/vendor/collection', _roles.isSeller, _productListingController.get_collection);
var _default = router;
exports.default = _default;