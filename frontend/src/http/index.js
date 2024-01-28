import axios from "axios";

export const API_URL = "http://localhost:5000/api";

const $api = axios.create({
    withCredentials:true,
    baseURL:API_URL,
})

$api.interceptors.request.use((config)=>{
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    
    return config;
})

$api.interceptors.response.use((config)=>{
    return config;
}, (async (error) =>{

    if(error.status === "401" && error.config && error.config._isRetry){
        try{

            const response = await axios.get(`${API_URL}/refresh`, {withCredentials:true});
            localStorage.setItem("token", response.data.accessToken);
            return $api.request(error.config);
        }catch(err){
            console.log("user not authorized", err);
        }

    }

    throw error;
}))

export default $api;
