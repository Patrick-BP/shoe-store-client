import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../styles/sellDetails.css';
import { fetchItems } from '../store/slices/itemsSlice';
import { addOrder, deleteOrder , saveOrder} from '../store/slices/orderSSlice'
import { setMessage } from '../store/slices/messageSlice';
import helper from '../Helpers/helperFun';
import { ToastContainer, toast } from "react-toastify";

export default function SellDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const items = useSelector((state) => state.items.items);
  const orders = useSelector((state) => state.orders.orders);
  const totalAmount = useSelector((state) => state.orders.totalAmount);
  const { message, isGood } = useSelector((state) => state.message);
  const location = useLocation();
  const { state: customer } = location || {};
  
  const [orderDetails, setOrderDetails] = useState({
    orderNo: '',
    
  });
  const [itemToAdd, setItemToAdd] = useState({ shoeId: '', quantity: '' });

  useEffect(() => {
    dispatch(fetchItems());
    setOrderDetails({
      orderNo: helper.genCustomUuid(),
    
    });
  }, [dispatch]);

  const handleItemToAdd = (e) => {
    const { name, value } = e.target;
    setItemToAdd((prev) => ({ ...prev, [name]: value }));
  };

  const addItemFun = (e) => {
    e.preventDefault();
    const selectedItem = items.find((item) => item.id === Number(itemToAdd.shoeId));
    if (!selectedItem) return;

    if (selectedItem.quantity < Number(itemToAdd.quantity)) {
      dispatch(
        setMessage({
          message: `There are only ${selectedItem.quantity} items available.`,
          isGood: false,
        })
      );
    } else {
      const newOrder = {
        shoeId: selectedItem.id,
        name: selectedItem.name,
        unitPrice: selectedItem.price,
        quantity: Number(itemToAdd.quantity),
        ...orderDetails,
        ...customer,
      };
      dispatch(addOrder(newOrder));
      dispatch(setMessage({ message: 'Item has been added!', isGood: true }));
      setItemToAdd({ shoeId: '', quantity: '' });
    }
  };

  const handleDeleteOrder = (shoeId) => {
    dispatch(deleteOrder(shoeId));
  };

  
    const handleSaveOrder = () => {
        orders.forEach((order) => {
          dispatch(saveOrder(order)).then(resp =>{
            if(resp.meta.requestStatus === 'fulfilled'){
                
                toast("New Order Has been Added", {
                   style: { backgroundColor: "green", color: "#fff" },
                   autoClose: 1000,
                  onClose : ()=> navigate('/layout/itemlisting')
                 })
                 
           }else{
               toast("There was an error", {
                   style: { backgroundColor: "red", color: "#fff" },
                   autoClose: 1000,
                 })
           }
          });
        });
      };
  

  return (
    <>
    <ToastContainer/>
      <h1 className="dashboard-title">Sells Dashboard</h1>
      <div className="card">
        <h2 className="card-title">Customer and Order Details</h2>
        <div className="details-grid">
          <div>
            <div className="detail-item">
              <span className="label">Order ID</span>
              <span className="value">{orderDetails.orderNo}</span>
            </div>
            <div className="detail-item">
              <span className="label">Customer Name</span>
              <span className="value">{customer.customerName}</span>
            </div>
          </div>
          <div>
           
            <div className="detail-item">
              <span className="label">Customer Mobile</span>
              <span className="value">{customer.customerMobile}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="card-title">Add Items into Cart</h2>
        {message && <div className={`alert ${isGood ? 'success-alert' : 'error-alert'}`}>{message}</div>}
        <div className="form-row">
          <div className="form-control">
            <select name="shoeId" value={itemToAdd.shoeId} onChange={handleItemToAdd}>
              <option value="">Please Select</option>
              {items.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-control">
            <input
              type="number"
              placeholder="Enter Quantity"
              name="quantity"
              value={itemToAdd.quantity}
              onChange={handleItemToAdd}
            />
          </div>
          <button className="btn" onClick={addItemFun}>
            ADD ITEM
          </button>
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
            {orders.map((order) => (
              <tr key={order.shoeId}>
                <td>{order.shoeId}</td>
                <td>{order.name}</td>
                <td>{order.quantity}</td>
                <td>{order.unitPrice}</td>
                <td>{order.unitPrice * order.quantity}</td>
                <td>
                  <button className="action-btn delete-btn" onClick={() => handleDeleteOrder(order.shoeId)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            <tr className="total-row">
              <td colSpan="5">Total Amount:</td>
              <td>{totalAmount}</td>
            </tr>
          </tbody>
        </table>
        <Link to="/layout/Orderdetail">Order Detail</Link>
        <button onClick={handleSaveOrder} className="btn save">SAVE ORDER</button>
      </div>
    </>
  );
}
