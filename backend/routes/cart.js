// routes/cart.js
const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const Cart = require("../models/cart");
const verifyToken = require("../middlewares/auth"); // JWT middleware

// API Route to add product to cart
router.post("/add", verifyToken, async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id; // Get user ID from the token

  try {
    // Find the product by ID
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    // Find or create a cart for the user
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Add the product to the cart if it's not already in it
    const existingItem = cart.items.find(item => item.productId.toString() === productId);
    if (!existingItem) {
      cart.items.push({ productId });
      await cart.save();
    }

    res.json({ message: "Product added to cart." });
  } catch (error) {
    res.status(500).json({ message: "Error adding product to cart." });
  }
});

module.exports = router;
