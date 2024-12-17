
const express = require('express');
const mongoose = require('mongoose');
const Product = require('../models/product'); // Assuming you have a Product model
const Category = require('../models/category'); // Assuming you have a Category model
const User = require('../models/user'); // Assuming you have a User model
const router = express.Router();

// Route to get total products, categories, and users
router.get('/stats', async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalCategories = await Category.countDocuments();
    const totalUsers = await User.countDocuments();
    
    res.json({
      totalProducts,
      totalCategories,
      totalUsers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

module.exports = router;
