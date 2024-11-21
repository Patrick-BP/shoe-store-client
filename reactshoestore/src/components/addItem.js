import React, { useEffect, useState } from 'react'
import '../styles/additem.css'
import typeService from '../services/typeService'
import itemService from '../services/ItemServices'
import { ToastContainer, toast } from "react-toastify";

export default function AddItem() {

    const [types, setTypes] = useState([]);
    const [newProduct, setNewProduct] = useState({item_code:"", name:"", description:"", price:null, type_id:null, quantity:""})

    const fetchTypes = async ()=> await typeService.getAllTypes();

    useEffect(()=>{
        fetchTypes().then(response => setTypes(response))
    },[]);

    const handleChanges = (e)=>{
        const {name, value} = e.target;
        setNewProduct(prev=> ({...prev, [name]:value}));
    }
    const addItem = async (e) => {
        e.preventDefault();
        const response = await itemService.createNewItem(newProduct);

        if(response.status === 201){
            toast(response.message, {
               style: { backgroundColor: "green", color: "#fff" },
             })
             setNewProduct({item_code:"", name:"", description:"", price:null, typeId:null, quantity:""})
       }else{
           toast(response.message, {
               style: { backgroundColor: "red", color: "#fff" },
             })
       }

    }
  return (
    <>
    <h1>Add New Product</h1>
    <ToastContainer />
            <div className="form-container">
                <form>
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
                        <textarea id="description"  name='description' value={newProduct.description} onChange={handleChanges}></textarea>
                    </div>
                    <button type="submit" className="submit-btn" onClick={addItem}>SUBMIT</button>
                </form>
            </div>
    </>
  )
}
