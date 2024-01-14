'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.validateUserDatas = void 0;
const express_validator_1 = require('express-validator');
const User_1 = require('../types/User');
const ResponseError_1 = require('../types/ResponseError');
const client_1 = require('@prisma/client');
const validateUserDatas = (allFieldsRequired = false) => [
  (0, express_validator_1.check)('email')
    .optional(!allFieldsRequired)
    .isEmail()
    .withMessage('Email is not valid'),
  (0, express_validator_1.check)('password')
    .optional(!allFieldsRequired)
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
  (0, express_validator_1.check)('firstName')
    .optional(!allFieldsRequired)
    .isLength({ min: 2 })
    .withMessage('First name is not valid'),
  (0, express_validator_1.check)('lastName')
    .optional(!allFieldsRequired)
    .isLength({ min: 2 })
    .withMessage('Last name is not valid'),
  (0, express_validator_1.check)('userRole')
    .optional(!allFieldsRequired)
    .isIn(Object.values(User_1.UserRole))
    .withMessage('Role is not valid'),
  (req, res, next) =>
    __awaiter(void 0, void 0, void 0, function* () {
      console.log('validateUserDatas');
      const errors = (0, express_validator_1.validationResult)(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        return next(
          new ResponseError_1.ResponseError(
            400,
            errorMessages.join(' | '),
            'Validation Error: ' + JSON.stringify(errorMessages),
          ),
        );
      }
      const { email } = req.body;
      if (email) {
        const prisma = new client_1.PrismaClient();
        try {
          console.log('Before database query');
          const user = yield prisma.user.findUnique({ where: { email } });
          console.log('After database query');
          if (user) {
            next(
              new ResponseError_1.ResponseError(
                400,
                'Email already exists',
                'Email already exists',
              ),
            );
          }
          next();
        } catch (error) {
          next(
            new ResponseError_1.ResponseError(
              500,
              'Internal Server Error',
              error,
            ),
          );
        } finally {
          yield prisma.$disconnect();
        }
      }
    }),
];
exports.validateUserDatas = validateUserDatas;
//# sourceMappingURL=validateUserDatas.js.map
