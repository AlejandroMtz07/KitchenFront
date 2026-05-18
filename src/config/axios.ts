import axios from "axios";


const api = axios.create({
    baseURL: 'https://kitchenapi-7cro.onrender.com/api'
})

export default api;