import React, { useEffect, useState } from 'react'
import '../styles/additem.css'
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import { fetchTypes } from '../store/slices/typesSlice';
import {createItem} from '../store/slices/itemsSlice'
import { useLocation, useNavigate } from 'react-router-dom';


export default function AddItem() {
    const {state} = useLocation();
    const {types} = useSelector(state => state.types);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [newProduct, setNewProduct] = useState({item_code:"", name:"", description:"", price:"", type_id:"", quantity:""});
    const [isEditing, setIsEditing]  = useState(false)


    useEffect(()=>{
       dispatch(fetchTypes());
       if(state){
        setNewProduct(state.prod)
        setIsEditing(true)
       }
    },[]);

    const handleChanges = (e)=>{
        const {name, value} = e.target;
        setNewProduct(prev=> ({...prev, [name]:value}));
    }

    const handleSumbit = (e)=>{
        e.preventDefault();
         dispatch(createItem(newProduct)).then((response)=>{

            if(response.meta.requestStatus === 'fulfilled' && isEditing){
                toast("Product has been updated", {
                    style: { backgroundColor: "green", color: "#fff" },
                    autoClose: 1000,
                   onClose : ()=> navigate('/layout/itemlisting')
                  })
                  
            }
            else if(response.meta.requestStatus === 'fulfilled'){
                
                toast("New Item Has been Added", {
                   style: { backgroundColor: "green", color: "#fff" },
                   autoClose: 1000,
                  onClose : ()=> navigate('/layout/itemlisting')
                 })
                 setNewProduct({item_code:"", name:"", description:"", price:"", typeId:"", quantity:""})
           }else{
               toast("There was an error", {
                   style: { backgroundColor: "red", color: "#fff" },
                 })
           }
         });
    }

    const updateProd = (newProduct)=>{
        console.log(newProduct)
    }
  return (
    <>
   {isEditing? <h1>Update Product</h1>:<h1>Add New Product</h1>}
    <ToastContainer />
            <div className="form-container">
                <form onSubmit={handleSumbit}>
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="product-type">Select Product Type</label>
                            <select id="product-type" name='type_id' onChange={handleChanges} required>
                                <option >Please Select</option>
                                {types.length > 0 && types.map(type =>{
                                   
                                    return <option value={type.type_id} key={type.type_id}>{type.typeName}</option>
                                })}
                                
                                
                            </select>
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="product-code">Product Code</label>
                            <input type="text" id="product-code"  name='item_code' value={newProduct.item_code} onChange={handleChanges}required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="product-title">Product Title</label>
                            <input type="text" id="product-title" name='name' value={newProduct.name} onChange={handleChanges}required />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="qty">Quantity</label>
                            <input type="number" id="quantity"  name='quantity' value={newProduct.quantity} onChange={handleChanges}required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cost-per-item">Cost Per Item</label>
                            <input type="number" id="cost-per-item"  name='price' value={newProduct.price} onChange={handleChanges}required />
                        </div>
                        
                        
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea id="description"  name='description' value={newProduct.description} onChange={handleChanges} required></textarea>
                    </div>
                    {isEditing ? <button type="submit" className="submit-btn" onClick={()=>updateProd(newProduct)}>UPDATE</button>:
                    <button type="submit" className="submit-btn">SUBMIT</button>}
                </form>
            </div>
    </>
  )
}
