import axios from "axios"

 
export class AddressService{
   
    constructor(){
        this.axiosInstance = axios.create({
            baseURL: 'https://localhost:7024'
        });
    }
 
    async PostAddress({customerId, city, state, pincode, streetAddress, landmark}){
        const data = {
            customerId: customerId,
            city: city,
            state: state,
            pincode: pincode,
            streetAddress : streetAddress,
            landmark: landmark
        }
        console.log(data)
        try {
            const response = await this.axiosInstance.post('/api/Address',data);
            console.log("api call")
            return response.data;
        } catch (error) {
            throw error.response.data;
    

        }
    }
    async GetByCustomerId(customerId){
        try {
            const response = await this.axiosInstance.post(`/api/Address/${customerId}`);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }


}
 
const addressService = new AddressService();
export default addressService