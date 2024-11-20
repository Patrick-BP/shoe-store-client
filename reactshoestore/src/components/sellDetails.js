import React, { useEffect, useState } from 'react'
import '../styles/sellDetails.css'
import { Link, useLocation } from 'react-router-dom'
import helper from '../Helpers/helperFun'
import itemService from '../services/ItemServices'

export default function SellDetails() {
    const location = useLocation();
    const {state} = location || {};
    const [customer, setCustomer] = useState(state);
    const [orderDetails, setOrderDetails] = useState({orderNo:"", oderDate:""});
    const [itemToAdd, SetItemToAdd] = useState({shoeId:null, quantity:null});
    const [getItem, setGetItem] = useState({})
    const [orders, setOrders] = useState([])

   

    useEffect(()=>{
        setOrderDetails({orderNo: helper.genCustomUuid(), oderDate: helper.getCurrentFormattedDate()});
    },[]);

    useEffect(()=>{
        if(itemToAdd.shoeId){
            const item = itemService.getItemById(itemToAdd.shoeId);
            setGetItem(item)
        }

      console.log(getItem)
    },[itemToAdd]);

const handleItemToAdd = (e)=>{
    e.preventDefault();
    const {name, value} = e.target
    SetItemToAdd(prev => ({...prev, [name]: value}))

}
const addItemFun = ()=>{
    console.log(itemToAdd)
}
  return (
    <>
              <h1 className="dashboard-title">Sells Dashboard</h1>

<div className="card">
    <h2 className="card-title">Customer and Order Details</h2>
    <div className="details-grid">
        <div>
            <div className="detail-item">
                <span className='label'>Order ID</span>
                <span className='value'>{orderDetails.orderNo}</span>
            </div>
            <div className="detail-item">
                <span className='label'>Customer Name</span>
                <span className='value'>{customer.customerName}</span>
            </div>
        </div>
        <div>
            <div className="detail-item">
                <span className='label'>Order Date</span>
                <span className='value'>{orderDetails.oderDate}</span>
            </div>
            <div className="detail-item">
                <span className='label'>Customer Mobile</span>
                <span className='value'>{customer.customerMobile}</span>
            </div>
        </div>
    </div>
</div>

<div className="card">
    <h2 className="card-title">Add Items into Cart</h2>
    <div className="success-alert">
        Item added into list
    </div>
    <div className="form-row">
        <div className="form-control">
            <select name='shoeId' onChange={(e) =>handleItemToAdd(e)}>
                <option >Please Select</option>
                <option value={1}>shoe1</option>
                <option value={2}>shoe2</option>
                <option value={3}>shoe3</option>
            </select>
        </div>
        <div className="form-control">
            <input type="text" placeholder="Enter Quantity" name='quantity' onChange={(e) =>handleItemToAdd(e)}/>
        </div>
        <button className="btn" onClick={addItemFun}>ADD ITEM</button>
    </div>
</div>

<div className="card">
    <h2 className="card-title">Order Item Details</h2>
    <table className="table">
        <thead>
            <tr>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Price Per Unit</th>
                <th>Total Units</th>
                <th>Total Cost</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>

            {orders.length >0 ? 
                orders && orders.map(item =>{
                    return (<tr>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.unitPrice}</td>
                        <td>{item.quantity}</td>
                        <td>{item.totalCost}</td>
                        <td>delete</td>
                    </tr>)
                })
                :
                <tr className="total-row">
                    <td colSpan="5">Total Amount:</td>
                    <td>0</td>
                </tr>

            }
                


        </tbody>
    </table>
    <Link to="/layout/Orderdetail">Order Detail</Link>
    <button className="btn save">SAVE ORDER</button>
</div>
    
    </>
  )
}
