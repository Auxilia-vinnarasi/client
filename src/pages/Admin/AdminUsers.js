import { message, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import PageTitle from '../../components/PageTitle';
import { axiosInstance } from '../../helpers/axiosInstance';
import { HideLoading, ShowLoading } from '../../redux/alertsSlice';

function AdminUsers() {
  const dispatch=useDispatch();
  const[users,setUsers]=useState([]);

  const getUsers=async()=>{
    try{
      dispatch(ShowLoading());
      const response=await axiosInstance.post("/api/users/get-all-users",{});
      dispatch(HideLoading());
      if(response.data.success){
        setUsers(response.data.data);
      }
      else{
        message.error(response.data.message)
      }
    }
    catch(err){
      dispatch(HideLoading());
      message.error(err.message);
      
    }
  }

  const columns=[
    {
      title:"Name",
      dataIndex:"name",
    },
    {
      title:"Email",
      dataIndex:"email",
    },
    {
      title:"Role",
      dataIndex:"",
      render:(data)=>{
        console.log(data);
        if(data?.isAdmin)
        {
          return "Admin"
        }
        else{
          return "User"
        }
      }
    },
  //  {
  //   title:"Action",
  //   dataIndex:"action",
  //   render:(action,record)=>(
  //     <div className='d-flex gap-2'>
  //       <p className='underline'>Block</p>
  //     </div>
  //   )
  //  }
  ]

  useEffect(()=>{
    getUsers();
  },[])

  return (
    <div>
      <div className='d-flex justify-content-between'>
      <PageTitle title="Users"></PageTitle>
      </div>
      
      <div>
        <Table dataSource={users} columns={columns}></Table>
      </div>
    </div>
  )
}

export default AdminUsers