import React, { useEffect, useState } from 'react'
import '../styles/additem.css'
import typeService from '../services/typeService'
import itemService from '../services/ItemServices'

export default function AddItem() {

    const [types, setTypes] = useState([])

    useEffect(()=>{
        const typeList = typeService.getAllTypes();
        setTypes(typeList)
    },[]);
  return (
    <>
    <h1>Add New Product</h1>
            <div className="form-container">
                <form>
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="product-type">Select Product Type</label>
                            <select id="product-type" required>
                                <option value="">Please Select</option>
                                {types.length > 0 && types.map(type =>{
                                    return <option value="men">{type.name}</option>
                                })}
                                
                                
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="product-code">Product Code</label>
                            <input type="text" id="product-code" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="product-title">Product Title</label>
                            <input type="text" id="product-title" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="total-stock">Total Stock</label>
                            <input type="number" id="total-stock" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="select-company">Select Company</label>
                            <select id="select-company" required>
                                <option value="">Please Select</option>
                                <option value="nike">Nike</option>
                                <option value="adidas">Adidas</option>
                                <option value="puma">Puma</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="cost-per-item">Cost Per Item</label>
                            <input type="number" id="cost-per-item" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="expiry-date">Expiry Date</label>
                            <input type="date" id="expiry-date" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="manufacture-date">Manufacture Date</label>
                            <input type="date" id="manufacture-date" required />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea id="description"></textarea>
                    </div>
                    <button type="submit" className="submit-btn">SUBMIT</button>
                </form>
            </div>
    </>
  )
}
