import express from 'express';
import { createOrder, getOrders, getCustomers } from '../controllers/orderController';

const router = express.Router();

// Public route to place an order
router.post('/', createOrder);

// Get all orders
router.get('/', getOrders);

// Get unique customers
router.get('/customers', getCustomers);

export default router;
