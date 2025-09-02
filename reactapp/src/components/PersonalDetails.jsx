import {apiget} from '../apiservice';
import { useEffect, useState } from 'react';
export default function PersonalDetails(){
    const url = '/api/details';
    const [details,setDetails] = useState([]);
    const fetchdata = async()=>{
        const data = await apiget(url);
        setDetails(data.data[0]);
    }
    useEffect(()=>{
        fetchdata();
    },[]);
    return(
        <>
        <p className="personal-details">Personal Details</p>
        <div className="subflex">
            
            <div className="subflex1">
                <div className="detail-row">
                    <span className="label">First Name</span>
                    <span className="value">{details.firstName || "N/A"}</span>
                </div>
                <div className="detail-row">
                    <span className="label">Last Name</span>
                    <span className="value">{details.lastName || "N/A"}</span>
                </div>
                <div className="detail-row">
                    <span className="label">Age</span>
                    <span className="value">{details.age || "N/A"}</span>
                </div>
                <div className="detail-row">
                    <span className="label">Gmail</span>
                    <span className="value">{details.email || "N/A"}</span>
                </div>
                <div className="detail-row">
                    <span className="label">Phone</span>
                    <span className="value">{details.phoneNum || "N/A"}</span>
                </div>
            </div>
            <div className="subflex2">
                <div className="detail-row">
                <span className="label">Street</span>
                <span className="value">{details.address || "N/A"}</span>
            </div>
            <div className="detail-row">
                <span className="label">City</span>
                <span className="value">{details.city || "N/A"}</span>
            </div>
            <div className="detail-row">
                <span className="label">State</span>
                <span className="value">{details.state || "N/A"}</span>
            </div>
            <div className="detail-row">
                <span className="label">Pincode</span>
                <span className="value">{details.pinCode || "N/A"}</span>
            </div>
            </div>
    </div>
    </>
    );
}