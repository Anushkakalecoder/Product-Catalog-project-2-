import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // ✅ Add this import

function AdminDashboard() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await axios.get('http://localhost:5000/api/products');
    setProducts(res.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/products/${id}`);
    fetchProducts(); // Refresh after delete
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Panel - Manage Products</h2>
      <div className="grid gap-4">
        {products.map((p) => (
          <div key={p._id} className="p-4 bg-gray-100 rounded-lg shadow flex justify-between">
            <div>
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p>${p.price}</p>
            </div>
            <div className="space-x-2">
              {/* ✅ Add this Link */}
              <Link
                to={`/edit/${p._id}`}
                className="bg-blue-500 text-white px-3 py-1 rounded inline-block"
              >
                Edit
              </Link>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => handleDelete(p._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
