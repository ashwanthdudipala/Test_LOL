
import { useState,useEffect } from 'react';
import './App.css'
import axios from 'axios';

//api folder
const apiget = async (url)=>{
    const token = localStorage.getItem("token");
    try {
        const response = await axios.get(`http://localhost:3000${url}`,{
            headers:{Authorization: `Bearer ${token}`}
        })
        console.log(response.data);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

const apiPost = async (url,Data)=>{
    const token = localStorage.getItem("token");
    try {
        const response = await axios.post(`http://localhost:3000${url}`,Data,{
            headers:{Authorization: `Bearer ${token}`}
        })
        console.log(response);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

//Errors folder
const handleError = (error)=>{
    if(error.response){
        if(error.response.status == 401){
            console.error("❌ 401 Unauthorized → redirecting to login");
            alert("Session TimedOut Login Again");
            window.location.href = "/login";
        }
        else if(error.response.status == 403){
            console.error("❌ 403 Forbidden → access denied");
            console.error("Server Response:", error.response.data); 
            alert("Session Timedout Login Again");
            window.location.href = "/login";
        }
        else{
            console.error(`⚠️ ${error.response.status}:`, error.response.data)
        }
    }
    else {
        console.error("⚠️ Network/Server error:", error.message);
    }
    throw error;
}

const request = async (e)=>{
    const token = localStorage.getItem("token");
    try {
        const response = await axios.get("http://localhost:3000/api/home",{
            headers:{Authorization: `Bearer ${token}`}
        })
        console.log(response.data);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}


const submit = (e) => {
    const url = '/api/home';
  e.preventDefault();
  const form = e.target;
  const data = new FormData(form);
  const values = Object.fromEntries(data.entries());

  try {
    const response = apiPost(url,values);
    console.log(response);
  } catch (error) {
    
  }
  console.log(values);
};

function Home(){
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = '/api/home';
                const result = await apiget(url);
                console.log(result);
                setData(result);
            } catch (error) {
                setError("Server Issue");
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    return( 
     <div className="outer-container">
     <div className="inner-container">
         <header className="form-head">
             <h1>ENROLLMENT FORM</h1>
         </header>
         <form action="" onSubmit={submit} className="form-body">
            
             <input type="text" name="firstName" id="firstName" required placeholder="First Name" />
              
             <input type="text" name="lastName" id="lastName" required placeholder="Last Name"/>
            
             <input type="number" name="age" id="age" min={1} max={105} required placeholder="Age"/>
             <input type="email" name="email" id="email" required placeholder="Email"/>
             <div className="gender-box">
             <h5>Gender</h5>
             <input type="radio" name="gender" id="male" value="male"/>
             <label htmlFor="male">Male</label>
             <input type="radio" name="gender" id="female" value="female"/>
             <label htmlFor="female">Female</label>
             <input type="radio" name="gender" id="other" value="nonBinary"/>
             <label htmlFor="other">Other</label>
             </div>
             <input type="tel" name="phoneNum" id="phoneNum" required maxLength={10} placeholder="Mobile Number" />
             <input type="tel" name="alternateNum" id="alternateNum" required maxLength={10} placeholder="Alternate Mobile Number" />
                 <input type="text" name="address" id="address" placeholder="Residence Address" />
                 <input type="text" name="city" id="city" placeholder="City" />
                 <input type="text" name="state" id="state" placeholder="State"/>
                 <input type="number" name="pinCode" id="pinCode" placeholder="Pin Code" />
             <button>Submit</button>
         </form>
         </div>
     </div>
    );
}
export default Home;