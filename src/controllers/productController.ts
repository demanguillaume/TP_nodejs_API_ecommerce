import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// POST /product
export const createProduct = async (req: Request, res: Response) => {
    try {
        // Create the product
        const product = await prisma.product.create ({
            data: {
                name: req.body.name,
                price: req.body.price,
                description: req.body.description
            }
        });

        // Return the created product
        return res.status(201).json(product);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// GET /product
export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await prisma.product.findMany();

        if (products.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }

        return res.status(200).json(products);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// GET /product/:id
export const getProductById = async (req: Request, res: Response) => {
    const productId = req.params.id;

    try {
        const product = await prisma.product.findUnique({
            where: {
                id: Number(productId)
            }
        });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json(product);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// PATCH /product/:id
export const updateProductById = async (req: Request, res: Response) => {
    const productId = req.params.id;
    
    try {
        const product = await prisma.product.update({
            where: {
                id: Number(productId)
            },
            data: {
                name: req.body.name,
                price: req.body.price,
                description: req.body.description
            }
        });

        return res.status(200).json(product);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    
    }
};

// DELETE /product/:id
export const deleteProductById = async (req: Request, res: Response) => {
    const productId = req.params.id;

    try {
        await prisma.product.delete({
            where: {
                id: Number(productId)
            }
        });

        return res.status(204).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    } 
};