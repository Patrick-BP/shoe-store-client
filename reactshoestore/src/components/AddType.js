import React, {  useEffect, useState } from 'react'
import '../styles/additem.css'

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from 'react-router-dom';
import { createType, updateType } from '../store/slices/typesSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function AddType() {
    const location = useLocation();
    const {state} = location || {};
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const {types} = useSelector(state => state.types)

    
    const [newType, setNewType] = useState({typeName:"" , description:""})
    const [isEditing, setIsEditing] = useState(false);
   

    useEffect(()=>{
        if(state) {
            setIsEditing(true)
            setNewType(types.find(type=> type.type_id === state.typeId))
        }
    },[])

    const handleChanges = (e) =>{
        const {name, value} = e.target;
        setNewType(prev=> ({...prev, [name]:value}));

    }

    const handleFormSubmit = async (e) =>{
        e.preventDefault();

       if(isEditing){
        dispatch(updateType({typeId: state.typeId , typeName:newType.typeName, description:newType.description})).then(() => {
            setNewType({  typeName: '', description: '' });
            setIsEditing(false);
          });

       }else{
        dispatch(createType(newType)).then((data) => {
            setNewType({ typeName: '', description: '' });
            
            if(data.meta.requestStatus === "fulfilled"){
                toast("Type created succefuly", {
                   style: { backgroundColor: "green", color: "#fff" },
                   autoClose: 1000,
                   onClose:()=> navigate('/layout/category')
                 })
                
           }else{
               toast("There was an error", {
                   style: { backgroundColor: "red", color: "#fff" },
                   autoClose: 5000
                 })
           }
          });

       }
        
    }

    const updateTypeFunc = (updatedType) =>{
    
        setNewType(updatedType);
        setIsEditing(true);    
    }

  
  return (
    <>
   {!state ? <h1>Add New Type</h1>: <h1>Update Type</h1>}
            <div className="form-container">
                <form onSubmit={handleFormSubmit}>
                    <div className="form-grid">
                        
                       
                        <div className="form-group">
                            <label htmlFor="product-title">Category Name</label>
                            <input type="text" id="product-title" value={newType?.typeName} name='typeName' onChange={handleChanges} required />
                        </div>
                        
                        
                    </div>
                    <ToastContainer />
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea id="description" value={newType?.description} name="description" onChange={handleChanges} required></textarea>
                    </div>

                   {isEditing ? <button type="submit" className="submit-btn" onClick={()=>updateTypeFunc(newType)}>UPDATE</button>:
                    <button type="submit" className="submit-btn">SUBMIT</button>}
                </form>
            </div>
    </>
  )
}
