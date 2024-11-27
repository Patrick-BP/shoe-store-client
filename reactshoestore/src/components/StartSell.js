import React, { useState } from 'react'
import '../styles/startsell.css'
import { Link, useNavigate } from 'react-router-dom';
import helper from '../Helpers/helperFun'


export default function StartSell() {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({customerName:"", customerMobile:""});
  const {formattingFoneNumbers} = helper;

  const changeHandle = (e) =>{
    e.preventDefault();
    const {name, value} = e.target;
   
      setCustomer(prev => ({...prev, [name]:value}));
    
  }

  

const startSellBtn = () =>{
  
  const fortmatedFone = formattingFoneNumbers(customer.customerMobile);
  navigate('/layout/addorders', {state:{customerName: customer.customerName, customerMobile: fortmatedFone}});
}

  
  return (
    <>
    <h1>Sells Dashboard</h1>
            <div className="sales-form">
                <h2 className="form-title">Enter Customer Name and Mobile to start sells</h2>
                <div className="form-grid">
                    <input type="text" placeholder="Enter Customer Name" name='customerName' onChange={(e) =>changeHandle(e)} />
                    <input type="tel" placeholder="Enter Customer Mobile" name='customerMobile' onChange={(e)=>changeHandle(e)}/>
                    <button className="start-sell-btn" onClick={startSellBtn}>START SELL</button>
                    <Link to="/layout/addorders">Next</Link>
                </div>
            </div>
    
    </>
    
            
  )
}
