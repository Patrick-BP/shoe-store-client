import React, { useEffect, useState } from 'react'
import '../styles/sellDetails.css'
import { Link, useLocation } from 'react-router-dom'
import helper from '../Helpers/helperFun'
import { fetchItems } from '../store/slices/itemsSlice'
import { useDispatch, useSelector } from 'react-redux'

export default function SellDetails() {
    const dispatch = useDispatch();
    const {items} = useSelector(state => state.items)
    const location = useLocation();
    const {state} = location || {};
    const [customer, setCustomer] = useState(state);
    const [orderDetails, setOrderDetails] = useState({orderNo:"", oderDate:""});
    const [itemToAdd, SetItemToAdd] = useState({shoeId:null, quantity:null});
    const [getItem, setGetItem] = useState({})
    const [orders, setOrders] = useState([])
    const [message, setmessage] = useState()
   const [isGood, setIsGood] = useState(false)
   
    // const fetctItems = async ()=> await itemService.getAllItem();

    useEffect(()=>{
        dispatch(fetchItems());
        setOrderDetails({orderNo: helper.genCustomUuid(), oderDate: helper.getCurrentFormattedDate()});
        // fetctItems().then(response => setGetAllItems(response))
    },[]);

   

const handleItemToAdd = (e)=>{
    e.preventDefault();
    const {name, value} = e.target
    SetItemToAdd(prev => ({...prev, [name]: value}))

}
const addItemFun = async (e)=>{
    e.preventDefault()
    const selectedItem = items.find(item => item.id === Number(itemToAdd.shoeId));
    
    if(selectedItem.quantity < Number(itemToAdd.quantity) ){
        
        setmessage(`There are only ${selectedItem.quantity} Items available`)
        setIsGood(true)
        
    }else{
       
        setGetItem(selectedItem);
        const itemm = { shoeId:selectedItem.id , unitPrice:selectedItem.price}
        
        // const resp = await sellService.createNewSell({...customer, ...orderDetails, ...itemm , quantity:itemToAdd.quantity })
        
        setmessage(`Item has been added`);
        setIsGood(true);
        SetItemToAdd({shoeId:"", quantity:""})
        setOrders(prev => [...prev, {...customer, ...orderDetails, ...itemm , quantity:itemToAdd.quantity }])
    }

   
}

const deleteOrder = (shoeId)=>{
    const newArray = orders.filter(order => order.shoeId !== shoeId)
    setOrders(newArray)
}

console.log(orders)
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
                {items && items.map(item => {
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
                <th>Total Items</th>
                <th>Price Per Unit</th>
                <th>Total Cost</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>

            {orders.length >0 && 
                orders && orders.map(item =>{
                    return (<tr key={item.id}>
                        <td>{item.shoeId}</td>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.unitPrice}</td>
                        <td>{item.unitPrice * item.quantity}</td>
                        <td><button className="action-btn delete-btn" onClick={()=>deleteOrder(item.shoeId)}>Delete</button></td>
                    </tr>)
                })}
                
                <tr className="total-row">
                    <td colSpan="5">Total Amount:</td>
                    <td>0</td>
                </tr>

            
                


        </tbody>
    </table>
    <Link to="/layout/Orderdetail">Order Detail</Link>
    <button className="btn save">SAVE ORDER</button>
</div>
    
    </>
  )
}
