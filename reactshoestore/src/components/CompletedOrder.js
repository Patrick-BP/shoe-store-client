
import React, { useEffect } from 'react';
import {  useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrdersByOrderNo } from '../store/slices/orderSSlice';
import '../styles/sellDetails.css';


export default function CompletedOrder() {
    const {completedOrder} = useSelector(state => state.orders);
    const dispatch = useDispatch()
    const location = useLocation();
    const { state } = location || {};  
    

    useEffect(()=>{
      dispatch(fetchOrdersByOrderNo(state));
    },[dispatch, state])

console.log(completedOrder)
    return (
      <>
      
        <h1 className="dashboard-title">Order items for Order ID : {completedOrder[0]?.orderNo}</h1>
        <div className="card">
          <h2 className="card-title">Order Details</h2>
          <div className="details-grid">
            <div> 
              <div className="detail-item">
                <span className="label">Customer Name</span>
                <span className="value">{completedOrder[0]?.customerName}</span>
              </div> 
              <div className="detail-item">
                <span className="label">Customer Mobile</span>
                <span className="value">{completedOrder[0]?.customerMobile}</span>
              </div>
              <div className="detail-item">
                <span className="label">Order Status</span>
                <span className="value">Paid</span>
              </div>
             
            </div>
            <div>
            <div className="detail-item">
                <span className="label">Order Date</span>
                <span className="value">{completedOrder[0]?.orderDate}</span>
              </div>
            <div className="detail-item">
                <span className="label">OrderNo</span>
                <span className="value">{completedOrder[0]?.orderNo}</span>
              </div>
             
              <div className="detail-item">
                <span className="label">Total</span>
                <span className="value">${completedOrder.reduce((acc, curr)=> acc + curr.total,  0)}</span>
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
              {completedOrder.map((order) => (
                <tr key={order.shoeId}>
                  <td>{order.shoeId}</td>
                  <td>{order.name}</td>
                  <td>{order.quantity}</td>
                  <td>${order.unitPrice}</td>
                  <td>${order.unitPrice * order.quantity}</td>
                  <td>
                    
                  </td>
                </tr>
              ))}
              <tr className="total-row">
                <td colSpan="5">Total Amount:</td>
                <td>${completedOrder.reduce((acc, curr)=> acc + curr.total,  0)}</td>
              </tr>
            </tbody>
          </table>
          
          <button className="btn " style={{backgroundColor: "red"}}>PRINT ORDER</button>
        </div>
      </>
    );
  }
  
