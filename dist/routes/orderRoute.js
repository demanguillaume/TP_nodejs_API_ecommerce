"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authorizeByRole_1 = require("../middlewares/authorizeByRole ");
const orderController_1 = require("../controllers/orderController");
const User_1 = require("../models/User");
const router = express_1.default.Router();
// CREATE /order
router.post('/', (0, authorizeByRole_1.authorizeByRole)([User_1.UserRole.USER, User_1.UserRole.MANAGER]), orderController_1.createOrder);
// READ ALL /order
router.get('/', (0, authorizeByRole_1.authorizeByRole)([User_1.UserRole.MANAGER]), orderController_1.getAllOrders);
// READ BY ID /order/:id
router.get('/:id', (0, authorizeByRole_1.authorizeByRole)([User_1.UserRole.USER, User_1.UserRole.MANAGER]), orderController_1.getOrderById);
// UPDATE BY ID /order/:id
router.patch('/:id', (0, authorizeByRole_1.authorizeByRole)([User_1.UserRole.USER, User_1.UserRole.MANAGER]), orderController_1.updateOrderById);
// DELETE BY ID /order/:id
router.delete('/:id', (0, authorizeByRole_1.authorizeByRole)([User_1.UserRole.USER, User_1.UserRole.MANAGER]), orderController_1.deleteOrderById);
exports.default = router;
//# sourceMappingURL=orderRoute.js.map