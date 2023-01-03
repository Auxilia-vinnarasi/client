//protectedRoutes:all the protected routes i have to check the token
//if the token is present only its should be navigated to it. otherwise it should be send it to the login page..

import { message } from 'antd';
import axios from 'axios';
import React, {useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { setUser } from '../redux/usersSlice';
import {ShowLoading,HideLoading} from "../redux/alertsSlice";
import DefaultLayout from './DefaultLayout';

//i have to check if the token is present or not..

function ProtectedRoute({children}) {
   const dispatch=useDispatch();
   
   //instead of using const [loading,setLoading]=useState(true); i can use
//    const {loading}=useSelector((state=>state.alerts))
    //const [loading,setLoading]=useState(true);

    //instead of checking loading im checking user here.
    const {user}=useSelector(state=>state.users);

    //if the loading is false i am not showing the pages
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
            //    message.error("from:protected route try block")
                localStorage.removeItem("token");
                message.error(response.data.message);
                navigate("/login")
                //it will navigate to login page
            }
        }
        catch(err){
            //if it is wrong token i have to taken it in local storage
            dispatch(HideLoading());
            localStorage.removeItem("token");
            // message.error("from:protected route");
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
    <div>{user && <DefaultLayout>{children}</DefaultLayout>}</div>
  )
}

export default ProtectedRoute;