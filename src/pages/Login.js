import React from 'react'
import {Form,message} from "antd";
//import {Button} from "antd";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../redux/alertsSlice';


function Login() {
  const navigate=useNavigate();
  const dispatch=useDispatch()
  const onFinish=async (values)=>{
    //console.log(values);
    try{
      dispatch(ShowLoading());
      const response=await axios.post("/api/users/login",values);
      dispatch(HideLoading());

      if(response.data.success){
        message.success(response.data.message);
        //we have to set the token evrytime the logged in user correct or not for that we have to store it in localstorage
        localStorage.setItem("token",response.data.data)
        //if it is successful its navigate to the loginpage to home page
        navigate("/");
        // window.location.reload();
        // window.location.href="/";
      }
      else{
        message.error(response.data.message);
      }
    }
    catch(error){
      dispatch(HideLoading());
      message.error(error.message);
    }
  }
  return (
    <div className="h-screen d-flex align-items-center justify-content-center">
       <div className="w-400 card p-3">
          <Form layout="vertical" onFinish={onFinish}>
            <h1 className="text-lg">Login</h1>
            <hr/>
            <Form.Item label="E-mail:" name="email">
            <input type="text"/>
            </Form.Item>
            <Form.Item label="Password:" name="password">
            <input type="password"/>
            </Form.Item>
            <div className='d-flex justify-content-between align-items-center'>
              <Link to="/register">Click Here to Register</Link>
              <button className='secondary-btn' type="submit">Login</button>
            </div>
          </Form>        
        </div>
    </div>
  )
}

export default Login