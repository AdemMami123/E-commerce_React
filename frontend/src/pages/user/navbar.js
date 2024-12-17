import React, { useState } from "react";
import "tailwindcss/tailwind.css"; // Tailwind CSS
import Navbarbutton from "../../components/navbarButon";

function Navbar() {
  const [isNavbarOpen, setNavbarOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setCartOpen] = useState(false); // Toggle for cart dropdown

  const toggleNavbar = () => {
    setNavbarOpen(!isNavbarOpen);
  };

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const removeFromCart = (itemIndex) => {
    const newCartItems = cartItems.filter((_, index) => index !== itemIndex);
    setCartItems(newCartItems);
  };

  const toggleCartDropdown = () => {
    setCartOpen(!isCartOpen);
  };

  return (
    <div>
      <nav className="bg-black shadow-md antialiased">
        <div className="max-w-screen-xl px-4 mx-auto py-4 2xl:px-0">
          <div className="flex items-center justify-between">
            <div>
              <Navbarbutton /> {/* Insert the button here */}
            </div>

            {/* Navbar Toggle Button */}
            <button
              aria-controls="navbar-default"
              aria-expanded={isNavbarOpen}
              type="button"
              onClick={toggleNavbar}
              className="inline-flex items-center p-2 text-white rounded-lg lg:hidden hover:bg-blue-700"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                />
              </svg>
            </button>

            {/* Links */}
            <div
              id="navbar-default"
              className={`${isNavbarOpen ? "block" : "hidden"} w-full lg:block lg:w-auto`}
            >
              <ul className="flex flex-col mt-4 lg:flex-row lg:space-x-8 lg:mt-0">
                <form className="max-w-lg mx-auto">
                  <div className="flex">
                    <label
                      for="search-dropdown"
                      className="mb-2 text-sm font-medium text-white sr-only"
                    >
                      Your Email
                    </label>
                    <button
                      id="dropdown-button"
                      data-dropdown-toggle="dropdown"
                      className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-white bg-black border border-gray-300 rounded-s-lg hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-100"
                      type="button"
                    >
                      All categories
                      <svg
                        className="w-2.5 h-2.5 ms-2.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 4 4 4-4"
                        />
                      </svg>
                    </button>
                    <div
                      id="dropdown"
                      className="z-10 hidden bg-black divide-y divide-gray-100 rounded-lg shadow w-44"
                    >
                      <ul className="py-2 text-sm text-white" aria-labelledby="dropdown-button">
                        <li>
                          <button
                            type="button"
                            className="inline-flex w-full px-4 py-2 hover:bg-gray-700"
                          >
                            Mockups
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            className="inline-flex w-full px-4 py-2 hover:bg-gray-700"
                          >
                            Templates
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            className="inline-flex w-full px-4 py-2 hover:bg-gray-700"
                          >
                            Design
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            className="inline-flex w-full px-4 py-2 hover:bg-gray-700"
                          >
                            Logos
                          </button>
                        </li>
                      </ul>
                    </div>
                    <div className="relative w-full">
                      <input
                        type="search"
                        id="search-dropdown"
                        className="block p-2.5 w-full z-20 text-sm text-white bg-black rounded-e-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Search Mockups, Logos, Design Templates..."
                        required
                      />
                      <button
                        type="submit"
                        className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                      >
                        <svg
                          className="w-4 h-4"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 20"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                          />
                        </svg>
                        <span className="sr-only">Search</span>
                      </button>
                    </div>
                  </div>
                </form>

                <li>
                  <a
                    href="#"
                    className="block py-2 px-3 text-sm font-medium text-white hover:bg-blue-700 rounded"
                  >
                    Gift Ideas
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-3 text-sm font-medium text-white hover:bg-blue-700 rounded"
                  >
                    Today's Deals
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-3 text-sm font-medium text-white hover:bg-blue-700 rounded"
                  >
                    Sell
                  </a>
                </li>
              </ul>
            </div>

            {/* Cart Button */}
            <button
              type="button"
              onClick={toggleCartDropdown}
              className="hidden lg:inline-flex items-center p-2 text-white hover:bg-blue-700 rounded-lg relative"
            >
              <span className="sr-only">My Cart</span>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.9 2m0 0h13.8l.9-2m-15.6 0L5 13a1 1 0 001 1h11a1 1 0 001-1l1.1-8m-15.6 0h15.6M9 16h6m-6 0a2 2 0 100 4 2 2 0 000-4zm6 0a2 2 0 100 4 2 2 0 000-4z"
                ></path>
              </svg>
              <span className="ml-2 hidden sm:block">My Cart</span>
              <span className="ml-2 text-white bg-red-600 rounded-full px-2 py-1 text-xs">
                {cartItems.length}
              </span>

              {/* Cart Dropdown */}
              {isCartOpen && (
                <div className="absolute right-0 w-64 mt-2 bg-white rounded-md shadow-lg py-2">
                  <h3 className="px-4 py-2 font-semibold text-gray-800">Your Cart</h3>
                  <ul>
                    {cartItems.length === 0 ? (
                      <li className="px-4 py-2 text-gray-600">No items in your cart</li>
                    ) : (
                      cartItems.map((item, index) => (
                        <li key={index} className="px-4 py-2 flex justify-between items-center">
                          <span>{item.name}</span>
                          <button
                            onClick={() => removeFromCart(index)}
                            className="text-red-600 text-sm"
                          >
                            Remove
                          </button>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              )}
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
