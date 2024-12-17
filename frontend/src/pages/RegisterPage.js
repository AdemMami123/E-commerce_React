import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap

const RegisterPage = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false); // Add loading state
  const [error, setError] = useState(null); // Add error state

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', { // Replace with your API URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData) // Send the form data as JSON
      });

      if (!response.ok) {
        throw new Error('Registration failed!'); // Throw error if registration fails
      }

      const data = await response.json(); // Get the response data
      console.log('Registration successful', data);

      // After successful registration, navigate to the login page
      navigate('/login');
    } catch (error) {
      console.error(error);
      setError('Registration failed! Please try again.'); // Show error if there's an issue
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg">
            <div className="card-body p-5">
              <h2 className="text-center mb-4">Create an Account</h2>

              {/* Show error message if registration fails */}
              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                  disabled={loading} // Disable button while loading
                >
                  {loading ? 'Registering...' : 'Register'}
                </button>
              </form>

              <div className="text-center mt-3">
                <p>Already have an account? <a href="/login" className="text-primary">Login here</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
