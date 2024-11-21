import React, { useEffect, useState } from 'react'
import '../styles/sellDetails.css'
import { Link, useLocation } from 'react-router-dom'
import helper from '../Helpers/helperFun'
import itemService from '../services/ItemServices'
import sellService from '../services/sellServices'

export default function SellDetails() {
    const location = useLocation();
    const {state} = location || {};
    const [customer, setCustomer] = useState(state);
    const [orderDetails, setOrderDetails] = useState({orderNo:"", oderDate:""});
    const [itemToAdd, SetItemToAdd] = useState({shoeId:null, quantity:null});
    const [getItem, setGetItem] = useState({})
    const [orders, setOrders] = useState([])
    const [getAllItems, setGetAllItems] = useState();
    const [message, setmessage] = useState()
   const [isGood, setIsGood] = useState(false)
   
    const fetctItems = async ()=> await itemService.getAllItem();

    useEffect(()=>{
        setOrderDetails({orderNo: helper.genCustomUuid(), oderDate: helper.getCurrentFormattedDate()});
        fetctItems().then(response => setGetAllItems(response))
    },[]);

   

const handleItemToAdd = (e)=>{
    e.preventDefault();
    const {name, value} = e.target
    SetItemToAdd(prev => ({...prev, [name]: value}))

}
const addItemFun = async (e)=>{
    e.preventDefault()
    const selectedItem = getAllItems.filter(item => item.id == itemToAdd.shoeId);
   
    if(selectedItem[0].quantity < Number(itemToAdd.quantity) ){
        
        setmessage(`There are only ${selectedItem[0].quantity} Items available`)
        setIsGood(true)
        
    }else{
       
        setGetItem(selectedItem[0]);
        const itemm = { shoeId:selectedItem[0].id , unitPrice:selectedItem[0].price}
       console.log({...customer, ...orderDetails, ...itemm , quantity:itemToAdd.quantity }) 
        const resp = await sellService.createNewSell({...customer, ...orderDetails, ...itemm , quantity:itemToAdd.quantity })
        resp.then(response => SetItemToAdd({shoeId:null, quantity:null}))
        setmessage(`Item has been added`);
        setIsGood(true);
        SetItemToAdd({shoeId:null, quantity:null})
    }

   
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
    {isGood ? <div  className="success-alert">{message}</div>:<></>}
    <div className="form-row">
        <div className="form-control">
            <select name='shoeId' onChange={(e) =>handleItemToAdd(e)}>
                <option >Please Select</option>
                {getAllItems && getAllItems.map(item => {
                    return <option key={item.id} value={item.id}>{item.name}</option>
                }) }
                
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
