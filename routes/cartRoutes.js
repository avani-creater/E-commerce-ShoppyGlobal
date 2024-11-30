const express = require('express');
const { addToCart, updateCartItem, removeCartItem } = require('../controllers/cartController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/cart', authMiddleware, addToCart);
router.put('/cart/:id', authMiddleware, updateCartItem);
router.delete('/cart/:id', authMiddleware, removeCartItem);

module.exports = router;
