import React from 'react'
import '../styles/itemListing.css'

export default function ItemListing() {
  return (
    <>
        <h1>All Products Report</h1>
            <table className="product-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Cost</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>M10001gg</td>
                        <td>Belly</td>
                        <td>Men</td>
                        <td>2000</td>
                        <td>
                            <button className="action-btn edit-btn">Edit</button>
                            <button className="action-btn delete-btn">Delete</button>
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>M10002</td>
                        <td>Ballet Shoes</td>
                        <td>Women</td>
                        <td>1500</td>
                        <td>
                            <button className="action-btn edit-btn">Edit</button>
                            <button className="action-btn delete-btn">Delete</button>
                        </td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>M10003</td>
                        <td>Sports Shoe</td>
                        <td>Kids</td>
                        <td>1000</td>
                        <td>
                            <button className="action-btn edit-btn">Edit</button>
                            <button className="action-btn delete-btn">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>    
    </>
  )
}
