import axios from "axios";

export const API_URL = "http://localhost:5000";

const $api = axios.create({
    withCredentials:true,
    baseURL:API_URL,
})

export default $api.interceptors.request.use((config)=>{
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
})

