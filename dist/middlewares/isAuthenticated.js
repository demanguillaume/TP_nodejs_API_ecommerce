'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.isAuthenticated = void 0;
const passport_1 = __importDefault(require('passport'));
const ResponseError_1 = require('../types/ResponseError');
const isAuthenticated = (req, res, next) => {
  passport_1.default.authenticate('jwt', { session: false }, (err, user) => {
    if (err) {
      next(
        new ResponseError_1.ResponseError(
          401,
          'Error during authication',
          err.message,
        ),
      );
    }
    if (!user) {
      next(
        new ResponseError_1.ResponseError(
          401,
          'Authentication failed',
          'Invalid token',
        ),
      );
    }
    res.locals.user = user;
    next();
  })(req, res, next);
};
exports.isAuthenticated = isAuthenticated;
//# sourceMappingURL=isAuthenticated.js.map
