import React from 'react'
import '../styles/orderDetail.css'

export default function OrderDetail() {
  return (
    <>
     <h1 className="page-title">Order Items of Order ID : 106</h1>

<div className="card">
    <h2 className="section-title">Order Details</h2>
    <div className="details-grid">
        <div>
            <div className="detail-row">
                <div className="detail-label">Order ID</div>
                <div className="detail-value">106</div>
            </div>
            <div className="detail-row">
                <div className="detail-label">Customer Name</div>
                <div className="detail-value">Kaushal Kishore</div>
            </div>
            <div className="detail-row">
                <div className="detail-label">Order Status</div>
                <div className="detail-value">Paid</div>
            </div>
        </div>
        <div>
            <div className="detail-row">
                <div className="detail-label">Order Date</div>
                <div className="detail-value">17 Apr 2022 03:34 AM</div>
            </div>
            <div className="detail-row">
                <div className="detail-label">Contact Number</div>
                <div className="detail-value">834573985</div>
            </div>
            <div className="detail-row">
                <div className="detail-label">Total Amount</div>
                <div className="detail-value">5000</div>
            </div>
        </div>
    </div>

    <h2 className="section-title">Order Items</h2>
    <table className="table">
        <thead>
            <tr>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Total Items</th>
                <th>Cost Per Unit</th>
                <th>Total Cost</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>6</td>
                <td>Formal Shoes</td>
                <td>1 Items</td>
                <td>2000</td>
                <td>2000</td>
            </tr>
            <tr>
                <td>7</td>
                <td>Boots</td>
                <td>1 Items</td>
                <td>3000</td>
                <td>3000</td>
            </tr>
        </tbody>
    </table>

    <div className="total-cost">Total Cost : 5000</div>
    <button className="btn-print">PRINT RECEIPT</button>
</div>
    </>
  )
}
