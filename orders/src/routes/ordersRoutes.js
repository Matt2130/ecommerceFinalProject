import express from 'express';
import { createOrder, getOrder, updateOrder, deleteOrder } from '../controller/ordersController.js';

const router = express.Router();

router.post('/create', createOrder);

router.get('/all', getOrder);

router.put('/update/:id', updateOrder);

router.patch('/remove/:id', deleteOrder);

export default router;