// controllers/authController.js
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';

// Login controller
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("📩 Email received:", email);
    console.log("🔐 Password received:", password);

    const user = await User.findOne({ email });
    console.log("🧑 User from DB:", user);

    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("✅ Password match result:", isMatch);

    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token, role: user.role });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
