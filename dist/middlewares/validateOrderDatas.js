"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOrderDatas = void 0;
const express_validator_1 = require("express-validator");
const User_1 = require("../types/User");
const ResponseError_1 = require("../types/ResponseError");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.validateOrderDatas = [
    (0, express_validator_1.check)('userId')
        .optional()
        .isInt().withMessage('userId must be an integer'),
    (0, express_validator_1.check)('orderProducts')
        .isArray().withMessage('orderProducts must be an array')
        .notEmpty().withMessage('orderProducts is required'),
    (0, express_validator_1.check)('orderProducts.*.productId')
        .isInt().withMessage('productId must be an integer')
        .notEmpty().withMessage('productId is required'),
    (0, express_validator_1.check)('orderProducts.*.quantity')
        .isInt().withMessage('quantity must be an integer')
        .notEmpty().withMessage('quantity is required'),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg);
            next(new ResponseError_1.ResponseError(400, errorMessages.toString().replace(",", " | "), 'Validation Error: ' + JSON.stringify(errorMessages)));
        }
        else {
            if (req.body.userId === undefined) {
                req.body.userId = res.locals.user.id;
            }
            else if (req.body.userId !== res.locals.user.id) {
                if (![User_1.UserRole.MANAGER, User_1.UserRole.ADMIN].includes(res.locals.user.role)) {
                    next(new ResponseError_1.ResponseError(403, 'Forbidden order', 'Only managers and admins can create an order for another user'));
                }
            }
            // Check if the user exists
            const user = yield prisma.user.findUnique({ where: { id: req.body.userId } });
            if (!user) {
                next(new ResponseError_1.ResponseError(404, 'User not found', 'The provided userId does not exist in the database'));
            }
            next();
        }
    }),
];
//# sourceMappingURL=validateOrderDatas.js.map