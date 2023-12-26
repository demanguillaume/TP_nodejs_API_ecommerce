"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
// POST /user
router.post('/', userController_1.createUser);
// GET /user
router.get('/', userController_1.getAllUsers);
// GET /user/:id
router.get('/:id', userController_1.getUserById);
// PATCH /user/:id
router.patch('/:id', userController_1.updateUserById);
// PATCH /user/:id/role
router.patch('/:id/role', userController_1.updateUserRole);
// DELETE /user/:id
router.delete('/:id', userController_1.deleteUserById);
exports.default = router;
//# sourceMappingURL=userRoute.js.map