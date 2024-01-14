'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.checkDuplicateProductIds = void 0;
const ResponseError_1 = require('../types/ResponseError');
const checkDuplicateProductIds = (req, res, next) => {
  const { orderProducts } = req.body;
  const productIds = orderProducts.map((product) => product.productId);
  const uniqueProductIds = new Set(productIds);
  if (productIds.length !== uniqueProductIds.size) {
    next(new ResponseError_1.ResponseError(400, 'Duplicate productIds found'));
  }
  next();
};
exports.checkDuplicateProductIds = checkDuplicateProductIds;
//# sourceMappingURL=checkDuplicateProductIds.js.map
