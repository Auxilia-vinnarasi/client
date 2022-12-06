//protectedRoutes:all the protected routes we have to check the token
//if the token is present only its should be navigated to it. otherwise it should be send it to the login page..

import axios from 'axios';
import React, { Children, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
//we have to check if the token is present or not..
function ProtectedRoute() {
    const [loading,setLoading]=useState(true);
    //if the loading is false we are not showing the pages
    const navigate=useNavigate();
    const validateToken=()=>{
        //perform api call here;
        try{
            const response=axios.post("/api/users/get-user-by-id",{},{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            if(response.status){
                setLoading=false;
            }
            else{
                setLoading=false;
                navigate("/login");
            }
        }
        catch(err){
            setLoading=false;
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
    <div>{loading ? <div>Loading...</div>:<>{Children}</>}</div>
  )
}

export default ProtectedRoute