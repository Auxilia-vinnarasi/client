//we need to put the headers for every post req.so i make it here..

import axios from "axios";

export const axiosInstance=axios.create({
    //taking base url from the proxy..
    // baseURL:"http://localhost:5000/api",
    baseURL:"https://tktbooking-backendd.onrender.com",
    headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
    }
})
