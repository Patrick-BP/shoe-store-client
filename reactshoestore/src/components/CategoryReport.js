import React, { useEffect, useState } from 'react'
import '../styles/itemListing.css'
import typeService from '../services/typeService';
import {useNavigate} from 'react-router-dom'

export default function CategoryReport() {
  const [types, setTypes] = useState()
  const navigate = useNavigate();

  const response = async ()=> await typeService.getAllTypes();

  useEffect(()=>{
   response().then(data => setTypes(data));
  },[])

const deleteType = (typeId) =>{
   typeService.deleteType(typeId);
  setTypes(prev=> prev.filter(type => type.type_id !== typeId))
}

const editType = (typeId) =>{
  navigate("/layout/addtype", {state:{typeId}})
}

  return (
    <>
        <h1>All Products Report</h1>
            <table className="product-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>

                  {types && types.map(type =>{
                    return (
                      <tr key={type.type_id}>
                        <td>{type.type_id}</td>
                        <td>{type.typeName}</td>
                        <td>{type.description}</td>
                        <td>
                            <button className="action-btn edit-btn" onClick={()=>editType(type.type_id)}>Edit</button>
                            <button className="action-btn delete-btn" onClick={()=>deleteType(type.type_id)}>Delete</button>
                        </td>
                    </tr>
                    )
                  })}
                    
                    
                </tbody>
            </table>    
    </>
  )
}
