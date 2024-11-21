import React, { useEffect, useState } from 'react'
import '../styles/additem.css'
import typeService from '../services/typeService'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from 'react-router-dom';

export default function AddType() {
    const location = useLocation();
    const {state} = location || {};
    const navigate = useNavigate();

    const [newType, setNewType] = useState({typeName:"" , description:""})

   

    const handleChanges = (e) =>{
        const {name, value} = e.target;
        setNewType(prev=> ({...prev, [name]:value}))
    }

    const addType = async (e) =>{
        e.preventDefault();
        const response = await typeService.createNewType(newType)
        
        
        if(response.status === 201){
             toast(response.message, {
                style: { backgroundColor: "green", color: "#fff" },
              })
             setNewType({typeName:"" , description:""})
        }else{
            toast(response.message, {
                style: { backgroundColor: "red", color: "#fff" },
              })
        }
        
    }

    const updateType = (e) =>{
        e.preventDefault();
        
           const resp = typeService.updateType(state.typeId, newType);
           resp.then(response => {
            toast("Category has been updated",{
                onClose:()=>navigate("/layout/category") ,
                style: { backgroundColor: "green", color: "#fff" },
            })
            
        })
          
    }

  
    const fetchType = async ()=> await typeService.getTypeById(state.typeId);

    useEffect(()=>{
        if(state){
            fetchType().then(data => setNewType(data)); 
        }
         
    },[]);
    
    
  return (
    <>
   {!state ? <h1>Add New Type</h1>: <h1>Update Type</h1>}
            <div className="form-container">
                <form>
                    <div className="form-grid">
                        
                       
                        <div className="form-group">
                            <label htmlFor="product-title">Category Name</label>
                            <input type="text" id="product-title" value={newType.typeName} name='typeName' onChange={handleChanges} required />
                        </div>
                        
                        
                    </div>
                    <ToastContainer />
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea id="description" value={newType.description} name="description" onChange={handleChanges} required></textarea>
                    </div>

                   {state ? <button type="submit" className="submit-btn" onClick={updateType}>UPDATE</button>:
                    <button type="submit" className="submit-btn" onClick={addType}>SUBMIT</button>}
                </form>
            </div>
    </>
  )
}
