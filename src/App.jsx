// src/App.jsx
import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import AdminDashboard from "./Pages/AdminDashboard";
import EditProduct from "./Pages/EditProduct";
import Login from "./Pages/Login";

function App() {
  const [auth, setAuth] = useState({
    token: localStorage.getItem("token") || null,
    role: localStorage.getItem("role") || null
  });

  const isAdmin = auth.token && auth.role === "admin";

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setAuth={setAuth} />} />
        <Route
          path="/admin"
          element={isAdmin ? <AdminDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/edit/:id"
          element={isAdmin ? <EditProduct /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
