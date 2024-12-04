import React,  { useEffect } from 'react'
import '../styles/itemListing.css'
import {useNavigate} from 'react-router-dom'
import { fetchItems, deleteItem } from '../store/slices/itemsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';

export default function ItemListing() {
    const navigate = useNavigate();
    const {items, loading, error} = useSelector(state=> state.items);
    const dispatch = useDispatch();

    useEffect(()=>{
      dispatch(fetchItems())    
    },[dispatch])
  
  const deleteProduct = (prodId) =>{
   if(window.confirm('Are you sure you want to delete this product?')){
      dispatch(deleteItem(prodId)).then((response)=>{
          if(response.meta.requestStatus === 'fulfilled'){
          
            toast("New Has been Added", {
              style: { backgroundColor: "green", color: "#fff" },
              autoClose: 1000,
             onClose : ()=> navigate('/layout/itemlisting')
            })
            dispatch(fetchItems())    
      }else{
          toast("There was an error", {
              style: { backgroundColor: "red", color: "#fff" },
            })
      }
      })
   }
      
  }
  
  const editProduct = (prod) =>{
    navigate("/layout/additem", {state:{prod}})
  }
  
  return (
    <>
        <h1>All Products Report</h1>
        <ToastContainer />
        <div className="orders-table-container">
            <table className="product-table">
                <thead >
                    <tr>
                        <th>ID</th>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Cost</th>
                        <th>Stock</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                {loading? <tbody><tr><td><p>Loading...</p></td></tr></tbody>: error? <tbody><tr><td><p style={{color:"red"}}>Error: {error}</p></td></tr></tbody>:
              
                <tbody>

                    {items && items.map(prod => {
                        return (
                        <tr key={prod.id}  style={prod.quantity === 0 ? { color: "red" } : {}}>
                        <td>{prod.id}</td>
                        <td>{prod.item_code}</td>
                        <td>{prod.name}</td>
                        <td>{prod.type_id}</td>
                        <td>{prod.price}</td>
                        <td>{prod.quantity}</td>
                        <td>
                        <button className="action-btn " title="Edit" onClick={()=>editProduct(prod)}>✏️ </button>
                        <button className="action-btn" title="Delete" onClick={()=>deleteProduct(prod.id)}>🗑️</button>
                         </td>
                    </tr>
                        )
                    })}
                    
                    
                </tbody>}
            </table> 
            </div>   
    </>
  )
}
