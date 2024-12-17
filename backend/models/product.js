const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User schema definition
const productSchema = new mongoose.Schema({
 name: {
    type: String,
    required: true,
   
  },
  price: {
    type: Number,
    required: true,
  },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId, // Use ObjectId to reference Category
      ref: 'Category', // Reference the Category model
      required: true,
    },
    //count in stock
    
  
});



const User = mongoose.model('Product', productSchema);
module.exports = User;
