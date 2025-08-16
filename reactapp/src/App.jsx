import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from "axios"
 
function App() {
 const [loading, setLoading] = useState(false);
 
 const submit = async (e)=>{
    e.preventDefault();
    setLoading(true);
    const emailpass = {
      email : document.querySelector('.email').value,
      password : document.querySelector('.pass').value,
    }
     // Use the correct HTTP protocol (http) and port (4000)
     try {
      const response = await axios.post("http://localhost:4000/api/login", emailpass);
      console.log('Login successful:', response.data);
      // *** Handle successful login (e.g., redirect, show success message) ***
    } catch (err) {
      console.log('Login failed:', err);
      // *** Handle login errors (e.g., show error message to user) ***
    } finally {
      setLoading(false);
    }
  }
 

  return (
    <>
      <form onSubmit={submit} style={{ maxWidth: "300px", margin: "auto" }}>
        <input type = "email" placeholder='Email' className='email' required></input>
        <input type='password' placeholder='Password' className='pass' required></input>
        <button type = 'submit' disabled={loading}> {loading ? "Loading..." : "Submit"} </button>
      </form>
    </>
  )
}
export default App
