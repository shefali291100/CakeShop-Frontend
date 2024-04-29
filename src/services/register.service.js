import axios from "axios"

 
export class RegisterService{
   
    constructor(){
        this.axiosInstance = axios.create({
            baseURL: 'https://localhost:7024'
        });
    }
 
    async PostCustomerForRegister({firstName, lastName, phoneNo, email, passwordHash}){
        const data = {
            firstName: firstName,
            lastName: lastName,
            phoneNo: phoneNo,
            email: email,
            passwordHash : passwordHash,
            isAdmin: false
        }
        try {
            const response = await this.axiosInstance.post('/api/Customer',data);
            console.log("api call")
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }

}
 
const registerService = new RegisterService();
export default registerService