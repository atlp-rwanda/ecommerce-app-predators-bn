"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _i18next = _interopRequireDefault(require("i18next"));
var _i18nextFsBackend = _interopRequireDefault(require("i18next-fs-backend"));
var _i18nextHttpMiddleware = _interopRequireDefault(require("i18next-http-middleware"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// multiple language

_i18next.default.use(_i18nextFsBackend.default).use(_i18nextHttpMiddleware.default.LanguageDetector).init({
  fallbackLng: 'en',
  backend: {
    loadPath: './locales/{{lng}}/translation.json'
  }
});
var _default = _i18next.default;
exports.default = _default;