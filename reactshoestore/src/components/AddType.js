import React, { useEffect, useState } from 'react'
import '../styles/additem.css'
import typeService from '../services/typeService'

export default function AddType() {
    const [newType, setNewType] = useState({typeName:"" , description:""})

    const handleChanges = (e) =>{
        e.preventDefault();
        const {name, value} = e.target;
        setNewType(prev=> ({...prev, [name]:value}))
    }

    const addType = () =>{
        
    }
    
  return (
    <>
    <h1>Add New Type</h1>
            <div className="form-container">
                <form>
                    <div className="form-grid">
                        
                       
                        <div className="form-group">
                            <label htmlFor="product-title">Category Name</label>
                            <input type="text" id="product-title" name='typeName' onChange={(e)=>handleChanges(e)} required />
                        </div>
                        
                        
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea id="description" name="description" onChange={(e)=>handleChanges(e)} ></textarea>
                    </div>
                    <button type="submit" className="submit-btn">SUBMIT</button>
                </form>
            </div>
    </>
  )
}
