//list the buses
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import BusForm from '../../components/BusForm';
import PageTitle from '../../components/PageTitle';
import { ShowLoading,HideLoading } from '../../redux/alertsSlice';
import { axiosInstance } from "../../helpers/axiosInstance";
import {message, Table,Col,Row} from "antd";
// import moment from "moment";


function AdminBuses() {
  const dispatch=useDispatch();
  const [showBusForm,setShowBusForm]=useState(false);
  const [buses, setBuses]=useState([]);
  const[selectedBus,setSelectedBus]=useState(null);
  const [filters={},setFilters]=useState([]);
  const getBuses=async()=>{
    const tempFilters={};
    Object.keys(filters).forEach((key)=>{
      if(filters[key])
      tempFilters[key]=filters[key];
    })
    try{
      dispatch(ShowLoading());
      //im using axiosInstance so headers will be sent automatically..
      const response=await axiosInstance.post("/api/buses/get-all-buses",tempFilters);
      dispatch(HideLoading());
      if(response.data.success){
        setBuses(response.data.data);
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

  const deleteBus=async(id)=>{
    try{
      dispatch(ShowLoading());
      const response = await axiosInstance.post("/api/buses/delete-bus",{_id:id,});
      dispatch(HideLoading());
      if(response.data.success){
        message.success(response.data.message);
        //after deleting fetch all the busses thats why
        getBuses();
      }
      else{
        message.error(response.data.message);
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
      dataIndex:"name", //this should be match with mongodb model..
    },
    {
      title:"Number",
      dataIndex:"number",
    },
    {
      title:"From",
      dataIndex:"from"
    },
   {
    title:"To",
    dataIndex:"to"
   },
   {
    title:"Journey Date",
    dataIndex:"journeyDate",
    // render:(journeyDate) => moment(journeyDate).format("DD-MM-YYYY"),
   },
  //  {
  //   title:"Status",
  //   dataIndex:"status"
  //  },
   {
    title:"Action",
    dataIndex:"action",
    render:(action,record)=>(
      <div className='d-flex gap-3'>
         <i class="ri-delete-bin-line" onClick={()=>{
          var result =window.confirm("Are you sure you want to delete this bus?");
          if(result){
            deleteBus(record._id)
          }       
         }}></i>
        <i class="ri-pencil-line" onClick={()=>{
          setSelectedBus(record);
          setShowBusForm(true);
        }}></i>
      </div>
    )
   }

  ]

  //calling api in useEffect which will call api from beckend.
  useEffect(()=>{
    getBuses();
  },[])



  return (
    <div>
      <div className='my-3 card p-2'>
        {/* filter purpose*/}
        <Row gutter={[10,10]}>
          <Col lg={6} sm={24}>
            <input type="text" placeholder='From'
            value={filters.from}
            onChange={(e)=>setFilters({...filters,from:e.target.value})}/>
          </Col>
          <Col lg={6} sm={24}>
            <input type="text"
            placeholder='To'
            value={filters.to}
            onChange={(e)=>setFilters({...filters,to:e.target.value})}
            />
          </Col>

          <Col lg={6} sm={24}>
            <input type="date"
            placeholder='journeyDate'
            value={filters.journeyDate}
            onChange={(e)=>setFilters({...filters,journeyDate:e.target.value})}
            />
          </Col>

          <Col lg={6} sm={24}>
            <div className='d-flex gap-2'>
            <button className='primary-btn' onClick={()=>getBuses()}>Filters</button>
            <button className='primary-btn' onClick={()=>setFilters({
              from:"",
              to:"",
              journeyDate:"",
            })}>Clear</button>
            </div>  
          </Col>
        </Row>

      </div>
      <div className="d-flex justify-content-between">
        <PageTitle title="Buses"/>
        <button className='secondary-btn' onClick={()=>setShowBusForm(true)}>Add Bus</button>
      </div>

      <Table columns={columns} dataSource={buses} />

      {showBusForm && (<BusForm showBusForm={showBusForm} setShowBusForm={setShowBusForm} type=//"add"/>)}
      //if the selected bus is not equal to null then the operation will be edit.. else add
      {selectedBus ? "edit" : "add"}

      //send the props
      selectedBus={selectedBus}
      setSelectedBus={setSelectedBus}
      getData={getBuses} //whenever i click edit any bus i want to udpate the table..
    
      />)}

    </div>
  )
}



export default AdminBuses