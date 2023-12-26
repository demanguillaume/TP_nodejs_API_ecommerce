"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderController_1 = require("../controllers/orderController");
const router = express_1.default.Router();
// POST /order
router.post('/', orderController_1.createOrder);
// GET /order
router.get('/', orderController_1.getAllOrders);
// GET /order/:id
router.get('/:id', orderController_1.getOrderById);
// PATCH /order/:id
router.patch('/:id', orderController_1.updateOrderById);
// DELETE /order/:id
router.delete('/:id', orderController_1.deleteOrderById);
exports.default = router;
//# sourceMappingURL=orderRoute.js.map