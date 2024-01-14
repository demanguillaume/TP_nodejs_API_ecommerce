'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.validateUserRegistration = void 0;
const express_validator_1 = require('express-validator');
const User_1 = require('../types/User');
const ResponseError_1 = require('../types/ResponseError');
const validateUserRegistration = (requireUserRole = false) => [
  (0, express_validator_1.check)('email').isEmail(),
  (0, express_validator_1.check)('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/\d/)
    .withMessage('Password must contain a number')
    .matches(/[a-z]/)
    .withMessage('Password must contain a lowercase letter')
    .matches(/[A-Z]/)
    .withMessage('Password must contain an uppercase letter')
    .matches(/[^a-zA-Z0-9]/)
    .withMessage('Password must contain a special character'),
  (0, express_validator_1.check)('firstName').isLength({ min: 2 }),
  (0, express_validator_1.check)('lastName').isLength({ min: 2 }),
  ...(requireUserRole
    ? [
        (0, express_validator_1.check)('UserRole').isIn(
          Object.values(User_1.UserRole),
        ),
      ]
    : []),
  (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
      next(
        new ResponseError_1.ResponseError(
          400,
          JSON.stringify(errors.array()),
          'Validation Error : ' + JSON.stringify(errors.array()),
        ),
      );
    }
    next();
  },
];
exports.validateUserRegistration = validateUserRegistration;
//# sourceMappingURL=validateUserRegistration.js.map
