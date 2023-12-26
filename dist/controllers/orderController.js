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
exports.deleteOrderById = exports.updateOrderById = exports.getOrderById = exports.getAllOrders = exports.createOrder = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, orderProducts } = req.body;
    try {
        const result = yield prisma.order.create({
            data: {
                userId,
                orderProducts: {
                    create: orderProducts.map((orderProduct) => ({
                        productId: orderProduct.productId,
                        quantity: orderProduct.quantity
                    }))
                }
            },
            include: {
                orderProducts: true
            }
        });
        return res.json(result);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.createOrder = createOrder;
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield prisma.order.findMany({
            include: {
                orderProducts: {
                    include: {
                        product: true
                    }
                }
            },
        });
        if (orders.length === 0) {
            return res.status(404).json({ message: "No orders found" });
        }
        return res.json(orders);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.getAllOrders = getAllOrders;
const getOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = req.params.id;
    try {
        const order = yield prisma.order.findUnique({
            where: {
                id: Number(orderId)
            },
            include: {
                orderProducts: {
                    include: {
                        product: true
                    }
                }
            }
        });
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        return res.json(order);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.getOrderById = getOrderById;
const updateOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = req.params.id;
    const { orderProducts } = req.body;
    try {
        yield prisma.orderProduct.deleteMany({
            where: {
                orderId: Number(orderId)
            }
        });
        const updatedOrder = yield prisma.order.update({
            where: {
                id: Number(orderId)
            },
            data: {
                updatedAt: new Date(),
                orderProducts: {
                    create: orderProducts.map((orderProduct) => ({
                        productId: orderProduct.productId,
                        quantity: orderProduct.quantity
                    }))
                }
            },
            include: {
                orderProducts: {
                    include: {
                        product: true
                    }
                }
            }
        });
        return res.json(updatedOrder);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.updateOrderById = updateOrderById;
const deleteOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = req.params.id;
    try {
        yield prisma.order.delete({
            where: {
                id: Number(orderId)
            }
        });
        return res.json({ message: "Order deleted successfully" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.deleteOrderById = deleteOrderById;
//# sourceMappingURL=orderController.js.map