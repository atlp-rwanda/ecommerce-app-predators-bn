"use strict";

var _app = _interopRequireDefault(require("./app.js"));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
// Import app

const PORT = process.env.PORT || 3000;

// Listen to Port ( default: 3000 )
_app.default.listen(PORT, () => {
  if (process.env.NODE_ENV == "test") {
    console.log("I am in " + process.env.NODE_ENV + " environment");
  } else if (process.env.NODE_ENV == "development") {
    console.log("I am in " + process.env.NODE_ENV + " environment");
  } else {
    console.log("I am in " + process.env.NODE_ENV + " environment");
  }
  console.log(`[Server@${PORT}] On`);
});
