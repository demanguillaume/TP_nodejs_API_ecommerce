"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
//import { UserRole } from '../types/User';
// MIDDLEWARES
const authorizeByRole_1 = require("../middlewares/authorizeByRole");
const validateUserDatas_1 = require("../middlewares/validateUserDatas");
const User_1 = require("../types/User");
const sendJsonResponse_1 = require("../middlewares/sendJsonResponse");
const router = express_1.default.Router();
// CREATE /user
router.post('/', (0, validateUserDatas_1.validateUserDatas)(true), (0, authorizeByRole_1.authorizeByRole)([User_1.UserRole.ADMIN]), userController_1.createUser, (0, sendJsonResponse_1.sendJsonResponse)('user'));
// READ ALL /user
router.get('/', (0, authorizeByRole_1.authorizeByRole)([User_1.UserRole.ADMIN]), userController_1.getAllUsers, (0, sendJsonResponse_1.sendJsonResponse)('users'));
// READ BY ID /user/:id
router.get('/:id', (0, authorizeByRole_1.authorizeByRole)([User_1.UserRole.ADMIN]), userController_1.getUserById, (0, sendJsonResponse_1.sendJsonResponse)('user'));
// UPDATE /user/:id
router.patch('/:id', (0, validateUserDatas_1.validateUserDatas)(false), (0, authorizeByRole_1.authorizeByRole)([User_1.UserRole.ADMIN]), userController_1.updateUserById, (0, sendJsonResponse_1.sendJsonResponse)('user'));
// DELETE /user/:id
router.delete('/:id', (0, authorizeByRole_1.authorizeByRole)([User_1.UserRole.ADMIN]), userController_1.deleteUserById, (0, sendJsonResponse_1.sendJsonResponse)('message'));
exports.default = router;
//# sourceMappingURL=userRoute.js.map