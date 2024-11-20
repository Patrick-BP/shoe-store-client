import axios from 'axios'

axios.defaults.baseURL = "http://localhost:8001/api/shoe-types"


const createNewType = async (type)=>{
    try {
        const response = await axios.post('/new', type);
        if(!response.status == 200) throw new Error("Failed to create type");
        return await response.data    

    } catch (error) {
        console.log("error creating type:", error);
        throw error;
    }
}
const getTypeById = async (typeId)=>{
    try {
        const response = await axios.get(`/${typeId}`);
        if(!response.status == 200) throw new Error("Failed to fetch type by Id: ");
        return response.data

    } catch (error) {
        console.log("error fetching type:", error);
        throw error;
    }
}
const getAllTypes = async ()=>{
    try {
        const response = await axios.get();
        
        if(!response.status == 200) throw new Error("Failed to fetch all types: ");
        return response.data

    } catch (error) {
        console.log("error fetching types:", error);
        throw error;
    }
}

export default {
    createNewType,
    getTypeById,
    getAllTypes,
}