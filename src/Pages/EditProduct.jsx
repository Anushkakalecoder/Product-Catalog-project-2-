// src/Pages/EditProduct.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    stock: '',
    brand: ''
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then((res) => {
      setProduct(res.data);
      setLoading(false);
    })
    .catch((err) => {
      console.error('Error fetching product:', err);
      setError('Failed to fetch product');
      setLoading(false);
    });
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:5000/api/products/${id}`, product, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(() => {
      alert('Product updated successfully');
      navigate('/admin'); // Redirect after update
    })
    .catch((err) => {
      console.error('Error updating product:', err);
      alert('Failed to update product');
    });
  };

  if (loading) return <p>Loading product...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-4">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit} className="form-group">
        <input name="name" value={product.name} onChange={handleChange} placeholder="Name" className="form-control mb-2" required />
        <input name="description" value={product.description} onChange={handleChange} placeholder="Description" className="form-control mb-2" required />
        <input name="price" type="number" value={product.price} onChange={handleChange} placeholder="Price" className="form-control mb-2" required />
        <input name="category" value={product.category} onChange={handleChange} placeholder="Category" className="form-control mb-2" />
        <input name="image" value={product.image} onChange={handleChange} placeholder="Image URL" className="form-control mb-2" />
        <input name="stock" type="number" value={product.stock} onChange={handleChange} placeholder="Stock" className="form-control mb-2" />
        <input name="brand" value={product.brand} onChange={handleChange} placeholder="Brand" className="form-control mb-2" />
        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
  );
}

export default EditProduct;
