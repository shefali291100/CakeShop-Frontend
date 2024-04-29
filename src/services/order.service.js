import axios from "axios"

 
export class OrderService{
   
    constructor(){
        this.axiosInstance = axios.create({
            baseURL: 'https://localhost:7024'
        });
    }
 
    async PostOrder(postData){
        try {
            const response = await this.axiosInstance.post('/api/Order',postData);
            console.log("api call")
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }

    async GetOrderByUserId(userId){
        try {
            const response = await this.axiosInstance.get(`/api/Order/byUserId/${userId}`);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
}
 
const orderService = new OrderService();
export default orderService