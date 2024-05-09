import React, { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {StoreContext} from '../../context/StoreContext'
import axios from 'axios'
const Verify = () => {

    const[searchParmas,setSearchParmas]=useSearchParams();
    const success=searchParmas.get("success")
    const orderId=searchParmas.get("orderId")
    const {url}=useContext(StoreContext);
    const navigate=useNavigate();

    const verifyPayment=async(req,res)=>{
    const response=await axios.post(url+"/api/order/verify",{success,orderId});
    if (response.data.success) {
        navigate("/myorders");
    }
    else{
        navigate("/")
    }
}
    
    // console.log(success,orderId);
    useEffect(()=>{
        verifyPayment();
    },[])
  return (
    <div className='verify'>
        <div className="spinner">

        </div>

    </div>
  )
}

export default Verify