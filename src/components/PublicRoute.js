//login and registration are the public routes plus im having home page also the public routes..
//import axios from 'axios';
import React, { useEffect} from 'react';
//import  {useState } from 'react'
// import { useDispatch } from 'react-redux';
import {useNavigate } from 'react-router-dom'
// import { setUser } from '../redux/usersSlice';
// import {message} from "antd";

//i will receive the pages ie (children) as props
function PublicRoute({children}) {
  // const dispatch=useDispatch();
  // const [loading,setLoading]=useState(true);
const navigate=useNavigate();
  useEffect(()=>{
    if(localStorage.getItem("token")){
      //validateToken();
    navigate("/");
}
  },[])

//   const validateToken=async ()=>{
//     const response=await axios.post("/api/users/get-user-by-id",{},{
//       headers:{
//           Authorization: `Bearer ${localStorage.getItem("token")}`
//       }
//   })
//     if(response.data.success){
//       setLoading(false)
//       dispatch(setUser(response.data.data))
//   }
//   else{
//     setLoading(false);
//     localStorage.removeItem("token");
//     message.error(response.data.message);
//     navigate("/login");
// }
//   }

  return (
    <div>{children}</div>
  )
}

export default PublicRoute