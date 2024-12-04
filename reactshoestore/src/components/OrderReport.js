import React, { useEffect } from 'react'
import '../styles/orderReport.css'
import { useDispatch, useSelector } from 'react-redux'
import {fetchAllOrders} from '../store/slices/orderSSlice'
import { useNavigate } from 'react-router-dom';

export default function OrderReport() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {allCompletedOrders, loading, error} = useSelector(state => state.orders)
 

    useEffect(()=>{
        dispatch(fetchAllOrders())
    },[dispatch])


    const viewFun = (orderNo) =>{
        
        navigate('/layout/completedorder',{state:orderNo})
    }
  return (
    <>
     <h1 className="page-title">All Orders Report</h1>

<div className="orders-table-container">
    <table className="orders-table">
        <thead>
            <tr>
                <th>ID</th>
                <th>Customer Name</th>
                <th>Mobile</th>
                <th>Total Amount</th>
                <th>Date</th>
                <th>Actions</th>
            </tr>
        </thead>
        {allCompletedOrders.length === 0 && <tbody><tr><td><p>No orders Yet</p></td></tr></tbody>}
        {loading? <tbody><tr><td><p>Loading...</p></td></tr></tbody>: error? <tbody><tr><td><p style={{color:"red"}}>Error: {error}</p></td></tr></tbody>:
        <tbody>
            {allCompletedOrders && allCompletedOrders.map(order =>{
                return (
            <tr key={order.orderNo}>
                <td>{order.orderNo}</td>
                <td>{order.customerName}</td>
                <td>{order.customerMobile}</td>
                <td>${order.totalCost.toFixed(2)}</td>
                <td>{order.orderDate}</td>
                <td><button className="action-btn" onClick={()=>viewFun(order.orderNo)}>👁️</button></td>
            </tr>
                )
            })}
            
        
        </tbody>}
    </table>
</div>

    </>
  )
}
