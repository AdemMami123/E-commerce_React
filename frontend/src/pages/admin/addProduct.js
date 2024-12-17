import React, { useState, useEffect } from 'react';
import Sidebar from '../admin/sidebar'; // Sidebar component
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate(); // Hook for navigation

  // Fetch categories from the backend
  useEffect(() => {
    fetch('http://localhost:5000/api/categories') // Adjust with your backend categories endpoint
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', productName);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('category', selectedCategory);
    formData.append('image', image);

    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Product added successfully:', data);
        alert('Product added successfully!');
        navigate('/viewProducts'); // Redirect to view products page


      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-10 ml-64">
        <h1 className="text-2xl font-semibold mb-4">Add New Product</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label htmlFor="productName">Product Name</label>
            <input
              type="text"
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              required
              className="w-full p-2 border rounded"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full p-2 border rounded"
            ></textarea>
          </div>

          <div className="mb-4">
            <label htmlFor="image">Product Image</label>
            <input
              type="file"
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
