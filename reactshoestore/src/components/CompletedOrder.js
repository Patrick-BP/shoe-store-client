
import React, { useEffect, useState } from 'react';
import {  useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearOrders } from '../store/slices/orderSSlice';
import '../styles/sellDetails.css';


export default function CompletedOrder() {
    const dispatch = useDispatch();
    const [orders, setOrder] = useState([])
    const location = useLocation();
    const { state: orderDetails } = location || {};  

console.log(orderDetails)
    return (
      <>
      
        <h1 className="dashboard-title">Order items for Order ID : </h1>
        <div className="card">
          <h2 className="card-title">Order Details</h2>
          <div className="details-grid">
            <div>
              <div className="detail-item">
                <span className="label">Order ID</span>
                <span className="value">"orderNo"</span>
              </div>
              <div className="detail-item">
                <span className="label">Customer Name</span>
                <span className="value">{}</span>
              </div>
            </div>
            <div>
             
              <div className="detail-item">
                <span className="label">Customer Mobile</span>
                <span className="value">{}</span>
              </div>
            </div>
          </div>
        </div>
  
       
        
        <div className="card">
          <h2 className="card-title">Order Items</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Total Items</th>
                <th>Price Per Unit</th>
                <th>Total Cost</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.shoeId}>
                  <td>{order.shoeId}</td>
                  <td>{order.name}</td>
                  <td>{order.quantity}</td>
                  <td>{order.unitPrice}</td>
                  <td>{order.unitPrice * order.quantity}</td>
                  <td>
                    
                  </td>
                </tr>
              ))}
              <tr className="total-row">
                <td colSpan="5">Total Amount:</td>
                <td>Total</td>
              </tr>
            </tbody>
          </table>
          
          <button className="btn " style={{backgroundColor: "red"}}>PRINT ORDER</button>
        </div>
      </>
    );
  }
  
