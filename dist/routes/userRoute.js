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
const validateUserRegistration_1 = require("../middlewares/validateUserRegistration");
const User_1 = require("../types/User");
const router = express_1.default.Router();
// POST /user
router.post('/', (0, validateUserRegistration_1.validateUserRegistration)(true), (0, authorizeByRole_1.authorizeByRole)([User_1.UserRole.ADMIN]), userController_1.createUser);
// GET /user
router.get('/', (0, authorizeByRole_1.authorizeByRole)([User_1.UserRole.ADMIN]), userController_1.getAllUsers);
// GET /user/:id
router.get('/:id', (0, authorizeByRole_1.authorizeByRole)([User_1.UserRole.ADMIN]), userController_1.getUserById);
// PATCH /user/:id
router.patch('/:id', (0, authorizeByRole_1.authorizeByRole)([User_1.UserRole.ADMIN]), userController_1.updateUserById);
// PATCH /user/:id/role
router.patch('/:id/role', (0, authorizeByRole_1.authorizeByRole)([User_1.UserRole.ADMIN]), userController_1.updateUserRole);
// DELETE /user/:id
router.delete('/:id', (0, authorizeByRole_1.authorizeByRole)([User_1.UserRole.ADMIN]), userController_1.deleteUserById);
exports.default = router;
//# sourceMappingURL=userRoute.js.map