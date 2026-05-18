import axios from "axios";


const api = axios.create({
    baseURL: 'https://kitchenapi-7cro.onrender.com/'
})

export default api;