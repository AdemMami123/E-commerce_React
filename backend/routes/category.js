const express = require('express');
const Category = require('../models/category');

const router = express.Router();

// Assuming you have a Category model

// Add category route
router.post('/', async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'Category name is required' });
    }

    try {
        const newCategory = new Category({ name });
        await newCategory.save();
        res.status(201).json({ message: 'Category added successfully', category: newCategory });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
// Get all categories route

router.get('/', async (req, res) => {
    try {
        const categories = await Category.find(); // Fetch all categories
        res.status(200).json(categories); // Return categories in JSON format
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Edit category route
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
  
    if (!name) {
      return res.status(400).json({ message: 'Category name is required' });
    }
  
    try {
      const updatedCategory = await Category.findByIdAndUpdate(id, { name }, { new: true });
      if (!updatedCategory) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.status(200).json({ message: 'Category updated successfully', category: updatedCategory });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });

  // Delete category route
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedCategory = await Category.findByIdAndDelete(id);
      if (!deletedCategory) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });
  

module.exports = router;