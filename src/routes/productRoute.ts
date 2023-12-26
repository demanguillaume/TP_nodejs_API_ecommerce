import express from 'express';
import { createProduct, getAllProducts, getProductById, updateProductById, deleteProductById } from '../controllers/productController';
const router = express.Router();

// POST /product
router.post('/', createProduct);

// GET /product
router.get('/', getAllProducts);

// GET /product/:id
router.get('/:id', getProductById);

// PATCH /product/:id
router.patch('/:id', updateProductById);

// DELETE /product/:id
router.delete('/:id', deleteProductById);

export default router;
