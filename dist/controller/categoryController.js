"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addCategory = addCategory;
exports.default = void 0;
exports.deleteCategory = deleteCategory;
exports.updateCategory = updateCategory;
exports.viewAllCategories = viewAllCategories;
var _index = _interopRequireDefault(require("../database/models/index.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Category = _index.default.Category;

// A seller should be able to Create/Add a category
async function addCategory(req, res) {
  try {
    // receive body & Validate user input
    const {
      name
    } = req.body;
    if (!name) {
      return res.status(400).json({
        message: "Invalid Input😥"
      });
    }
    // verify the category is not sold by the seller
    const categoryExists = await Category.findOne({
      where: {
        name
      }
    });
    if (categoryExists) {
      return res.status(409).json({
        message: "Category already exists😥",
        category: name
      });
    }
    // save category
    const category = await Category.create({
      name
    });
    // send response
    return res.status(200).json({
      message: "Category added to collection.",
      id: category.id
    });
  } catch (error) {
    // Handle database errors
    console.error(error);
    return res.status(500).json({
      message: "Failed to save category"
    });
  }
}

// A seller should be able to Update a category
async function updateCategory(req, res) {
  try {
    // receive body & Validate user input
    const {
      id
    } = req.params;
    const {
      name
    } = req.body;
    if (!name) {
      return res.status(400).json({
        message: "Invalid Input😥"
      });
    }
    // verify the category is not sold by the seller
    const categoryExists = await Category.findOne({
      where: {
        id: id
      }
    });
    if (!categoryExists) {
      return res.status(409).json({
        message: "Category does not exist😥",
        category: name
      });
    }
    // save category
    categoryExists.name = name;
    const category = await categoryExists.save();
    // send response
    return res.status(200).json({
      message: "Category updated.",
      data: category
    });
  } catch (error) {
    // Handle database errors
    console.error(error);
    return res.status(500).json({
      message: "Failed to update category"
    });
  }
}

// A seller should be able to Delete a category
async function deleteCategory(req, res) {
  try {
    // receive body & Validate user input
    const {
      id
    } = req.params;
    // verify the category is not sold by the seller
    const categoryExists = await Category.findOne({
      where: {
        id: id
      }
    });
    if (!categoryExists) {
      return res.status(409).json({
        message: "Category does not exist😥",
        data: {
          categoryExists
        }
      });
    }
    // save category
    const category = await Category.destroy({
      where: {
        id: id
      }
    });
    // send response
    return res.status(200).json({
      message: "Category deleted.",
      data: {
        category
      }
    });
  } catch (error) {
    // Handle database errors
    console.error(error);
    return res.status(500).json({
      message: "Failed to delete category"
    });
  }
}

// A seller should be able to View all categories
async function viewAllCategories(req, res) {
  try {
    const categoryExists = await Category.findAll({
      include: []
    });
    console.log(categoryExists);
    if (!categoryExists) {
      return res.status(409).json({
        message: "Category does not exist😥",
        data: {
          categoryExists
        }
      });
    }
    // send response
    return res.status(200).json({
      message: "Category retreived successfully.",
      data: {
        categoryExists
      }
    });
  } catch (error) {
    // Handle database errors
    console.error(error);
    return res.status(500).json({
      message: "Failed to get category"
    });
  }
}
var _default = {
  addCategory,
  updateCategory,
  deleteCategory,
  viewAllCategories
};
exports.default = _default;