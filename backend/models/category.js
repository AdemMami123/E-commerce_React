const mongoose = require('mongoose');

// Category schema definition
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
