"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.default = void 0;
var _express = require("express");
const router = (0, _express.Router)();
router.use((req, res) => {
  if (req.accepts("html")) {
    res.status(200).send(res.json(req.t("welcome_message")));
  } else if (req.accepts("json")) {
    res.json(req.t("welcome_message"));
  } else {
    res.type("txt").send({
      message: req.t("welcome_message"),
    });
  }
});
var _default = router;
exports.default = _default;
