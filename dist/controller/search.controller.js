"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchProducts = exports.default = void 0;
var _sequelize = require("sequelize");
var _index = _interopRequireDefault(require("../database/models/index.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const searchProducts = async (req, res, next) => {
  try {
    const {
      name,
      category,
      description,
      price,
      keyword,
      page = 1,
      limit = 1
    } = req.query;
    let query = {};
    // Search by keyword or phrase
    if (keyword) {
      query = {
        [_sequelize.Op.or]: [{
          name: {
            [_sequelize.Op.iLike]: `%${keyword}%`
          }
        }, {
          description: {
            [_sequelize.Op.iLike]: `%${keyword}%`
          }
        }]
      };
    }
    // Search by name
    if (name) {
      query["$Product.name$"] = {
        [_sequelize.Op.like]: name
      };
    }
    // search by  description
    if (description) {
      query["$Product.description$"] = {
        [_sequelize.Op.like]: description
      };
    }
    // Search by category
    if (category) {
      query["$Category.name$"] = {
        [_sequelize.Op.eq]: category
      };
    }
    // Search by price
    if (price) {
      query.price = {
        [_sequelize.Op.eq]: price
      };
    }
    const offset = (page - 1) * limit;
    const products = await _index.default.Product.findAndCountAll({
      where: query,
      limit,
      offset
    });
    if (products.count <= 0) {
      res.status(404).json({
        status: "fail",
        message: ":no_entry_sign: Oops...no product found at the moment."
      });
    } else {
      // Find related products based on the category of the searched product
      const relatedProducts = await _index.default.Product.findAndCountAll({
        where: {
          category_id: products.rows[0].category_id,
          id: {
            [_sequelize.Op.not]: products.rows[0].id
          }
          // Exclude the searched product's name and category from related products
        },

        limit: 10 // limit to 5 related products
      });

      // Return related products
      res.status(200).json({
        status: "success",
        message: `:rocket:${products.count} Products Found Successfully.:rocket:`,
        data: products.rows.map(product => ({
          id: product.id,
          name: product.name,
          category_id: product.category_id,
          price: product.price,
          picture_urls: product.picture_urls,
          description: product.description
        })),
        recommended_products: `You may also like these related products:`,
        related: relatedProducts.rows.map(product => ({
          id: product.id,
          name: product.name,
          category_id: product.category_id,
          price: product.price,
          picture_urls: product.picture_urls,
          description: product.description
        })),
        pagination: {
          page,
          totalPages: Math.ceil(products.count / limit)
        },
        user: req.user // Add the user object to the response
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "fail",
      message: error.message
    });
  }
};
exports.searchProducts = searchProducts;
var _default = searchProducts;
exports.default = _default;