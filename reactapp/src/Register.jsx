import {useState} from 'react'
import axios from 'axios'

function Register(){
    const [loading, setLoading] = useState(false);
    const [register,setregister] = useState("submit");
    const submit = async (e)=>{
    e.preventDefault();
    setLoading(true);
    setregister("Loading...")
    const formData = {
      email : document.querySelector('.email').value,
      password : document.querySelector('.pass').value,
      firstName: document.querySelector('.fname').value,
      lastName:  document.querySelector('.lname').value
    }
     try {
      const response = await axios.post("http://localhost:3000/api/register", formData);
      if(response.data.success == 'true'){
        setregister("Registration success!");
        alert("Registration Success!! Please Login.");
        window.location.href = '/login';
      }
      else{
        console.log(response.data);
        setregister(`${response.data.msg}`);
      }
      setTimeout(() => {
          setLoading(false);
      }, 1000);
    } catch (err) {
      console.log('Login failed:', err);
    }
  }
    return (
    <>
      <form onSubmit={submit} style={{ maxWidth: "300px", margin: "auto" }}>
        <input type='text' placeholder='First Name' className='fname' required></input>
        <input type='text' placeholder='Last Name' className='lname' required></input>
        <input type = "email" placeholder='Email' className='email' required></input>
        <input type='password' placeholder='Password' className='pass' required></input>
        <button type = 'submit' disabled={loading}> {loading ? register : "Submit"} </button>
      </form>
      <p>Already A member? <a href='/login'>LogIn</a></p>
    </>
  )
}

export default Register;