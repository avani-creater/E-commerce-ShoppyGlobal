const Product = require('../models/Product');

// Controller function to get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

// Controller function to get a product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
};

// Controller function to add a new product
const addProduct = async (req, res) => {
  try {
    const { name, price, description, stock } = req.body;

    // Check if all necessary data is provided
    if (!name || !price || !description || !stock) {
      return res.status(400).json({ message: 'Please provide all product details' });
    }

    const newProduct = new Product({
      name,
      price,
      description,
      stock,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error adding product', error: error.message });
  }
};

module.exports = { getProducts, getProductById, addProduct };
