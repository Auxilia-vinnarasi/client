//login and registration are the public routes plus im having home page also the public routes..
//import axios from 'axios';
import React, { useEffect} from 'react';
//import  {useState } from 'react'
// import { useDispatch } from 'react-redux';
import {useNavigate } from 'react-router-dom'
// import { setUser } from '../redux/usersSlice';
// import {message} from "antd";

import {HomeNew}from '../pages/HomeNew';

//i will receive the pages ie (children) as props
function PublicRoute({children}) {
  // const dispatch=useDispatch();
  // const [loading,setLoading]=useState(true);
const navigate=useNavigate();
  useEffect(()=>{
    //if(localStorage.getItem("token")){
      //validateToken();
    //navigate("/");
     navigate("/HomeNew");
}
  },[])


  
  return (
    <div>{children}</div>
  )
}

export default PublicRoute
