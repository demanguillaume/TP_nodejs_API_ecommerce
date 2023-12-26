import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { OrderProduct } from "../models/Orderproduct";

const prisma = new PrismaClient();

export const createOrder = async (req: Request, res: Response) => {
    const { userId, orderProducts } = req.body;
    
    try {
        const result = await prisma.order.create({
            data: {
                userId,
                orderProducts: {
                    create: orderProducts.map((orderProduct: OrderProduct) => ({
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
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getAllOrders = async (req: Request, res: Response) => {
    try {
        const orders = await prisma.order.findMany({
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

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getOrderById = async (req: Request, res: Response) => {
    const orderId = req.params.id;

    try {
        const order = await prisma.order.findUnique({
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
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const updateOrderById = async (req: Request, res: Response) => {
    const orderId = req.params.id;
    const { orderProducts } = req.body;

    try {
        await prisma.orderProduct.deleteMany({
            where: {
                orderId: Number(orderId)
            }
        });

        const updatedOrder = await prisma.order.update({
            where: {
                id: Number(orderId)
            },
            data: {
                updatedAt: new Date(),
                orderProducts: {
                    create: orderProducts.map((orderProduct: OrderProduct) => ({
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
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteOrderById = async (req: Request, res: Response) => {
    const orderId = req.params.id;

    try {
        await prisma.order.delete({
            where: {
                id: Number(orderId)
            }
        });

        return res.json({ message: "Order deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};