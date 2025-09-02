import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

const apiget = async (url) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(`https://test-lol-evk6.onrender.com${url}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const apiPost = async (url, Data) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(`https://test-lol-evk6.onrender.com${url}`, Data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
const handleError = (error) => {
  if (error.response) {
    if (error.response.status === 401 || error.response.status === 403) {
      alert("Session Timed Out. Please Login Again");
      window.location.href = "/login";
    } else {
      console.error(`⚠️ ${error.response.status}:`, error.response.data);
    }
  } else {
    console.error("⚠️ Network/Server error:", error.message);
  }
  throw error;
};

function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [login, setLogin] = useState("Submit");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await apiget('/api/home');
        setData(result);
      } catch (error) {
        setError("Server Issue");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setLogin("Loading...");

    const form = e.target;
    const data = new FormData(form);
    const values = Object.fromEntries(data.entries());

    try {
      const response = await apiPost('/api/home', values);
      if (response.success) {
        window.location.href = '/user/dashboard';
      } else {
        setLogin("Error");
      }
    } catch (error) {
      setLogin("Failed");
    } finally {
      setTimeout(() => setIsSubmitting(false), 1000);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="outer-container">
      <div className="inner-container">
        <header className="form-head">
          <h1>ENROLLMENT FORM</h1>
        </header>
        <form onSubmit={submit} className="form-body">
          <input type="text" name="firstName" placeholder="First Name" required />
          <input type="text" name="lastName" placeholder="Last Name" required />
          <input type="number" name="age" min={1} max={105} placeholder="Age" required />
          <input type="email" name="email" placeholder="Email" required />
          <div className="gender-box">
            <h5>Gender</h5>
            <input type="radio" name="gender" value="male" id="male" /><label htmlFor="male">Male</label>
            <input type="radio" name="gender" value="female" id="female" /><label htmlFor="female">Female</label>
            <input type="radio" name="gender" value="nonBinary" id="other" /><label htmlFor="other">Other</label>
          </div>
          <input type="tel" name="phoneNum" maxLength={10} placeholder="Mobile Number" required />
          <input type="tel" name="alternateNum" maxLength={10} placeholder="Alternate Mobile Number" required />
          <input type="text" name="address" placeholder="Residence Address" />
          <input type="text" name="city" placeholder="City" />
          <input type="text" name="state" placeholder="State" />
          <input type="number" name="pinCode" placeholder="Pin Code" />
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? login : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Home;
