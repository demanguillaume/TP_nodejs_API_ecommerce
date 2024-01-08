import express from 'express';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} from '../controllers/productController';
import { UserRole } from '../types/User';

// MIDDLEWARES
import { authorizeByRole } from '../middlewares/authorizeByRole';
import { sendJsonResponse } from '../middlewares/sendJsonResponse';

const router = express.Router();

// CREATE /product
router.post(
  '/',
  authorizeByRole([UserRole.MANAGER, UserRole.ADMIN]),
  createProduct,
  sendJsonResponse('product'),
);

// READ ALL /product
router.get(
  '/',
  authorizeByRole([UserRole.USER, UserRole.MANAGER, UserRole.ADMIN]),
  getAllProducts,
  sendJsonResponse('products'),
);

// READ BY ID /product/:id
router.get(
  '/:id',
  authorizeByRole([UserRole.USER, UserRole.MANAGER, UserRole.ADMIN]),
  getProductById,
  sendJsonResponse('product'),
);

// UPDATE /product/:id
router.patch(
  '/:id',
  authorizeByRole([UserRole.MANAGER, UserRole.ADMIN]),
  updateProductById,
  sendJsonResponse('product'),
);

// DELETE /product/:id
router.delete(
  '/:id',
  authorizeByRole([UserRole.MANAGER, UserRole.ADMIN]),
  deleteProductById,
  sendJsonResponse('message'),
);

export default router;
