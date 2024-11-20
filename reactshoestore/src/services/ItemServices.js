import axios from 'axios'

axios.defaults.baseURL = "http://localhost:8000/api/shoe-item"


const createNewItem = async (item)=>{
    try {
        const response = await axios.post('/new', item);
        if(!response.status == 200) throw new Error("Failed to create item");
        return await response.data    

    } catch (error) {
        console.log("error creating item:", error);
        throw error;
    }
}
const getItemById = async (itemId)=>{
    try {
        const response = await axios.get(`/${itemId}`);
        if(!response.status == 200) throw new Error("Failed to fetch item by Id: ");
        return response.data

    } catch (error) {
        console.log("error fetching item:", error);
        throw error;
    }
}
const getAllItem = async ()=>{
    try {
        const response = await axios.get(`/all`);
        if(!response.status == 200) throw new Error("Failed to fetch all items: ");
        return response.data

    } catch (error) {
        console.log("error fetching items:", error);
        throw error;
    }
}

export default {
    createNewItem,
    getItemById,
    getAllItem,
}