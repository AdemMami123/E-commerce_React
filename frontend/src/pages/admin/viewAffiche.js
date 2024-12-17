import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css'; // Tailwind CSS for styling
import Sidebar from './sidebar'; // Import your Sidebar component

const ViewAffiche = () => {
  const [affiches, setAffiches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  // Fetch affiches from the backend
  const fetchAffiches = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/affiche');
      setAffiches(response.data);
    } catch (error) {
      setMessage('Error fetching Poster');
    } finally {
      setLoading(false);
    }
  };

  // Delete affiche
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/affiche/${id}`);
      setMessage('Poster deleted successfully');
      // Remove the deleted affiche from the state
      setAffiches(affiches.filter(affiche => affiche._id !== id));
    } catch (error) {
      setMessage('Error deleting Poster');
    }
  };

  useEffect(() => {
    fetchAffiches();
  }, []);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8 ml-64"> {/* Add ml-64 to add space for the sidebar */}
        <h2 className="text-2xl font-bold text-gray-800">View Posters</h2>
        {message && <p className="mt-2 text-red-500">{message}</p>}
        
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {affiches.length > 0 ? (
              affiches.map((affiche) => (
                <div key={affiche._id} className="p-4 border rounded-lg shadow-md">
                  <div className="w-full h-64 bg-gray-200 relative">
                    <img
                      src={`http://localhost:5000/uploads/${affiche.image}`}
                      alt={affiche.title}
                      className="w-full h-full object-contain mb-4" // object-contain to prevent cropping and fill the container
                    />
                  </div>
                  <h3 className="text-lg font-semibold">{affiche.title}</h3>
                  <button
                    onClick={() => handleDelete(affiche._id)}
                    className="mt-2 py-1 px-4 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <p>No posters available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewAffiche;
