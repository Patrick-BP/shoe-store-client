import React, { useEffect, useState } from 'react'
import '../styles/itemListing.css'
import {useNavigate} from 'react-router-dom'
import {fetchTypes, updateType, deleteType} from '../store/slices/typesSlice'
import { useDispatch, useSelector } from 'react-redux';

export default function CategoryReport() {
  const {types, loading, error} = useSelector(state => state.types);
  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  useEffect(()=>{
    dispatch(fetchTypes())
  },[dispatch])



const handleDelete = (typeId) => {
  if (window.confirm('Are you sure you want to delete this type?')) {
    dispatch(deleteType(typeId)).then(()=>{
       dispatch(fetchTypes())
    })
   
  }
};

const editType = (typeId) =>{

  navigate("/layout/addtype", {state:{typeId}})
}


  return (
    <>
        <h1>All Products Report</h1>
        <div className="orders-table-container">
            <table className="product-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                {loading? <tbody><tr><td><p>Loading...</p></td></tr></tbody>: error? <tbody><tr><td><p style={{color:"red"}}>Error: {error}</p></td></tr></tbody>:
                <tbody>

                  {types && types.map(type =>{
                    return (
                      <tr key={type.type_id}>
                        <td>{type.type_id}</td>
                        <td>{type.typeName}</td>
                        <td>{type.description}</td>
                        <td>
                            <button className="action-btn " title="Edit"  onClick={()=>editType(type.type_id)}>✏️</button>
                            <button className="action-btn " title="Delete" onClick={()=>handleDelete(type.type_id)}>🗑️</button>
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
