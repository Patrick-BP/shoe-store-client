import React from 'react'
import '../styles/additem.css'

export default function AddItem() {
  return (
    <>
    <h1>Add New Product</h1>
            <div className="form-container">
                <form>
                    <div className="form-grid">
                        <div className="form-group">
                            <label for="product-type">Select Product Type</label>
                            <select id="product-type" required>
                                <option value="">Please Select</option>
                                <option value="men">Men</option>
                                <option value="women">Women</option>
                                <option value="kids">Kids</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label for="product-code">Product Code</label>
                            <input type="text" id="product-code" required />
                        </div>
                        <div className="form-group">
                            <label for="product-title">Product Title</label>
                            <input type="text" id="product-title" required />
                        </div>
                        <div className="form-group">
                            <label for="total-stock">Total Stock</label>
                            <input type="number" id="total-stock" required />
                        </div>
                        <div className="form-group">
                            <label for="select-company">Select Company</label>
                            <select id="select-company" required>
                                <option value="">Please Select</option>
                                <option value="nike">Nike</option>
                                <option value="adidas">Adidas</option>
                                <option value="puma">Puma</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label for="cost-per-item">Cost Per Item</label>
                            <input type="number" id="cost-per-item" required />
                        </div>
                        <div className="form-group">
                            <label for="expiry-date">Expiry Date</label>
                            <input type="date" id="expiry-date" required />
                        </div>
                        <div className="form-group">
                            <label for="manufacture-date">Manufacture Date</label>
                            <input type="date" id="manufacture-date" required />
                        </div>
                    </div>
                    <div className="form-group">
                        <label for="description">Description</label>
                        <textarea id="description"></textarea>
                    </div>
                    <button type="submit" className="submit-btn">SUBMIT</button>
                </form>
            </div>
    </>
  )
}
