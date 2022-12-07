//protectedRoutes:all the protected routes we have to check the token
//if the token is present only its should be navigated to it. otherwise it should be send it to the login page..

import { message } from 'antd';
import axios from 'axios';
import React, {useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { setUser } from '../redux/usersSlice';
import {ShowLoading,HideLoading} from "../redux/alertsSlice";

//we have to check if the token is present or not..

function ProtectedRoute({children}) {
   const dispatch=useDispatch();
   
   //instead of using const [loading,setLoading]=useState(true); i can use
   const {loading}=useSelector((state=>state.alerts))
    //const [loading,setLoading]=useState(true);

    //if the loading is false we are not showing the pages
    const navigate=useNavigate();
    const validateToken=async ()=>{
        //perform api call here;
        try{
            dispatch (ShowLoading())
            const response=await axios.post("/api/users/get-user-by-id",{},{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            if(response.data.success){
                dispatch(HideLoading());
               // setLoading(false)
                dispatch(setUser(response.data.data))
            }
            else{
                dispatch(HideLoading());
               // setLoading(false);
                localStorage.removeItem("token");
                message.error(response.data.message);
                navigate("/login");
            }
        }
        catch(err){
            //if it is wrong token why we have to taken it in local storage
            dispatch(HideLoading());
            localStorage.removeItem("token");
            message.error(err.message);

           // setLoading(false);
            navigate("/login");
        }
    }

  useEffect(()=>{
    if(localStorage.getItem("token")){
        validateToken();
    }
    else{
        navigate("/login");
    }
  },[])

  return (
    <div>{loading ? <div>Loading...</div>:<>{children}</>}</div>
  )
}

export default ProtectedRoute;