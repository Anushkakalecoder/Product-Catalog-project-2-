import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      localStorage.setItem('token', res.data.token);
      setAuth({ token: res.data.token, role: res.data.role });
      navigate('/admin');
    } catch (err) {
      alert("Login failed: " + (err.response?.data?.message || "Unknown error"));
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Admin Login</h2>
      <input placeholder="Email" className="input" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" className="input" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button className="btn btn-primary mt-2" onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
