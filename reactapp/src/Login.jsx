  import { useState } from 'react'
  import './App.css'
  import {apiget} from './apiservice.js'
  import axios from "axios"
  const API_BASE = import.meta.env.VITE_API_URL;

function Login() {
  const [loading, setLoading] = useState(false);
  const [login, setlogin] = useState("Submit");

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setlogin("Loading...");

    const emailpass = {
      email: document.querySelector('.email').value,
      password: document.querySelector('.pass').value,
    };

    try {
      const response = await axios.post(`${API_BASE}/api/login`, emailpass);

      if (response.data.success === true) {
        console.log("✅ Login successful:", response.data);
        localStorage.setItem("token", response.data.token);
        setlogin("Redirecting...");

        // Fetch details immediately after login
        const details = await apiget('/api/details');
        console.log("User details:", details);

        if (!details || details.length === 0) {
          window.location.href = '/about';
        } else {
          window.location.href = '/user/dashboard';
        }

      } else {
        console.log("❌ Login failed:", response.data);
        setlogin(response.data.msg || "Login failed");
      }

    } catch (err) {
      console.error("Login request failed:", err);
      setlogin("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={submit} style={{ maxWidth: "300px", margin: "auto" }}>
        <input type="email" placeholder="Email" className="email" required />
        <input type="password" placeholder="Password" className="pass" required />
        <button type="submit" disabled={loading}>
          {loading ? login : "Submit"}
        </button>
      </form>
      <p>Not a member? <a href="/register">SignUp</a></p>
    </>
  );
}
export default Login