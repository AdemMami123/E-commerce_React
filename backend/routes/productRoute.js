const express = require('express');
const router = express.Router();
const multer = require('multer');
const Product = require('../models/product'); // Adjust the path to your schema

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save uploaded images to 'uploads' folder
  },
  filename: (req, file, cb) => {
    // Generate a unique filename (e.g., timestamp + original filename)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = file.originalname.split('.').pop(); // Extract file extension
    cb(null, uniqueSuffix + '.' + fileExtension); // Save with unique name and extension
  },
});

const upload = multer({ storage });


// POST a new product

router.post('/', upload.single('image'), async (req, res) => {
  const { name, price, description, category } = req.body;

  if (!name || !price || !description || !category || !req.file) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Save only the filename, not the full path
    const newProduct = new Product({
      name,
      price,
      description,
      category,
      image: req.file.filename, // Save only the filename (without the 'uploads/' prefix)
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({ message: 'Product added successfully', product: savedProduct });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// GET all products

router.get('/', async (req, res) => {
    try {
      const products = await Product.find().populate('category', 'name'); // Populate the category field with its name
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch products', error });
    }
  });
  
  // DELETE a product by ID
  router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await Product.findByIdAndDelete(id);
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete product', error });
    }
  });
  // Update Product by ID
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, category } = req.body;

    // Find the product by ID
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update fields (if new value is provided, otherwise keep existing)
    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.category = category || product.category;

    // If a new image is uploaded, update the image path
    if (req.file) {
      // Save only the image filename (without the 'uploads/' prefix)
      const imageName = req.file.filename;
      product.image = imageName;
    }

    // Save the updated product to the database
    const updatedProduct = await product.save();

    // Respond with the updated product
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating product', error });
  }
});


// GET product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category', 'name');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error });
  }
});


module.exports = router;
