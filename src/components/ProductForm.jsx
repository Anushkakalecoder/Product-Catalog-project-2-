// src/components/ProductForm.jsx
import React, { useState } from "react";

const ProductForm = ({ onProductAdded }) => {
  const [form, setForm] = useState({
    name: "",
    brand: "",
    category: "",
    description: "",
    image: "",
    price: "",
    countInStock: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const result = await response.json();

    if (response.ok) {
      onProductAdded(result); // Callback to reload product list
      setForm({
        name: "",
        brand: "",
        category: "",
        description: "",
        image: "",
        price: "",
        countInStock: "",
      });
    } else {
      alert("Error: " + result.message);
    }
  };

  return (
    <form className="bg-white p-4 rounded shadow mb-6" onSubmit={handleSubmit}>
      <h2 className="text-lg font-bold mb-4">Add Product</h2>
      {["name", "brand", "category", "description", "image", "price", "countInStock"].map((field) => (
        <input
          key={field}
          name={field}
          value={form[field]}
          onChange={handleChange}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          className="block w-full p-2 border mb-3 rounded"
          required
        />
      ))}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default ProductForm;
