import { message, Table,Row,Col } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import PageTitle from '../../components/PageTitle';
import { axiosInstance } from '../../helpers/axiosInstance';
import { HideLoading, ShowLoading } from '../../redux/alertsSlice';

function AdminUsers() {
  const dispatch=useDispatch();
  const[users,setUsers]=useState([]);
  const [filters={},setFilters]=useState([])

  const getUsers=async()=>{
    const tempFilters={}
  Object.keys(filters).forEach((key)=>{
    if(filters[key]){
      tempFilters[key]=filters[key];
    }
  })
    try{
      dispatch(ShowLoading());
      const response=await axiosInstance.post("/api/users/get-all-users",tempFilters);
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

  const updateUserPermissions=async(user,action)=>{
    //i am going to send the new user object here...
    //in the new user object i have to send the valid  details...
    //valid details i m geting from user
    //first is user obj, second one is the prop i want to update
    try{
      let payload=null;
      if(action==="make-admin"){
        payload={
          ...user,
          isAdmin:true,
        }
      }
        else if(action==="remove-admin")
        {
          payload={
            ...user,
            isAdmin:false,
          }
        }
        else if(action==="block")
        {
          payload={
            ...user,
            isBlocked:true,
          }
        }
        else if(action==="unblock")
        {
          payload={
            ...user,
            isBlocked:false,
          }
        }
      
      dispatch(ShowLoading());
      const response=await axiosInstance.post("/api/users/update-user-permissions",payload);
      dispatch(HideLoading());
      if(response.data.success){
        getUsers()
        message.success(response.data.message);
      }
      else{
        message.error(response.data.message)
      }
    }
    catch(err){
      dispatch(HideLoading());
      message.error(err.message)
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
      title:"Status",
      dataIndex:"",
      render:(data)=>{
        return data?.isBlocked ? "Blocked" : "Active"
      }
      
    },
    {
      title:"Role",
      dataIndex:"",
      //if i put role in dataIndex it will fetch only role...empty string or invalid so that it will capture entire object
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
    { 
   title:"Action",
   dataIndex:"action",
   render:(action,record)=>(
    <div className='d-flex gap-3'>
      {record?.isBlocked && <p className='underline'
      onClick={()=>updateUserPermissions(record,"unblock")}
      >UnBlock</p>}
      {!record?.isBlocked && <p className='underline'
      onClick={()=>updateUserPermissions(record,"block")}
      >Block</p>}
      {record?.isAdmin && <p className='underline'
      onClick={()=>updateUserPermissions(record,"remove-admin")}
      >Remove Admin</p>}
      {!record?.isAdmin && <p className='underline'
      onClick={()=>updateUserPermissions(record,"make-admin")}
      >Make Admin</p>}
    </div>
   )
      
    }
  ]

  useEffect(()=>{
    getUsers();
  },[])

  return (
    <div>
      <div className='my-3 card p-2'>
        {/* filter purpose*/}
        <Row gutter={[10,10]}>
          <Col lg={6} sm={24}>
            <input type="text" placeholder='Name'
            value={filters.name}
            onChange={(e)=>setFilters({...filters,name:e.target.value})}/>
          </Col>
          <Col lg={6} sm={24}>
            <input type="text"
            placeholder='Email'
            value={filters.email}
            onChange={(e)=>setFilters({...filters,email:e.target.value})}
            />
          </Col>

          {/* <Col lg={6} sm={24}>
            <input type="date"
            placeholder='journeyDate'
            value={filters.journeyDate}
            onChange={(e)=>setFilters({...filters,journeyDate:e.target.value})}
            />
          </Col> */}

          <Col lg={6} sm={24}>
            <div className='d-flex gap-2'>
            <button className='primary-btn' onClick={()=>getUsers()}>Filters</button>
            <button className='primary-btn' onClick={()=>setFilters({
              name:"",
              email:"",
            })}>Clear</button>
            </div>  
          </Col>
        </Row>

      </div>
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