  import { useState } from 'react'
  import './App.css'
  import {apiget} from './apiservice.js'
  import axios from "axios"
  function Login(){
      const [loading, setLoading] = useState(false);
      const [login,setlogin] = useState("submit"); // 0:Default 1:Success 2:Failure
  const submit = async (e)=>{
      e.preventDefault();
      setLoading(true);
      setlogin("Loading...")
      const emailpass = {
        email : document.querySelector('.email').value,
        password : document.querySelector('.pass').value,
      }
      try {
        const response = await axios.post("http://localhost:3000/api/login", emailpass);
        if(response.data.success == 'true'){
          console.log(response.data);
          localStorage.setItem("token",response.data.token);
          setlogin("Redirecting...");
        }
        else{
          console.log(responseg.data.data.length);
          setlogin(`${response.data.msg}`);
        }
        setTimeout(async () => {
          const responseg = await apiget('/api/details');
          if(responseg.data.length==0){
            window.location.href = '/about';
          }
          else{
            console.log(responseg.data.length);
            window.location.href = '/user/dashboard';
          }
            setLoading(false);
        }, 1000);
      } catch (err) {
        console.log('Login failed:', err);
      } 
    }
    return (
      <>
        <form onSubmit={submit} style={{ maxWidth: "300px", margin: "auto" }}>
          <input type = "email" placeholder='Email' className='email' required></input>
          <input type='password' placeholder='Password' className='pass' required></input>
          <button type = 'submit' disabled={loading}> {loading ? login : "Submit"} </button>
        </form>
        <p>Not A member? <a href='/register'>SignIn</a></p>
      </>
    )
  }
  export default Login;