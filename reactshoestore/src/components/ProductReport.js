import React from 'react'

export default function ProductReport() {
  return (
    <>
              <h1 class="dashboard-title">Sells Dashboard</h1>

<div class="card">
    <h2 class="card-title">Customer and Order Details</h2>
    <div class="details-grid">
        <div>
            <div class="detail-item">
                <span>Order ID</span>
                <span>106</span>
            </div>
            <div class="detail-item">
                <span>Customer Name</span>
                <span>Kaushal Kishore</span>
            </div>
        </div>
        <div>
            <div class="detail-item">
                <span>Order Date</span>
                <span>17 Apr 2022 03:34 AM</span>
            </div>
            <div class="detail-item">
                <span>Customer Mobile</span>
                <span>834573985</span>
            </div>
        </div>
    </div>
</div>

<div class="card">
    <h2 class="card-title">Add Items into Cart</h2>
    <div class="success-alert">
        Item added into list
    </div>
    <div class="form-row">
        <div class="form-control">
            <select>
                <option>Please Select</option>
            </select>
        </div>
        <div class="form-control">
            <input type="text" placeholder="Enter Quantity"/>
        </div>
        <button class="btn">ADD ITEM</button>
    </div>
</div>

<div class="card">
    <h2 class="card-title">Order Item Details</h2>
    <table class="table">
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
            <tr class="total-row">
                <td colspan="5">Total Amount:</td>
                <td>0</td>
            </tr>
        </tbody>
    </table>
</div>
    
    </>
  )
}
