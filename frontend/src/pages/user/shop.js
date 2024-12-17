import React, { useState, useEffect } from "react";
import axios from "axios";
import "tailwindcss/tailwind.css";
import Navbar from "../user/navbar"; // Adjust the path if necessary
import { getTokenFromCookies } from "../../utils/tokenUtils"; // Import the utility function

function UserDashboard() {
  const [products, setProducts] = useState([]);
  const [affiches, setAffiches] = useState([]);
  const [currentPosterIndex, setCurrentPosterIndex] = useState(0);

  // Fetch products from the backend API
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  // Fetch posters (affiches) from the backend API
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/affiche")
      .then((response) => {
        setAffiches(response.data);
      })
      .catch((error) => {
        console.error("Error fetching affiches:", error);
      });
  }, []);

  // Cycle through the posters every 3 seconds
  useEffect(() => {
    if (affiches.length > 0) {
      const interval = setInterval(() => {
        setCurrentPosterIndex((prevIndex) => (prevIndex + 1) % affiches.length);
      }, 3000);

      return () => clearInterval(interval); // Cleanup the interval on component unmount
    }
  }, [affiches]);

  // Add product to cart
  const addToCart = async (productId) => {
    try {
      const token = getTokenFromCookies();  // Use the utility function to get token
      console.log("Token:", token);  // Debugging line
      if (!token) {
        alert("Please log in to add items to the cart.");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/cart/add",  // Corrected endpoint
        { productId },
        { headers: { Authorization: `Bearer ${token}` } } // Send token in headers
      );

      console.log("API Response:", response.data);  // Debugging line
      alert("Product added to cart!");
    } catch (error) {
      console.error("Error adding product to cart", error.response ? error.response.data : error);
      alert("Failed to add product to cart.");
    }
  };

  return (
    <div>
      <Navbar />

      {affiches.length > 0 && (
        <div className="flex justify-center items-center mt-8">
          <div className="w-full max-w-screen-lg h-auto relative rounded-lg shadow-lg overflow-hidden">
            <img
              src={`http://localhost:5000/uploads/${affiches[currentPosterIndex].image}`}
              alt={affiches[currentPosterIndex].title}
              className="w-full h-auto max-h-[500px] object-contain mx-auto"
            />
          </div>
        </div>
      )}

      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="w-full max-w-sm bg-white border border-gray-300 rounded-lg shadow-lg dark:bg-gray-900 dark:border-gray-700"
            >
              <a href="#">
                <img
                  className="w-full h-48 object-contain rounded-t-lg"
                  src={`http://localhost:5000/uploads/${product.image}`}
                  alt={product.name}
                  onError={(e) => (e.target.src = "/fallback-image.jpg")}
                />
              </a>
              <div className="px-5 pb-5">
                <h5 className="text-2xl font-bold tracking-tight text-gray-800 dark:text-black-300">
                  {product.name}
                </h5>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-3xl font-bold text-green-600 dark:text-green-400">
                    {product.price} DT
                  </span>
                  <button
                    onClick={() => addToCart(product._id)}  // Use the correct product ID
                    className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-700"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-xl text-gray-800 dark:text-gray-400">
            No products available
          </p>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;
