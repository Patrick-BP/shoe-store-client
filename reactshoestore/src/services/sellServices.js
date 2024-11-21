import axios from 'axios'

const baseURL = "http://localhost:8002/api/billing"


const createNewSell = async (order)=>{
    try {
        const response = await axios.post(`${baseURL}/new`, order);
        if(!response.status == 200) throw new Error("Failed to create order");
        return await response.data    

    } catch (error) {
        console.log("error creating order:", error);
        throw error;
    }
}
const getBillingById = async (orderId)=>{
    try {
        const response = await axios.get(`${baseURL}/${orderId}`);
        if(!response.status == 200) throw new Error("Failed to fetch order by Id: ");
        return response.data

    } catch (error) {
        console.log("error fetching order:", error);
        throw error;
    }
}
const getAllBilling = async ()=>{
    try {
        const response = await axios.get(`${baseURL}/all`);
        if(!response.status == 200) throw new Error("Failed to fetch all orders: ");
        return response.data

    } catch (error) {
        console.log("error fetching orders:", error);
        throw error;
    }
}

const api = {
    createNewSell,
    getBillingById,
    getAllBilling,
}

export default api;