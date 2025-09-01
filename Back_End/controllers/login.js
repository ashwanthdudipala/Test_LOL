import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import supabase from '../DataBase/supabase.js';

dotenv.config();

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // ✅ check env var
    const secret_key = process.env.JWT_SECRET;
    if (!secret_key) {
      console.error("❌ JWT_SECRET missing in environment");
      return res.status(500).json({ success: false, msg: "Server misconfiguration" });
    }

    // ✅ find user
    const { data: users, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email);

    if (error) {
      console.error("❌ DB error:", error.message);
      return res.status(500).json({ success: false, msg: "Database error" });
    }

    if (!users || users.length === 0) {
      return res.status(401).json({ success: false, msg: "No member with that email" });
    }

    const user = users[0];

    // ✅ check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ success: false, msg: "Incorrect password" });
    }

    // ✅ sign token
    const token = jwt.sign({ email: user.email, id: user.id }, secret_key, { expiresIn: "10h" });

    // ✅ send response
    return res.status(200).json({
      success: true,
      msg: "Login successful",
      token
    });

  } catch (err) {
    console.error("❌ Login error:", err.message);
    return res.status(500).json({ success: false, msg: "Internal server error" });
  }
};

export default login;
