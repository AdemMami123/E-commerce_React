import React, { useState, useEffect } from 'react';
import Sidebar from '../admin/sidebar';
import { useParams, useNavigate } from 'react-router-dom';

const EditProduct = () => {
  const { id } = useParams(); // Extract product ID from URL
  const navigate = useNavigate();

  // State for form fields
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [existingImage, setExistingImage] = useState('');
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch product data and categories
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        const product = await response.json();

        if (product) {
          // Pre-fill form fields with existing product data
          setProductName(product.name);
          setPrice(product.price);
          setDescription(product.description);
          setSelectedCategory(product.category); // Assuming category is stored by ID
          setExistingImage(product.image); // Set image filename from the database
        }

        setIsLoading(false); // Data is ready
      } catch (error) {
        console.error('Error fetching product:', error);
        setIsLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
    fetchProduct();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', productName);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('category', selectedCategory);

    // If a new image is uploaded, append it to the form data
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        alert('Product updated successfully!');
        navigate('/viewProducts'); // Redirect to the view products page
      } else {
        const data = await response.json();
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; // Show loading indicator while fetching data
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-10 ml-64">
        <h1 className="text-2xl font-semibold mb-4">Edit Product</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label htmlFor="productName">Product Name</label>
            <input
              type="text"
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2 border rounded"
              required
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
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded"
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label htmlFor="image">Product Image</label>
            <input
              type="file"
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full p-2 border rounded"
            />
            {existingImage && (
              <div className="mt-2">
                <p>Current Image:</p>
                <img
                  src={`http://localhost:5000/uploads/${existingImage}`} // Show image using the filename
                  alt="Current"
                  className="h-20"
                />
              </div>
            )}
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
