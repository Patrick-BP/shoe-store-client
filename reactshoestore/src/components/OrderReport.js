import React from 'react'
import '../styles/orderReport.css'

export default function OrderReport() {
  return (
    <>
     <h1 className="page-title">All Orders Report</h1>

<div className="orders-table-container">
    <table className="orders-table">
        <thead>
            <tr>
                <th>ID</th>
                <th>Customer Name</th>
                <th>Mobile</th>
                <th>Total Amount</th>
                <th>Date</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>88</td>
                <td>asdf</td>
                <td>asdfasdf</td>
                <td>581</td>
                <td>11 Aug 2021 02:28 PM</td>
                <td><button className="action-btn">👁️</button></td>
            </tr>
            <tr>
                <td>93</td>
                <td>Kaushal Kishore</td>
                <td>9876543211</td>
                <td>940</td>
                <td>11 Aug 2021 02:30 PM</td>
                <td><button className="action-btn">👁️</button></td>
            </tr>
            <tr>
                <td>98</td>
                <td>Amit Kumar</td>
                <td>9878676543</td>
                <td>34</td>
                <td>11 Aug 2021 04:36 PM</td>
                <td><button className="action-btn">👁️</button></td>
            </tr>
            <tr>
                <td>100</td>
                <td>Jay Kumar</td>
                <td>8787865454</td>
                <td>760</td>
                <td>12 Aug 2021 12:02 AM</td>
                <td><button className="action-btn">👁️</button></td>
            </tr>
            <tr>
                <td>106</td>
                <td>Kaushal Kishore</td>
                <td>834573985</td>
                <td>5000</td>
                <td>17 Apr 2022 03:34 AM</td>
                <td><button className="action-btn">👁️</button></td>
            </tr>
        </tbody>
    </table>
</div>

    </>
  )
}
