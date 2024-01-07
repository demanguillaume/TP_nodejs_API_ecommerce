import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { OrderProduct } from "../types/OrderProduct";
import { ResponseError } from "../types/ResponseError";

// MIDDLEWARES
import { verifyOrderOwnership } from "../middlewares/verifyOrderOwnership";
//import { sendJsonResponse } from "../middlewares/sendJsonResponse";

const prisma = new PrismaClient();

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
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
        res.status(201);
        res.locals.order = result;
        next();
    } catch (error: any) {
        next(new ResponseError(500,  "Internal server error", error));
    }
};

export const getAllOrders = async (req: Request, res: Response, next: NextFunction) => {
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
            next(new ResponseError(404, "No orders found"));
        }
        res.status(200);
        res.locals.orders = orders;
        next();
    } catch (error: any) {
        next(new ResponseError(500,  "Internal server error", error ));
    }
};

export const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
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
            next(new ResponseError(404, "Order not found"));
        }
        
        res.status(200);
        res.locals.order = order;
        next();
        
    } catch (error: any) {
        next(new ResponseError(500,  "Internal server error", error));
    }
};

export const updateOrderById = async (req: Request, res: Response, next: NextFunction) => {
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
        res.status(200);
        res.locals.order = updatedOrder;
        next();
    } catch (error: any) {
        next(new ResponseError(500,  "Internal server error", error));
    }
};

export const deleteOrderById = async (req: Request, res: Response, next: NextFunction) => {
    const orderId = req.params.id;

    try {
        await prisma.order.delete({
            where: {
                id: Number(orderId)
            }
        });
        res.status(200);
        res.locals.message = "Order deleted successfully";
        next();
    } catch (error: any) {
        next(new ResponseError(500,  "Internal server error", error));
    }
};