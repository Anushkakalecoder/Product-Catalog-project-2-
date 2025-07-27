import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  const handleEditClick = () => {
    if (!token || userRole !== 'admin') {
      alert("Only admin can edit. Please log in as admin.");
      navigate("/login");
    } else {
      navigate(`/edit/${product._id}`);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition-shadow duration-300">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-md"
      />
      <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
      <p className="text-gray-500">{product.brand}</p>
      <p className="text-sm text-gray-700 mt-1">{product.description}</p>
      <div className="flex justify-between items-center mt-3">
        <span className="text-lg font-bold text-blue-600">${product.price}</span>
        <span className="text-sm text-gray-600">Stock: {product.countInStock}</span>
      </div>

      {/* ✅ Always show Edit button */}
      <div className="mt-4 text-right">
        <button
          onClick={handleEditClick}
          className="inline-block bg-green-500 text-white text-sm px-4 py-2 rounded hover:bg-green-600 transition duration-200"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
