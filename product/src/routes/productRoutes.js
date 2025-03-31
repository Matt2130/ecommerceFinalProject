import express from 'express';
import { createProduct, getProduct, updateProduct, deleteProduct } from '../controller/productController.js';

const router = express.Router();

router.post('/create', createProduct);

router.get('/all', getProduct);

router.put('/update/:id', updateProduct);

router.patch('/remove/:id', deleteProduct);

export default router;