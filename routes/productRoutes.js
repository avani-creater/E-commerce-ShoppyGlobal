const express = require('express');
const router = express.Router();
const { getProducts, getProductById, addProduct } = require('../controllers/productController');

// GET all products
router.get('/products', getProducts);

// GET a single product by ID
router.get('/products/:id', getProductById);

// POST a new product
router.post('/products', addProduct);

module.exports = router;
