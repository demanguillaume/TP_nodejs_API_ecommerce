import express from 'express';
import { createOrder, getAllOrders, getOrderById, updateOrderById, deleteOrderById } from '../controllers/orderController';
import { UserRole } from '../types/User';

//MIDDLEWARES
import { authorizeByRole  } from '../middlewares/authorizeByRole';
import { verifyOrderOwnership } from '../middlewares/verifyOrderOwnership';
import { sendJsonResponse } from '../middlewares/sendJsonResponse';
import { check } from 'express-validator';
import { checkDuplicateProductIds } from '../middlewares/checkDuplicateProductIds';

const router = express.Router();

// CREATE /order
router.post('/', 
    authorizeByRole([UserRole.USER, UserRole.MANAGER, UserRole.ADMIN]), 
    checkDuplicateProductIds,
    createOrder,
    sendJsonResponse('order')
);

// READ ALL /order
router.get('/', 
    authorizeByRole([UserRole.MANAGER, UserRole.ADMIN]), 
    getAllOrders,
    sendJsonResponse('orders')
);

// READ BY ID /order/:id
router.get('/:id', 
    authorizeByRole([UserRole.USER, UserRole.MANAGER, UserRole.ADMIN]), 
    getOrderById,
    verifyOrderOwnership,
    sendJsonResponse('order')
);

// UPDATE BY ID /order/:id
router.patch('/:id', 
    authorizeByRole([UserRole.USER, UserRole.MANAGER, UserRole.ADMIN]), 
    checkDuplicateProductIds,
    getOrderById,
    verifyOrderOwnership,
    updateOrderById,
    sendJsonResponse('order')
);

// DELETE BY ID /order/:id
router.delete('/:id', 
    authorizeByRole([UserRole.USER, UserRole.MANAGER, UserRole.ADMIN]), 
    getOrderById,
    verifyOrderOwnership,
    deleteOrderById,
    sendJsonResponse('message')
);

export default router;
