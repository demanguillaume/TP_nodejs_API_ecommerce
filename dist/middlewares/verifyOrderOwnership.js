'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.verifyOrderOwnership = void 0;
const User_1 = require('../types/User');
const ResponseError_1 = require('../types/ResponseError');
const verifyOrderOwnership = (req, res, next) => {
  // Assuming req.user and req.order are populated
  const user = res.locals.user;
  const order = res.locals.order;
  // If the user role is USER, check if the order belongs to the user
  if (user.role === User_1.UserRole.USER && order.userId !== user.id) {
    next(
      new ResponseError_1.ResponseError(
        403,
        'You are not allowed to access this resource',
      ),
    );
  } else {
    next();
  }
};
exports.verifyOrderOwnership = verifyOrderOwnership;
//# sourceMappingURL=verifyOrderOwnership.js.map
