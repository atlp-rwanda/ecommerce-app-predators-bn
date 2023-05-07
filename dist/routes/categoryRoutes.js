"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _categoryController = require("../controller/categoryController.js");
const router = (0, _express.Router)();

// A seller should be able to add a category
router.post('/', _categoryController.addCategory);

// A seller should be able to update a category
router.put('/:id', _categoryController.updateCategory);
// A seller should be able to View all categories
router.get('/', _categoryController.viewAllCategories);

// A seller should be able to delete a category by id
router.delete('/:id', _categoryController.deleteCategory);
var _default = router;
exports.default = _default;