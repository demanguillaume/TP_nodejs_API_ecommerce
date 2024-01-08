"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserDatas = void 0;
const express_validator_1 = require("express-validator");
const User_1 = require("../types/User");
const ResponseError_1 = require("../types/ResponseError");
const client_1 = require("@prisma/client");
const validateUserDatas = (requireUserRole = false) => [
    (0, express_validator_1.check)('email').isEmail().withMessage('Email is not valid'),
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
    ...(requireUserRole ? [(0, express_validator_1.check)('userRole').isIn(Object.values(User_1.UserRole)).withMessage('Role is not valid')] : []),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg);
            next(new ResponseError_1.ResponseError(400, errorMessages.toString().replace(",", " | "), 'Validation Error: ' + JSON.stringify(errorMessages)));
        }
        const prisma = new client_1.PrismaClient();
        const { email } = req.body;
        prisma.user.findUnique({ where: { email } })
            .then((user) => {
            if (user) {
                next(new ResponseError_1.ResponseError(400, 'Email already exists', 'Email already exists'));
            }
            else {
                next();
            }
        })
            .catch((error) => {
            next(new ResponseError_1.ResponseError(500, 'Internal Server Error', error.message));
        });
    },
];
exports.validateUserDatas = validateUserDatas;
//# sourceMappingURL=validateUserDatas.js.map