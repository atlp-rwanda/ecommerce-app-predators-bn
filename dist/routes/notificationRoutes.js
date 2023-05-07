"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _roles = require("../middleware/roles.js");
var _notificationController = require("../controller/notificationController.js");
/* eslint-disable */

const router = (0, _express.Router)();
router.get('/notification', _roles.isSeller, _notificationController.getAllNotifications);
router.put('/:notificationId', _roles.isBuyer, _notificationController.markNotificationAsRead);
router.delete('/:notificationId', _roles.isBuyer, _notificationController.deleteNotification);
var _default = router;
exports.default = _default;