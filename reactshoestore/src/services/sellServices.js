import axios from 'axios'

axios.defaults.baseURL = "http://localhost:8002/api/billing"


const createNewSell = async (order)=>{
    try {
        const response = await axios.post('/new', order);
        if(!response.status == 200) throw new Error("Failed to create order");
        return await response.data    

    } catch (error) {
        console.log("error creating order:", error);
        throw error;
    }
}
const getBillingById = async (orderId)=>{
    try {
        const response = await axios.get(`/${orderId}`);
        if(!response.status == 200) throw new Error("Failed to fetch order by Id: ");
        return response.data

    } catch (error) {
        console.log("error fetching order:", error);
        throw error;
    }
}
const getAllBilling = async ()=>{
    try {
        const response = await axios.get(`/all`);
        if(!response.status == 200) throw new Error("Failed to fetch all orders: ");
        return response.data

    } catch (error) {
        console.log("error fetching orders:", error);
        throw error;
    }
}

export default {
    createNewSell,
    getBillingById,
    getAllBilling,
}