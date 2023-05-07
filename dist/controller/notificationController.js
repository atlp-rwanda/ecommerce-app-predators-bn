"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.markNotificationAsRead = exports.getAllNotifications = exports.deleteNotification = exports.default = void 0;
var _index = _interopRequireDefault(require("../database/models/index.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Notification = _index.default.Notification;

// Retrieve all notifications for the logged-in user
const getAllNotifications = async (req, res) => {
  const userId = req.user.id;
  const {
    page = 1,
    limit = 10
  } = req.query;
  try {
    const notifications = await Notification.findAndPaginateAll({
      page,
      limit,
      where: {
        user_id: userId
      }
    });
    const totalNofications = notifications.length;
    res.status(200).json({
      message: `Notifications retrieved successfully, total notifications: ${totalNofications}`,
      notifications
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error retrieving notifications'
    });
  }
};

// Mark a notification as read for the logged-in user
exports.getAllNotifications = getAllNotifications;
const markNotificationAsRead = async (req, res) => {
  const notificationId = req.params.notificationId;
  const userId = req.user.id;
  try {
    const notification = await Notification.findOne({
      where: {
        id: notificationId,
        user_id: userId
      }
    });
    if (!notification) {
      return res.status(404).json({
        message: 'Notification not found'
      });
    }
    notification.read = true;
    await notification.save();
    res.status(200).json(notification);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error marking notification as read'
    });
  }
};

// Delete a notification for the logged-in user
exports.markNotificationAsRead = markNotificationAsRead;
const deleteNotification = async (req, res) => {
  const notificationId = req.params.notificationId;
  const userId = req.user.id;
  try {
    const notification = await Notification.findOne({
      where: {
        id: notificationId,
        user_id: userId
      }
    });
    if (!notification) {
      return res.status(404).json({
        message: 'Notification not found'
      });
    }
    await notification.destroy();
    res.status(200).json({
      message: 'Notification deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error deleting notification'
    });
  }
};
exports.deleteNotification = deleteNotification;
var _default = {
  getAllNotifications,
  markNotificationAsRead,
  deleteNotification
};
exports.default = _default;