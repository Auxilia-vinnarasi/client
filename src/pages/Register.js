import React from 'react';
import {Form, message} from "antd";
import {Link} from "react-router-dom";
//import {Button} from "antd";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../redux/alertsSlice';

function Register() {
  const dispatch=useDispatch();

  const onFinish=async (values)=>{
    //console.log(values);
    try{
      dispatch(ShowLoading());
      const response=await axios.post("/api/users/register",values);
      dispatch(HideLoading());

      if(response.data.success){
        message.success(response.data.message);
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
    <div className='h-screen d-flex justify-content-center align-items-center'>
      <div className="w-400 card p-3">
        <h1 className='text-lg'>Bus Reservation - Register</h1>
        <hr/>
        <Form layout="vertical" onFinish={onFinish}>
        {/*Form.Item is parent element, whatever inside parent ie nested element ie html*/}
        <Form.Item label="Name:" name="name">
          <input type="text"/>  
        </Form.Item>
        <Form.Item label="E-mail:" name="email">
          <input type="text"/>
        </Form.Item>
        <Form.Item label="Password:" name="password">
          <input type="password"/>
        </Form.Item>
        <div className="d-flex justify-content-between align-items-center">
          <Link to="/login">Click Here to Login</Link>
          <button className='secondary-btn' type="submit">Register</button>
        </div>
        </Form> 
      </div>
    </div>
  )
}

export default Register