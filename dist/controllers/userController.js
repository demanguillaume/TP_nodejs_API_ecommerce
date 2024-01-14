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
exports.deleteUserById = exports.updateUserRole = exports.updateUserById = exports.getUserById = exports.getAllUsers = exports.createUser = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = require("bcrypt");
const ResponseError_1 = require("../types/ResponseError");
const prisma = new client_1.PrismaClient();
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, role, firstName, lastName } = req.body;
        const hashedPassword = yield (0, bcrypt_1.hash)(password, 10);
        const user = yield prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                role,
                firstName,
                lastName,
            },
        });
        res.status(201);
        res.locals.user = user;
        next();
    }
    catch (error) {
        next(new ResponseError_1.ResponseError(500, 'Internal server error', error));
    }
});
exports.createUser = createUser;
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma.user.findMany();
        if (users.length === 0) {
            next(new ResponseError_1.ResponseError(404, 'No users found'));
        }
        else {
            res.status(200);
            res.locals.users = users;
            next();
        }
    }
    catch (error) {
        next(new ResponseError_1.ResponseError(500, 'Internal server error', error));
    }
});
exports.getAllUsers = getAllUsers;
const getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        const user = yield prisma.user.findUnique({
            where: {
                id: Number(userId),
            },
        });
        if (!user) {
            next(new ResponseError_1.ResponseError(404, 'User not found'));
        }
        else {
            res.status(200);
            res.locals.user = user;
            next();
        }
    }
    catch (error) {
        next(new ResponseError_1.ResponseError(500, 'Internal server error', error));
    }
});
exports.getUserById = getUserById;
const updateUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const { email, password, firstName, lastName, role } = req.body;
    let updateData = {};
    if (email) {
        updateData.email = email;
    }
    if (password) {
        const hashedPassword = yield (0, bcrypt_1.hash)(password, 10);
        updateData.password = hashedPassword;
    }
    if (firstName) {
        updateData.firstName = firstName;
    }
    if (lastName) {
        updateData.lastName = lastName;
    }
    if (role) {
        updateData.role = role;
    }
    try {
        const user = yield prisma.user.update({
            where: {
                id: Number(userId),
            },
            data: updateData,
        });
        res.status(200);
        res.locals.user = user;
        next();
    }
    catch (error) {
        next(new ResponseError_1.ResponseError(500, 'Internal server error', error));
    }
});
exports.updateUserById = updateUserById;
const updateUserRole = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const { role } = req.body;
    try {
        const user = yield prisma.user.update({
            where: {
                id: Number(userId),
            },
            data: {
                role,
            },
        });
        res.status(200);
        res.locals.user = user;
        next();
    }
    catch (error) {
        next(new ResponseError_1.ResponseError(500, 'Internal server error', error));
    }
});
exports.updateUserRole = updateUserRole;
const deleteUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        yield prisma.user.delete({
            where: {
                id: Number(userId),
            },
        });
        res.status(200);
        res.locals.message = 'User deleted successfully';
        next();
    }
    catch (error) {
        next(new ResponseError_1.ResponseError(500, 'Internal server error', error));
    }
});
exports.deleteUserById = deleteUserById;
//# sourceMappingURL=userController.js.map