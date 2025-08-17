import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios"
import Login from './Login.jsx';
import Home from './Home.jsx'
import Register from './Register.jsx'


function App() {
  return (
    <Router>
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<Home />} />
          <Route path="/register" element={<Register />} />

          <Route path="*" element={<p>Page Not Found! ERR_404</p>} />
      </Routes>
    </Router>
  );
}
export default App;
