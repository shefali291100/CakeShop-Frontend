import axios from "axios"


export class CakeService{
    

    async fetchCakes(){
        let API_BASE_URL = 'https://localhost:7024/api'

        let data = await axios.get(`${API_BASE_URL}/Cake`);
        return data.data;
    }
}

let cakeService = new CakeService();
export default cakeService;