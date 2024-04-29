import axios from "axios"

 
export class LoginService{
   
 
    constructor(){
        this.axiosInstance = axios.create({
            baseURL: 'https://localhost:7024'
        });
    }
 
    async login({email,password}){
        try {
            const response = await this.axiosInstance.post('/api/Login/login',{email,passwordHash:password});
            return response.data;
        } catch (error) {
            throw error.response.data;
            // console.error('Error:', error);
        }
    }
}
 
const loginService = new LoginService();
export default loginService
