import React,  { useEffect, useState } from 'react'
import '../styles/itemListing.css'
import {useNavigate} from 'react-router-dom'
import ItemService from '../services/ItemServices'

export default function ItemListing() {
    const [products, setProducts] = useState()
    const navigate = useNavigate();
  
    const fetchProducts = async ()=> await ItemService.getAllItem();
    useEffect(()=>{
        fetchProducts().then(data => setProducts(data));
    },[])
  
  const deleteProduct = (prodId) =>{
    ItemService.deleteProduct(prodId);
    setProducts(prev=> prev.filter(prod => prod.id !== prodId))
  }
  
  const editProduct = (prodId) =>{
    navigate("/layout/additem", {state:{prodId}})
  }
  
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

                    {products && products.map(prod => {
                        return (
                        <tr key={prod.id}>
                        <td>{prod.id}</td>
                        <td>{prod.item_code}</td>
                        <td>{prod.name}</td>
                        <td>{prod.type_id}</td>
                        <td>{prod.price}</td>
                        <td>
                        <button className="action-btn edit-btn" onClick={()=>editProduct(prod.id)}>Edit</button>
                        <button className="action-btn delete-btn" onClick={()=>deleteProduct(prod.id)}>Delete</button>
                         </td>
                    </tr>
                        )
                    })}
                    
                    
                </tbody>
            </table>    
    </>
  )
}
