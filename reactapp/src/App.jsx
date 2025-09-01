import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Login.jsx';
import Home from './Home.jsx'
import Register from './Register.jsx'
import Dashboard from './Dashboard.jsx';


function App() {
  return (
    <Router>
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<Home />} />
          <Route path="/register" element={<Register />}/>
          <Route path="/user/*" element={<Dashboard />}/>
          <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}
export default App;
