import HealthCard from "./components/HealthCard";
import MedicCard from "./components/Medications";
import React, { useEffect, useState,useRef } from "react";
import PersonalDetails from "./components/PersonalDetails"
import axios from 'axios';
import './App.css'
import SideBar from "./components/SideBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const apiget = async (url)=>{
    const token = localStorage.getItem("token");
    try {
        const response = await axios.get(`http://localhost:3000${url}`,
          {
            headers:{Authorization: `Bearer ${token}`}
          }
      )
        console.log(response.data);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

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

export default function App(){
  const [conditions, setConditions] = useState([]);
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);

  const url = "/api/healthconditions";
    const fetchData = async () => {
      try {
        const data = await apiget(url);
        setConditions(data.data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
  const urlMed = "/api/medications";
  const fetchDataMed = async () => {
      try {
        const data = await apiget(urlMed);
        setMedications(data.data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
  useEffect(() => {
    fetchData();
    fetchDataMed();
  }, []);
  const [collapsed,setcollapsed] = useState(false);
  return(
    <div className={`mainBody ${collapsed?"collapse":""}`}>
      <div className={`hi ${collapsed?"collapse":""}`}>
        <SideBar/>      
      </div>
      <Router>
        <Routes>
          <Route path="/dashboard" element={
            <div className="hello">
              <div className="flex1">
                <main>
                  <HealthCard src={"./src/assets/ecg.png"} name={"Health Conditions"} cardProps = {conditions} refresh={fetchData}/>
                  <MedicCard src={"./src/assets/medic.png"} name={"Medications"} cardProps={medications} refresh={fetchDataMed}/>
                </main>
              </div>
              <div className="flex2">
                <PersonalDetails/>
              </div>
            </div>
          }>
          </Route>
          <Route path="/medications" element={
            <div className="hello">
              <div className="flex1">
                <main>
                  <MedicCard src={"./src/assets/medic.png"} name={"Medications"} cardProps={medications} refresh={fetchDataMed}/>
                </main>
              </div>
            </div>}></Route>
            <Route path="/healthconditions" element={
              <div className="hello">
                <div className="flex1">
                  <main>
                    <HealthCard src={"./src/assets/ecg.png"} name={"Health Conditions"} cardProps = {conditions} refresh={fetchData}/>
                  </main>
                </div>
              </div>}></Route>
        </Routes>
      </Router>
    </div>
  )
}

