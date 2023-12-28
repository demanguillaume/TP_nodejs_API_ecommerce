import express, { Request, Response, NextFunction } from 'express';
import { authorizeByRole  } from '../middlewares/authorizeByRole ';
import { createOrder, getAllOrders, getOrderById, updateOrderById, deleteOrderById } from '../controllers/orderController';
import { UserRole } from '../models/User';
const router = express.Router();

// CREATE /order
router.post('/', authorizeByRole([UserRole.USER, UserRole.MANAGER]), createOrder);

// READ ALL /order
router.get('/', authorizeByRole([UserRole.MANAGER]), getAllOrders);

// READ BY ID /order/:id
router.get('/:id', authorizeByRole([UserRole.USER, UserRole.MANAGER]), getOrderById);

// UPDATE BY ID /order/:id
router.patch('/:id', authorizeByRole([UserRole.USER, UserRole.MANAGER]), updateOrderById);

// DELETE BY ID /order/:id
router.delete('/:id', authorizeByRole([UserRole.USER, UserRole.MANAGER]), deleteOrderById);

export default router;
