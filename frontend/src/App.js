import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Header from './components/header';
import Footer from './components/footer';
import Home from './components/home';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/admin/dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import ProductCatalog from './pages/user/shop';
import AddProduct from './pages/admin/addProduct';
import AddCategory from './pages/admin/addCategory';
import ViewCategories from './pages/admin/viewCategories';
import EditCategory from './pages/admin/editCategory';
import ViewProducts from './pages/admin/viewProducts';
import EditProduct from './pages/admin/editProduct';
import ViewUsers from './pages/admin/viewUsers';
import Dashboard from './pages/admin/dashboard';
import AddAffiche from './pages/admin/addAffiche';
import ViewAffiche from './pages/admin/viewAffiche';


function App() {
  const location = useLocation();
  const navigate = useNavigate(); // Hook for navigation
  const isHomePage = location.pathname === '/home'; // Check if the current page is the home page
  const isAuthPage = ['/register', '/login'].includes(location.pathname); // Check if the current page is login or register

  useEffect(() => {
    // Redirect to '/home' if the user is on the root page
    if (location.pathname === '/') {
      navigate('/home');
    }
  }, [location, navigate]);

  return (
    <>
      {/* Render Header only if the current page is the home page */}
      {isHomePage && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/addCategory" element={<AddCategory />} />
        <Route path="/viewCategories" element={<ViewCategories />} />
        <Route path="/editCategory/:id" element={<EditCategory />} />
        <Route path="/viewProducts" element={<ViewProducts />} />
        <Route path="/editProduct/:id" element={<EditProduct />} />
        <Route path="/viewUsers" element={<ViewUsers />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addAffiche" element={<AddAffiche />} />
        <Route path="/viewAffiche" element={<ViewAffiche />} />



        
        <Route
          path="/pages/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pages/user/shop"
          element={
            <ProtectedRoute role="user">
              <ProductCatalog />
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* Render Footer only if the current page is not login or register */}
      {!isAuthPage && <Footer />}
    </>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
