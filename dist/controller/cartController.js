"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _jsend = _interopRequireDefault(require("jsend"));
var _cartItemServices = _interopRequireDefault(require("../services/cartItem.services.js"));
var _productServices = _interopRequireDefault(require("../services/product.services.js"));
var _eventServices = _interopRequireDefault(require("../services/event.services.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class cartController {
  static addCartItem = async (req, res) => {
    try {
      let product_id = req.body.product_id;
      let quantity = req.body.quantity;
      const product = await _productServices.default.getProductById(product_id);
      if (!product) {
        return res.status(404).send(_jsend.default.fail({
          code: 404,
          message: "Product not found",
          data: false
        }));
      }
      const cartData = {
        amount: product.price,
        product_id: product.id,
        quantity: quantity,
        User_id: req.user.id
      };
      const cartItem = await _cartItemServices.default.cartItem(cartData);
      if (!cartItem) {
        return res.status(500).send(_jsend.default.fail({
          code: 500,
          message: "unexpected error",
          data: error
        }));
      }
      _eventServices.default.emit('cart:created', cartItem);
      return res.status(200).send(_jsend.default.success({
        code: 200,
        message: "Product added ",
        data: cartItem
      }));
    } catch (error) {
      return res.status(500).send(_jsend.default.fail({
        code: 500,
        message: "unexpected error",
        data: error
      }));
    }
  };
  static getCartItems = async (req, res) => {
    try {
      const cartItems = await _cartItemServices.default.getCartItems(req.user.id);
      if (!cartItems) {
        return res.status(404).send(_jsend.default.fail({
          code: 404,
          message: "Cart is empty",
          data: "Cart is empty"
        }));
      }
      return res.status(200).send(_jsend.default.fail({
        code: 200,
        message: "Cart items",
        data: cartItems
      }));
    } catch (error) {
      return res.status(500).send(_jsend.default.fail({
        code: 500,
        message: "unexpected error",
        data: error
      }));
    }
  };
  static updateCartItem = async (req, res) => {
    try {
      let product_id = req.params.id;
      ;
      let quantity = req.body.quantity;
      const product = await _productServices.default.getProductById(product_id);
      if (!product) {
        return res.status(404).send(_jsend.default.fail({
          code: 404,
          message: "item not found",
          data: false
        }));
      }
      const cartData = {
        amount: product.price,
        product_id: product.id,
        quantity: quantity,
        User_id: req.user.id
      };
      const cartItem = await _cartItemServices.default.updatecartItem(cartData);
      if (!cartItem) {
        return res.status(500).send(_jsend.default.fail({
          code: 500,
          message: "unexpected error",
          data: error
        }));
      }
      return res.status(200).send(_jsend.default.success({
        code: 200,
        message: "item updated ",
        data: cartItem
      }));

      //commit added
    } catch (error) {
      return res.status(500).send(_jsend.default.fail({
        code: 500,
        message: "unexpected error",
        data: error
      }));
    }
  };
  static ClearCartItem = async (req, res) => {
    try {
      const cart_id = req.params.id;
      const cartData = {
        cart_id,
        User_id: req.user.id
      };
      const cartItems = await _cartItemServices.default.clearCart(cartData);
      if (!cartItems) {
        return res.status(500).send(_jsend.default.fail({
          code: 500,
          message: "cart item not removed",
          data: cartItems
        }));
      }
      return res.status(200).send(_jsend.default.success({
        code: 200,
        message: "item removed in cart",
        data: cartItems
      }));
    } catch (error) {
      return res.status(500).send(_jsend.default.fail({
        code: 500,
        message: "unexpected error",
        data: error
      }));
    }
  };
  static ClearAllCartItem = async (req, res) => {
    try {
      const cartData = {
        User_id: req.user.id
      };
      const cartItems = await _cartItemServices.default.clearAllCart(cartData);
      if (!cartItems) {
        return res.status(404).send(_jsend.default.fail({
          code: 404,
          message: "not cart item found ",
          data: cartItems
        }));
      }
      return res.status(200).send(_jsend.default.success({
        code: 200,
        message: "All items removed, your cart is empty now",
        data: cartItems
      }));
    } catch (error) {
      return res.status(500).send(_jsend.default.fail({
        code: 500,
        message: "unexpected error",
        data: error
      }));
    }
  };
}
exports.default = cartController;