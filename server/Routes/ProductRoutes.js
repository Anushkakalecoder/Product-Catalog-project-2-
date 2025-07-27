import express from 'express';
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById
} from '../Controllers/ProductController.js';

import verifyToken from '../middleware/authmiddleware.js';
import isAdmin from '../middleware/adminMiddleware.js';

const router = express.Router();

// Public route
router.get('/', getAllProducts);

// Admin-only routes
router.post('/', verifyToken, isAdmin, createProduct);
router.get('/:id', verifyToken, isAdmin, getProductById);
router.put('/:id', verifyToken, isAdmin, updateProduct);
router.delete('/:id', verifyToken, isAdmin, deleteProduct);

export default router;
