"use strict";

var _app = _interopRequireDefault(require("./app.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// Import app

const PORT = process.env.PORT || 3000;
// Listen to Port ( default: 3000 )
_app.default.listen(PORT, () => {
  console.log("I am in " + process.env.NODE_ENV + " environment");
  console.log(`[Server@${PORT}] On`);
});