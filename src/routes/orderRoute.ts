import express from 'express';
import { createOrder, getAllOrders, getOrderById, updateOrderById, deleteOrderById } from '../controllers/orderController';
const router = express.Router();

// POST /order
router.post('/', createOrder);

// GET /order
router.get('/', getAllOrders);

// GET /order/:id
router.get('/:id', getOrderById);

// PATCH /order/:id
router.patch('/:id', updateOrderById);

// DELETE /order/:id
router.delete('/:id', deleteOrderById);

export default router;
