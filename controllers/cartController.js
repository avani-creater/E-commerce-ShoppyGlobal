const Cart = require('../models/Cart');

// Add product to cart
exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const cartItem = new Cart({ productId, quantity, userId: req.user.id });
    await cartItem.save();
    res.status(201).json({ message: 'Item added to cart', cartItem });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update product quantity in cart
exports.updateCartItem = async (req, res) => {
  const { quantity } = req.body;

  try {
    const cartItem = await Cart.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { quantity },
      { new: true }
    );
    if (!cartItem) return res.status(404).json({ message: 'Cart item not found' });
    res.json({ message: 'Cart updated', cartItem });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Remove product from cart
exports.removeCartItem = async (req, res) => {
  try {
    const cartItem = await Cart.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!cartItem) return res.status(404).json({ message: 'Cart item not found' });
    res.json({ message: 'Item removed from cart' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
