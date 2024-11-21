import axios from 'axios'

axios.defaults.baseURL = "http://localhost:8001/api/shoe-types"


const createNewType = async (type)=>{
    try {
       
        const response = await axios.post('', type);
        if(!response.status === 200) throw new Error("Failed to fetch type by Id: ");
        
        return {status: response.status, response:response.data, message:"A new type was created "} 

    } catch (error) {
        return {status: error, response:null, message:error.message} 
    }
}
const getTypeById = async (typeId)=>{
    try {
        const response = await axios.get(`/${typeId}`);
        if(!response.status === 200) throw new Error("Failed to fetch type by Id: ");
        return response.data

    } catch (error) {
        console.log("error fetching type:", error);
        throw error;
    }
}
const getAllTypes = async ()=>{
    try {
        const response = await axios.get();
        
        if(!response.status === 200) throw new Error("Failed to fetch all types: ");
        return await response.data

    } catch (error) {
        console.log("error fetching types:", error);
        throw error;
    }
}

const deleteType =  (typeId)=>{
    try {
        const response = axios.delete(`/${typeId}`);
        if(!response.status === 204) throw new Error("Failed to delete a type: ");
        return  response.data

    } catch (error) {
        console.log("error delete type:", error);
        throw error;
    }
}

const updateType = async (typeId, type)=>{
    try {
       
        const response = await axios.put(`/${typeId}`, type);
        if(!response.status === 200) throw new Error("Failed to update type by Id: ");
        
        return {status: response.status, response:response, message:"Type has been updated "} 

    } catch (error) {
        return {status: error, response:null, message:error.message} 
    }
}



const api = {
    createNewType,
    getTypeById,
    getAllTypes,
    deleteType,
    updateType
}

export default api;