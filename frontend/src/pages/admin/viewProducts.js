import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import Sidebar from "../admin/sidebar"; // Sidebar component
import "tailwindcss/tailwind.css"; // Tailwind CSS

const ViewProducts = () => {
  const [products, setProducts] = useState([]); // State for storing products
  const navigate = useNavigate(); // Hook for navigation

  // Fetch products from the backend
  useEffect(() => {
    fetch("http://localhost:5000/api/products") // Adjust the endpoint to your backend
      .then((response) => response.json())
      .then((data) => setProducts(data)) // Set the fetched products to state
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Handle Edit button click
  const handleEditClick = (productId) => {
    // Navigate to the Edit Product page with the product ID
    navigate(`/editProduct/${productId}`);
  };

  // Handle Delete button click
  const handleDeleteClick = (productId) => {
    fetch(`http://localhost:5000/api/products/${productId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        // Remove the deleted product from the state
        setProducts(products.filter((product) => product._id !== productId));
        alert("Product deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        alert("Failed to delete product");
      });
  };

  return (
    <div className="flex">
      <Sidebar /> {/* Sidebar Component */}
      <div className="flex-1 p-10 ml-64">
        <h1 className="text-3xl font-semibold text-black mb-6">Products</h1>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-800">
            <thead className="text-xs text-white uppercase bg-blue-600">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Product Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Image
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Map through products and display each one in the table */}
              {products.map((product) => (
                <tr
                  key={product._id}
                  className="bg-gray-50 border-b hover:bg-gray-100"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {product.category?.name || "Uncategorized"}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {product.price} DT
                  </td>
                  <td className="px-6 py-4">
                    <img
                      src={`http://localhost:5000/uploads/${product.image}`} // Only append the image filename
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>

                  <td className="px-6 py-4">
                    {/* Edit button */}
                    <button
                      className="text-blue-600 hover:text-blue-800 font-semibold"
                      onClick={() => handleEditClick(product._id)}
                    >
                      Edit
                    </button>
                    {/* Delete button */}
                    <button
                      className="text-red-600 hover:text-red-800 font-semibold ml-4"
                      onClick={() => handleDeleteClick(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewProducts;
