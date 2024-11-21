import axios from 'axios'

const baseApi ="http://localhost:8000/api/shoe-item"


const createNewItem = async (item)=>{
    try {
        const response = await axios.post(`${baseApi}/new`, item);
        if(!response.status === 200) throw new Error("Failed to create item");
        return {status: response.status, response:response.data, message:"A new Product was created "}  

    } catch (error) {
        return {status: error, response:null, message:error.message} 
    }
}
const getItemById = async (itemId)=>{
    try {
        const response = await axios.get(`${baseApi}/${itemId}`);
        if(!response.status === 200) throw new Error("Failed to fetch item by Id: ");
        return response.data

    } catch (error) {
        console.log("error fetching item:", error);
        throw error;
    }
}
export const getAllItem = async ()=>{
    
    try {
        const response = await axios.get(`${baseApi}/all`);
        if(!response.status === 200) throw new Error("Failed to fetch all items: ");
        return response.data

    } catch (error) {
        console.log("error fetching items:", error);
        throw error;
    }
}

const deleteProduct =  (prodId)=>{
    try {
        const response = axios.delete(`${baseApi}/${prodId}`);
        if(!response.status === 204) throw new Error("Failed to delete a type: ");
        return  response.data

    } catch (error) {
        console.log("error delete type:", error);
        throw error;
    }
}

const api = {
    createNewItem,
    getItemById,
    getAllItem,
    deleteProduct
  };
  
  export default api;