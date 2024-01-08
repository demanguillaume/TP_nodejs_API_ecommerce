"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderController_1 = require("../controllers/orderController");
const User_1 = require("../types/User");
//MIDDLEWARES
const authorizeByRole_1 = require("../middlewares/authorizeByRole");
const verifyOrderOwnership_1 = require("../middlewares/verifyOrderOwnership");
const sendJsonResponse_1 = require("../middlewares/sendJsonResponse");
const checkDuplicateProductIds_1 = require("../middlewares/checkDuplicateProductIds");
const validateOrderDatas_1 = require("../middlewares/validateOrderDatas");
const router = express_1.default.Router();
// CREATE /order
router.post('/', (0, authorizeByRole_1.authorizeByRole)([User_1.UserRole.USER, User_1.UserRole.MANAGER, User_1.UserRole.ADMIN]), validateOrderDatas_1.validateOrderDatas, checkDuplicateProductIds_1.checkDuplicateProductIds, orderController_1.createOrder, (0, sendJsonResponse_1.sendJsonResponse)('order'));
// READ ALL /order
router.get('/', (0, authorizeByRole_1.authorizeByRole)([User_1.UserRole.MANAGER, User_1.UserRole.ADMIN]), orderController_1.getAllOrders, (0, sendJsonResponse_1.sendJsonResponse)('orders'));
// READ BY ID /order/:id
router.get('/:id', (0, authorizeByRole_1.authorizeByRole)([User_1.UserRole.USER, User_1.UserRole.MANAGER, User_1.UserRole.ADMIN]), orderController_1.getOrderById, verifyOrderOwnership_1.verifyOrderOwnership, (0, sendJsonResponse_1.sendJsonResponse)('order'));
// UPDATE BY ID /order/:id
router.patch('/:id', (0, authorizeByRole_1.authorizeByRole)([User_1.UserRole.USER, User_1.UserRole.MANAGER, User_1.UserRole.ADMIN]), validateOrderDatas_1.validateOrderDatas, checkDuplicateProductIds_1.checkDuplicateProductIds, orderController_1.getOrderById, verifyOrderOwnership_1.verifyOrderOwnership, orderController_1.updateOrderById, (0, sendJsonResponse_1.sendJsonResponse)('order'));
// DELETE BY ID /order/:id
router.delete('/:id', (0, authorizeByRole_1.authorizeByRole)([User_1.UserRole.USER, User_1.UserRole.MANAGER, User_1.UserRole.ADMIN]), orderController_1.getOrderById, verifyOrderOwnership_1.verifyOrderOwnership, orderController_1.deleteOrderById, (0, sendJsonResponse_1.sendJsonResponse)('message'));
exports.default = router;
//# sourceMappingURL=orderRoute.js.map